import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return res.status(500).send('SPOTIFY_CLIENT_ID is not configured in environment variables.');
  }

  const queryRedirect = typeof req.query.redirect_uri === 'string' ? req.query.redirect_uri : null;
  const redirectUri = queryRedirect || process.env.SPOTIFY_REDIRECT_URI || 'http://127.0.0.1:5173/callback';
  const state = crypto.randomBytes(16).toString('hex');
  const scopes = [
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-read-recently-played',
  ].join(' ');

  const authUrl = new URL('https://accounts.spotify.com/authorize');
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('client_id', clientId);
  authUrl.searchParams.set('scope', scopes);
  authUrl.searchParams.set('redirect_uri', redirectUri);
  authUrl.searchParams.set('state', state);

  // Set state in a secure cookie or pass through
  res.setHeader('Set-Cookie', `spotify_auth_state=${state}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600`);
  return res.redirect(authUrl.toString());
}
