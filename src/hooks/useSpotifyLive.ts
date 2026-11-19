import { useState, useEffect, useRef, useCallback } from 'react';

export interface SpotifyTrack {
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

const POLL_INTERVAL = 8000; // 8 seconds

export function useSpotifyLive() {
  const [data, setData] = useState<SpotifyTrack | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProgress, setCurrentProgress] = useState(0);
  const isMountedRef = useRef(true);

  const fetchTrack = useCallback(async () => {
    try {
      const res = await fetch('/api/spotify/currently-playing');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json: SpotifyTrack = await res.json();
      if (isMountedRef.current) {
        setData(json);
        setCurrentProgress(json.progressMs || 0);
        setIsLoading(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setData((prev) => prev || { isPlaying: false, status: 'error', message: String(err) });
        setIsLoading(false);
      }
    }
  }, []);

  // Polling setup with visibility detection
  useEffect(() => {
    isMountedRef.current = true;
    fetchTrack();

    let timer: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (document.visibilityState === 'visible') {
          fetchTrack();
        }
      }, POLL_INTERVAL);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchTrack();
        startPolling();
      } else if (timer) {
        clearInterval(timer);
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMountedRef.current = false;
      if (timer) clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchTrack]);

  // Client-side progress bar tick every second when isPlaying is true
  useEffect(() => {
    if (!data?.isPlaying || !data.durationMs) return;

    const progressTimer = setInterval(() => {
      setCurrentProgress((prev) => {
        if (!data.durationMs) return prev;
        const next = prev + 1000;
        return next > data.durationMs ? data.durationMs : next;
      });
    }, 1000);

    return () => clearInterval(progressTimer);
  }, [data?.isPlaying, data?.durationMs]);

  return {
    track: data,
    isLoading,
    currentProgress,
    refetch: fetchTrack,
  };
}
