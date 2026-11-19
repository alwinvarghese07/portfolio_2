import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exchangeCodeForTokens } from './spotify-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { code, error, state } = req.query;

  if (error) {
    return res.status(400).send(`Spotify Authorization Error: ${error}`);
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).send('Missing authorization code in query parameters.');
  }

  const queryRedirect = typeof req.query.redirect_uri === 'string' ? req.query.redirect_uri : null;
  const redirectUri = queryRedirect || process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/callback';

  try {
    const tokenData = await exchangeCodeForTokens(code, redirectUri);

    if (!tokenData || !tokenData.refresh_token) {
      return res.status(500).send('Failed to retrieve refresh token from Spotify. Make sure your client credentials and redirect URI match your Spotify Developer Dashboard.');
    }

    if (req.headers.accept?.includes('application/json') || req.query.format === 'json') {
      return res.status(200).json({
        success: true,
        refreshToken: tokenData.refresh_token,
        scope: tokenData.scope,
      });
    }

    const refreshToken = tokenData.refresh_token;

    // Render an elegant editorial success page
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Spotify Live Listening Authorized</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background: #F9F8F6;
      color: #1A1A1A;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
    }
    .card {
      background: #FFFFFF;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 20px;
      padding: 40px;
      max-width: 580px;
      width: 100%;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.06);
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #EDFCF3;
      color: #1DB954;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 9999px;
      margin-bottom: 20px;
      border: 1px solid #D2F3E0;
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 12px 0;
      letter-spacing: -0.02em;
    }
    p {
      color: #666;
      font-size: 15px;
      line-height: 1.6;
      margin: 0 0 24px 0;
    }
    .token-box {
      background: #F4F3EF;
      border: 1px solid rgba(0,0,0,0.06);
      border-radius: 12px;
      padding: 16px;
      position: relative;
      margin-bottom: 24px;
    }
    code {
      display: block;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      color: #111;
      word-break: break-all;
      user-select: all;
    }
    .copy-btn {
      margin-top: 10px;
      background: #1DB954;
      color: #FFFFFF;
      border: none;
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .copy-btn:hover {
      background: #189e47;
    }
    .steps {
      background: #FAFAF8;
      border-left: 3px solid #1DB954;
      padding: 12px 16px;
      margin-bottom: 24px;
      font-size: 14px;
      color: #444;
      line-height: 1.5;
    }
    .links {
      display: flex;
      gap: 16px;
    }
    .links a {
      color: #1A1A1A;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 8px;
      border: 1px solid rgba(0,0,0,0.12);
      transition: all 0.2s;
    }
    .links a:hover {
      background: #F4F3EF;
    }
    .links a.primary {
      background: #111;
      color: #fff;
      border-color: #111;
    }
    .links a.primary:hover {
      background: #333;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="badge">
      <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#1DB954;"></span>
      Connected to Spotify
    </div>
    <h1>Authorization Successful!</h1>
    <p>Your Spotify account has been authorized. Copy your Refresh Token below to enable permanent live playback tracking on your portfolio.</p>
    
    <div class="token-box">
      <code id="token">${refreshToken}</code>
      <button class="copy-btn" onclick="navigator.clipboard.writeText(document.getElementById('token').innerText); this.innerText='Copied to Clipboard!'">Copy Refresh Token</button>
    </div>

    <div class="steps">
      <strong>Next Steps:</strong><br>
      1. Paste into <code>.env.local</code> as <code>SPOTIFY_REFRESH_TOKEN=${refreshToken}</code><br>
      2. In Vercel Project Settings &rarr; Environment Variables, add <code>SPOTIFY_REFRESH_TOKEN</code> with this value.
    </div>

    <div class="links">
      <a href="/api/spotify/currently-playing" target="_blank">Test API Endpoint &rarr;</a>
      <a href="/" class="primary">Return to Portfolio</a>
    </div>
  </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(html);
  } catch (err: unknown) {
    console.error('Error exchanging code in callback:', err);
    return res.status(500).send('Internal Server Error during token exchange.');
  }
}
