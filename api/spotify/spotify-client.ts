import type { SpotifyTrackData, SpotifyTokenResponse } from './types';

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const CURRENTLY_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

export function getBasicAuthHeader(clientId?: string, clientSecret?: string): string {
  const id = clientId || process.env.SPOTIFY_CLIENT_ID || '';
  const secret = clientSecret || process.env.SPOTIFY_CLIENT_SECRET || '';
  return `Basic ${Buffer.from(`${id}:${secret}`).toString('base64')}`;
}

export function getRedirectUri(reqUri?: string): string {
  if (reqUri) return reqUri;
  return process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/callback';
}

export async function getAccessTokenFromRefreshToken(
  refreshToken?: string,
  clientId?: string,
  clientSecret?: string
): Promise<{ accessToken: string; expiresIn: number } | null> {
  const token = refreshToken || process.env.SPOTIFY_REFRESH_TOKEN;
  if (!token) {
    return null;
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: getBasicAuthHeader(clientId, clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to refresh Spotify access token:', response.status, errorText);
    return null;
  }

  const data: SpotifyTokenResponse = await response.json();
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}

export async function exchangeCodeForTokens(
  code: string,
  redirectUri: string,
  clientId?: string,
  clientSecret?: string
): Promise<SpotifyTokenResponse | null> {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: getBasicAuthHeader(clientId, clientSecret),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to exchange code for tokens:', response.status, errorText);
    return null;
  }

  return response.json();
}

export async function getCurrentlyPlaying(): Promise<SpotifyTrackData> {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret) {
    return {
      isPlaying: false,
      status: 'unauthenticated',
      message: 'SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET is missing from environment variables.',
    };
  }

  if (!refreshToken) {
    return {
      isPlaying: false,
      status: 'unauthenticated',
      message: 'SPOTIFY_REFRESH_TOKEN is not configured. Authorize via /api/spotify/login.',
    };
  }

  try {
    const tokenResult = await getAccessTokenFromRefreshToken(refreshToken, clientId, clientSecret);
    if (!tokenResult) {
      return {
        isPlaying: false,
        status: 'error',
        message: 'Unable to obtain fresh Spotify access token. Check your credentials and refresh token.',
      };
    }

    const res = await fetch(CURRENTLY_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
      },
    });

    if (res.status === 204 || res.status > 400) {
      // 204 No Content means nothing is currently playing. Fallback to recently played track if available
      return getRecentlyPlayedFallback(tokenResult.accessToken);
    }

    const data = await res.json();

    if (!data || !data.item) {
      return getRecentlyPlayedFallback(tokenResult.accessToken);
    }

    const item = data.item;
    const isPlaying = Boolean(data.is_playing);

    return {
      isPlaying,
      status: isPlaying ? 'playing' : 'paused',
      trackId: item.id,
      title: item.name,
      artist: (item.artists || []).map((a: { name: string }) => a.name).join(', '),
      album: item.album?.name || '',
      albumArt: item.album?.images?.[0]?.url || item.album?.images?.[1]?.url || '',
      songUrl: item.external_urls?.spotify || '',
      durationMs: item.duration_ms || 0,
      progressMs: data.progress_ms || 0,
      timestamp: data.timestamp || Date.now(),
    };
  } catch (err: unknown) {
    console.error('Error fetching Spotify currently playing:', err);
    return {
      isPlaying: false,
      status: 'error',
      message: err instanceof Error ? err.message : 'Unknown error fetching playback state',
    };
  }
}

async function getRecentlyPlayedFallback(accessToken: string): Promise<SpotifyTrackData> {
  try {
    const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      const firstItem = data.items?.[0]?.track;
      if (firstItem) {
        return {
          isPlaying: false,
          status: 'idle',
          trackId: firstItem.id,
          title: firstItem.name,
          artist: (firstItem.artists || []).map((a: { name: string }) => a.name).join(', '),
          album: firstItem.album?.name || '',
          albumArt: firstItem.album?.images?.[0]?.url || firstItem.album?.images?.[1]?.url || '',
          songUrl: firstItem.external_urls?.spotify || '',
          durationMs: firstItem.duration_ms || 0,
          progressMs: 0,
          timestamp: Date.now(),
        };
      }
    }
  } catch {
    // Ignore fallback errors and return idle state
  }

  return {
    isPlaying: false,
    status: 'idle',
  };
}
