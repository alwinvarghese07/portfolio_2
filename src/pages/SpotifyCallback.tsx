import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import spotifyLogo from '../assets/images/spotify.webp';

export default function SpotifyCallback() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const hasExchangedRef = useRef(false);

  useEffect(() => {
    if (hasExchangedRef.current) return;
    hasExchangedRef.current = true;

    if (error) {
      setStatus('error');
      setErrorMessage(`Spotify authorization denied: ${error}`);
      return;
    }

    if (!code) {
      setStatus('error');
      setErrorMessage('No authorization code provided in the URL.');
      return;
    }

    // Determine redirectUri matching dashboard configuration
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const redirectUri = isLocal
      ? 'http://127.0.0.1:5173/callback'
      : `${window.location.origin}/callback`;

    fetch(`/api/spotify/callback?code=${encodeURIComponent(code)}&redirect_uri=${encodeURIComponent(redirectUri)}&format=json`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
          setStatus('success');
        } else {
          throw new Error('Refresh token not returned.');
        }
      })
      .catch(async (err) => {
        // If the one-time code was already consumed (e.g. by quick exchange or reload), verify if live connection is already active
        try {
          const checkRes = await fetch('/api/spotify/currently-playing');
          const checkData = await checkRes.json();
          if (checkData && checkData.status !== 'unauthenticated' && checkData.status !== 'error') {
            setStatus('success');
            return;
          }
        } catch {
          // ignore
        }
        setStatus('error');
        setErrorMessage(err.message || 'Failed to exchange authorization code for refresh token.');
      });
  }, [code, error]);

  const handleCopy = () => {
    if (refreshToken) {
      navigator.clipboard.writeText(refreshToken);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-[#FAFAFA] rounded-3xl p-8 sm:p-10 border-0 shadow-none">
        <div className="flex items-center gap-3 mb-6">
          <img src={spotifyLogo} alt="Spotify" className="w-8 h-8 object-contain" />
          <span className="text-[13px] font-semibold text-[#1DB954] bg-[#EDFCF3] border border-[#D2F3E0] px-3 py-1 rounded-full">
            Spotify Live Listening
          </span>
        </div>

        {status === 'loading' && (
          <div className="py-8 text-center">
            <div className="inline-block w-8 h-8 border-3 border-[#1DB954] border-t-transparent rounded-full animate-spin mb-4" />
            <h1 className="text-xl font-semibold mb-2">Connecting your Spotify account...</h1>
            <p className="text-sm text-[#666]">Exchanging authorization code for secure access tokens.</p>
          </div>
        )}

        {status === 'error' && (
          <div className="py-4">
            <h1 className="text-xl font-semibold text-rose-600 mb-2">Authorization Failed</h1>
            <p className="text-sm text-[#666] mb-4">{errorMessage}</p>
            <div className="flex gap-3">
              <a
                href="/api/spotify/login"
                className="px-4 py-2 bg-[#1DB954] text-white text-sm font-medium rounded-xl hover:bg-[#189e47] transition-colors"
              >
                Try Again
              </a>
              <Link
                to="/"
                className="px-4 py-2 bg-black/5 text-[#1A1A1A] text-sm font-medium rounded-xl hover:bg-black/10 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="py-2">
            <h1 className="text-2xl font-semibold mb-2 tracking-tight">Authorization Successful!</h1>
            <p className="text-sm text-[#666] leading-relaxed mb-6">
              Your Spotify account is connected and live listening is active!
            </p>

            {refreshToken ? (
              <>
                <div className="bg-[#F4F3EF] border border-black/5 rounded-2xl p-4 mb-4">
                  <code className="text-xs font-mono text-[#111] break-all block mb-3 select-all">
                    {refreshToken}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 bg-[#1DB954] text-white text-xs font-semibold rounded-lg hover:bg-[#189e47] transition-colors cursor-pointer"
                  >
                    {copied ? 'Copied to Clipboard! ✓' : 'Copy Refresh Token'}
                  </button>
                </div>

                <div className="bg-[#FAFAF8] border-l-3 border-[#1DB954] p-3 rounded-r-xl text-xs text-[#555] leading-relaxed mb-6">
                  <strong>Token saved automatically to <code>.env.local</code>!</strong><br />
                  For production, remember to also add <code>SPOTIFY_REFRESH_TOKEN</code> to your Vercel Project Environment Variables.
                </div>
              </>
            ) : (
              <div className="bg-[#EDFCF3] border border-[#D2F3E0] p-4 rounded-2xl text-xs text-[#1A1A1A] mb-6">
                <strong>✓ Spotify Live Listening is active and verified!</strong><br />
                Your refresh token is saved in <code>.env.local</code>.
              </div>
            )}

            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="px-5 py-2.5 bg-[#1A1A1A] text-white text-sm font-medium rounded-xl hover:bg-black transition-colors"
              >
                Go to Portfolio &rarr;
              </Link>
              <a
                href="/api/spotify/currently-playing"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 border border-black/15 text-[#1A1A1A] text-sm font-medium rounded-xl hover:bg-black/5 transition-colors"
              >
                Test API Endpoint
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
