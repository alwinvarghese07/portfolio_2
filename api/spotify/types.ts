export interface SpotifyTrackData {
  isPlaying: boolean;
  status: 'playing' | 'paused' | 'idle' | 'unauthenticated' | 'error';
  title?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  songUrl?: string;
  durationMs?: number;
  progressMs?: number;
  timestamp?: number;
  trackId?: string;
  message?: string;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}
