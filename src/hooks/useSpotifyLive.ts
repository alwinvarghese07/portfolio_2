import { useSyncExternalStore, useCallback } from 'react';

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

interface SpotifyStoreState {
  track: SpotifyTrack | null;
  isLoading: boolean;
  currentProgress: number;
}

const POLL_INTERVAL = 8000; // 8 seconds
const SESSION_CACHE_KEY = 'spotify_live_cache';
const CACHE_MAX_AGE_MS = 30000; // 30 seconds

// Restore fresh cached state to prevent any layout flash across route changes/reloads
function getInitialState(): SpotifyStoreState {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const raw = window.sessionStorage.getItem(SESSION_CACHE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.track && Date.now() - parsed.timestamp < CACHE_MAX_AGE_MS) {
          return {
            track: parsed.track,
            isLoading: false,
            currentProgress: parsed.currentProgress || parsed.track.progressMs || 0,
          };
        }
      }
    } catch {
      // Ignore storage errors
    }
  }
  return {
    track: null,
    isLoading: true,
    currentProgress: 0,
  };
}

// ── Singleton In-Memory Store ──
// Shared across all navbar states (static navbar and floating glass navbar)
// to eliminate flickering and duplicate network calls during scroll transitions.
let state: SpotifyStoreState = getInitialState();
const listeners = new Set<() => void>();

let pollTimer: ReturnType<typeof setInterval> | null = null;
let progressTimer: ReturnType<typeof setInterval> | null = null;
let isFetching = false;
let isVisibilityListenerAttached = false;

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function setState(updater: (prev: SpotifyStoreState) => SpotifyStoreState) {
  state = updater(state);
  // Persist latest active track to session storage for seamless hydration
  if (typeof window !== 'undefined' && window.sessionStorage && state.track) {
    try {
      window.sessionStorage.setItem(
        SESSION_CACHE_KEY,
        JSON.stringify({
          track: state.track,
          currentProgress: state.currentProgress,
          timestamp: Date.now(),
        })
      );
    } catch {
      // Ignore storage errors
    }
  }
  notify();
}

export async function fetchSpotifyTrack(): Promise<void> {
  if (isFetching) return;
  isFetching = true;
  try {
    const res = await fetch('/api/spotify/currently-playing');
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const json: SpotifyTrack = await res.json();
    setState((prev) => ({
      ...prev,
      track: json,
      currentProgress: json.progressMs || 0,
      isLoading: false,
    }));
  } catch (err) {
    setState((prev) => ({
      ...prev,
      track: prev.track || { isPlaying: false, status: 'error', message: String(err) },
      isLoading: false,
    }));
  } finally {
    isFetching = false;
  }
}

function startPolling() {
  if (pollTimer) clearInterval(pollTimer);
  pollTimer = setInterval(() => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      fetchSpotifyTrack();
    }
  }, POLL_INTERVAL);
}

function startProgressTimer() {
  if (progressTimer) clearInterval(progressTimer);
  progressTimer = setInterval(() => {
    if (!state.track?.isPlaying || !state.track.durationMs) return;
    const dur = state.track.durationMs;
    const next = state.currentProgress + 1000;
    setState((prev) => ({
      ...prev,
      currentProgress: next > dur ? dur : next,
    }));
  }, 1000);
}

function handleVisibilityChange() {
  if (typeof document === 'undefined') return;
  if (document.visibilityState === 'visible') {
    fetchSpotifyTrack();
    startPolling();
  } else {
    if (pollTimer) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }
}

function initTimers() {
  fetchSpotifyTrack();
  startPolling();
  startProgressTimer();
  if (typeof document !== 'undefined' && !isVisibilityListenerAttached) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    isVisibilityListenerAttached = true;
  }
}

function cleanupTimers() {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
  }
  if (progressTimer) {
    clearInterval(progressTimer);
    progressTimer = null;
  }
  if (typeof document !== 'undefined' && isVisibilityListenerAttached) {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    isVisibilityListenerAttached = false;
  }
}

function subscribe(listener: () => void): () => void {
  const wasEmpty = listeners.size === 0;
  listeners.add(listener);

  if (wasEmpty) {
    initTimers();
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      cleanupTimers();
    }
  };
}

function getSnapshot(): SpotifyStoreState {
  return state;
}

function getServerSnapshot(): SpotifyStoreState {
  return state;
}

export function useSpotifyLive() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const refetch = useCallback(() => {
    fetchSpotifyTrack();
  }, []);

  return {
    track: store.track,
    isLoading: store.isLoading,
    currentProgress: store.currentProgress,
    refetch,
  };
}
