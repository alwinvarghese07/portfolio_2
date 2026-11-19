import type { Plugin, ViteDevServer } from 'vite';
import { loadEnv } from 'vite';
import fs from 'fs';
import path from 'path';

export function viteSpotifyPlugin(): Plugin {
  return {
    name: 'vite-spotify-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/spotify')) {
          return next();
        }

        // Load env variables (including .env.local)
        const env = loadEnv('development', process.cwd(), '');
        const clientId = env.SPOTIFY_CLIENT_ID || process.env.SPOTIFY_CLIENT_ID || '';
        const clientSecret = env.SPOTIFY_CLIENT_SECRET || process.env.SPOTIFY_CLIENT_SECRET || '';
        const refreshToken = env.SPOTIFY_REFRESH_TOKEN || process.env.SPOTIFY_REFRESH_TOKEN || '';
        const redirectUri = env.SPOTIFY_REDIRECT_URI || process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/callback';

        const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost:5173'}`);
        const pathname = parsedUrl.pathname;

        // 1. /api/spotify/login
        if (pathname === '/api/spotify/login') {
          if (!clientId) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end('SPOTIFY_CLIENT_ID is not configured in .env.local.');
            return;
          }

          const targetRedirect = parsedUrl.searchParams.get('redirect_uri') || redirectUri;
          const scopes = [
            'user-read-currently-playing',
            'user-read-playback-state',
            'user-read-recently-played',
          ].join(' ');

          const authUrl = new URL('https://accounts.spotify.com/authorize');
          authUrl.searchParams.set('response_type', 'code');
          authUrl.searchParams.set('client_id', clientId);
          authUrl.searchParams.set('scope', scopes);
          authUrl.searchParams.set('redirect_uri', targetRedirect);
          authUrl.searchParams.set('state', Math.random().toString(36).substring(2, 15));

          res.statusCode = 302;
          res.setHeader('Location', authUrl.toString());
          res.end();
          return;
        }

        // 2. /api/spotify/callback
        if (pathname === '/api/spotify/callback') {
          const code = parsedUrl.searchParams.get('code');
          const error = parsedUrl.searchParams.get('error');

          if (error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Spotify Authorization Error: ${error}`);
            return;
          }

          if (!code) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Missing authorization code in query parameters.');
            return;
          }

          const targetRedirect = parsedUrl.searchParams.get('redirect_uri') || redirectUri;
          const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

          try {
            const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: targetRedirect,
              }),
            });

            if (!tokenRes.ok) {
              const errBody = await tokenRes.text();
              res.statusCode = 500;
              res.setHeader('Content-Type', 'text/plain');
              res.end(`Failed to exchange code: ${errBody}`);
              return;
            }

            const tokenData = (await tokenRes.json()) as { refresh_token?: string };
            const retrievedRefreshToken = tokenData.refresh_token;

            // Automatically update .env.local if present
            try {
              const envLocalPath = path.resolve(process.cwd(), '.env.local');
              if (fs.existsSync(envLocalPath)) {
                let content = fs.readFileSync(envLocalPath, 'utf8');
                if (content.includes('SPOTIFY_REFRESH_TOKEN=')) {
                  content = content.replace(/SPOTIFY_REFRESH_TOKEN=.*/, `SPOTIFY_REFRESH_TOKEN=${retrievedRefreshToken}`);
                } else {
                  content += `\nSPOTIFY_REFRESH_TOKEN=${retrievedRefreshToken}\n`;
                }
                fs.writeFileSync(envLocalPath, content, 'utf8');
              }
            } catch (fsErr) {
              console.warn('Could not auto-write to .env.local:', fsErr);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Spotify Authorized</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #F9F8F6; color: #1A1A1A; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 24px; }
    .card { background: #fff; border: 1px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 40px; max-width: 580px; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .badge { display: inline-flex; align-items: center; gap: 8px; background: #EDFCF3; color: #1DB954; font-size: 13px; font-weight: 600; padding: 6px 14px; border-radius: 9999px; margin-bottom: 20px; border: 1px solid #D2F3E0; }
    h1 { font-size: 24px; margin: 0 0 12px 0; }
    p { color: #666; font-size: 15px; line-height: 1.6; margin: 0 0 20px 0; }
    .box { background: #F4F3EF; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
    code { display: block; font-family: monospace; font-size: 13px; word-break: break-all; user-select: all; }
    .btn { background: #1DB954; color: #fff; border: none; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-block; }
    .links { display: flex; gap: 12px; margin-top: 20px; }
    .btn-secondary { background: #1A1A1A; color: #fff; }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">&#9679; Connected to Spotify</div>
    <h1>Authorization Successful!</h1>
    <p>Your Spotify refresh token has been retrieved (and automatically saved to your local <code>.env.local</code>).</p>
    <div class="box"><code id="tok">${retrievedRefreshToken}</code></div>
    <div class="links">
      <button class="btn" onclick="navigator.clipboard.writeText(document.getElementById('tok').innerText); this.innerText='Copied!';">Copy Token</button>
      <a href="/" class="btn btn-secondary">Go to Portfolio</a>
    </div>
  </div>
</body>
</html>`);
            return;
          } catch (exchangeErr) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'text/plain');
            res.end(`Token exchange error: ${exchangeErr}`);
            return;
          }
        }

        // 3. /api/spotify or /api/spotify/currently-playing
        if (pathname === '/api/spotify' || pathname === '/api/spotify/currently-playing') {
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-cache');

          if (!clientId || !clientSecret) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              isPlaying: false,
              status: 'unauthenticated',
              message: 'Spotify credentials missing in .env.local',
            }));
            return;
          }

          if (!refreshToken) {
            res.statusCode = 200;
            res.end(JSON.stringify({
              isPlaying: false,
              status: 'unauthenticated',
              message: 'Spotify not authorized yet. Visit /api/spotify/login to authorize.',
            }));
            return;
          }

          try {
            // Get fresh access token
            const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
            const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
              method: 'POST',
              headers: {
                Authorization: `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
              }),
            });

            if (!tokenRes.ok) {
              res.statusCode = 200;
              res.end(JSON.stringify({
                isPlaying: false,
                status: 'error',
                message: 'Failed to refresh access token with Spotify.',
              }));
              return;
            }

            const tokenResult = (await tokenRes.json()) as { access_token?: string };
            const access_token = tokenResult.access_token;
            if (!access_token) {
              res.statusCode = 200;
              res.end(JSON.stringify({ isPlaying: false, status: 'error', message: 'No access token returned.' }));
              return;
            }

            // Fetch currently playing
            const currentRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
              headers: { Authorization: `Bearer ${access_token}` },
            });

            if (currentRes.status === 204 || currentRes.status > 400) {
              // Try recently played
              const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                headers: { Authorization: `Bearer ${access_token}` },
              });
              if (recentRes.ok) {
                const recentData = (await recentRes.json()) as any;
                const track = recentData?.items?.[0]?.track;
                if (track) {
                  res.statusCode = 200;
                  res.end(JSON.stringify({
                    isPlaying: false,
                    status: 'idle',
                    trackId: track.id,
                    title: track.name,
                    artist: (track.artists || []).map((a: { name: string }) => a.name).join(', '),
                    album: track.album?.name || '',
                    albumArt: track.album?.images?.[0]?.url || '',
                    songUrl: track.external_urls?.spotify || '',
                    durationMs: track.duration_ms || 0,
                    progressMs: 0,
                    timestamp: Date.now(),
                  }));
                  return;
                }
              }

              res.statusCode = 200;
              res.end(JSON.stringify({ isPlaying: false, status: 'idle' }));
              return;
            }

            const currentData = (await currentRes.json()) as any;
            if (!currentData || !currentData.item) {
              res.statusCode = 200;
              res.end(JSON.stringify({ isPlaying: false, status: 'idle' }));
              return;
            }

            const item = currentData.item;
            const isPlaying = Boolean(currentData.is_playing);

            res.statusCode = 200;
            res.end(JSON.stringify({
              isPlaying,
              status: isPlaying ? 'playing' : 'paused',
              trackId: item.id,
              title: item.name,
              artist: (item.artists || []).map((a: { name: string }) => a.name).join(', '),
              album: item.album?.name || '',
              albumArt: item.album?.images?.[0]?.url || item.album?.images?.[1]?.url || '',
              songUrl: item.external_urls?.spotify || '',
              durationMs: item.duration_ms || 0,
              progressMs: currentData.progress_ms || 0,
              timestamp: currentData.timestamp || Date.now(),
            }));
          } catch (err) {
            console.error('Spotify local middleware error:', err);
            res.statusCode = 200;
            res.end(JSON.stringify({
              isPlaying: false,
              status: 'error',
              message: String(err),
            }));
          }
        }
      });
    },
  };
}
