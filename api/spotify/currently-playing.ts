import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCurrentlyPlaying } from './spotify-client';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow cross-origin requests if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Short cache duration: public cache 1s, stale while revalidate 5s
  res.setHeader('Cache-Control', 'public, s-maxage=1, stale-while-revalidate=5');

  try {
    const trackData = await getCurrentlyPlaying();
    return res.status(200).json(trackData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ isPlaying: false, status: 'error', message });
  }
}
