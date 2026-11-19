import { useSpotifyLive } from '../hooks/useSpotifyLive';

export default function SpotifyLiveWidget() {
  const { track, currentProgress } = useSpotifyLive();

  // If no track is playing and not paused, or unauthenticated, show the fallback "Available for work" pill
  const hasActiveTrack = Boolean(track && track.title && (track.isPlaying || track.status === 'paused'));

  if (!hasActiveTrack) {
    return (
      <div className="flex items-center h-[56px] sm:h-[60px] shrink-0">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="type-caption text-[#777]">
            Available for work
          </span>
        </div>
      </div>
    );
  }

  const progressPercentage = track?.durationMs && track.durationMs > 0
    ? Math.min(100, Math.max(0, (currentProgress / track.durationMs) * 100))
    : 0;

  const isPlaying = Boolean(track?.isPlaying);

  return (
    <a
      href={track?.songUrl || 'https://open.spotify.com'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center h-[56px] sm:h-[60px] gap-2.5 sm:gap-3 group select-none text-left cursor-pointer transition-opacity duration-200 hover:opacity-90 max-w-full shrink-0"
      title={`${track?.title} by ${track?.artist} (Open in Spotify)`}
    >
      {/* ── Left: Album Artwork (Square, Exact Full Height of Right Block, Subtle 8px Rounded Corners) ── */}
      <div className="relative w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] aspect-square rounded-[8px] overflow-hidden shrink-0">
        {track?.albumArt ? (
          <img
            src={track.albumArt}
            alt={track.title || 'Album artwork'}
            width={60}
            height={60}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-[#1DB954]/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.5 17.3c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-1 7.6-.5 10.3 1.2.3.2.4.6.2.9zm1.2-2.7c-.3.4-.8.5-1.2.3-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-.9-.1-1.1-.6-.1-.5.1-.9.6-1.1 4-1.1 8.8-.6 12.1 1.5.4.2.5.8.3 1.2zm.1-2.8C15.4 8.7 9.7 8.5 6.4 9.5c-.6.2-1.2-.2-1.3-.8-.2-.6.2-1.2.8-1.3 3.9-1.2 10.2-1 14.1 1.3.5.3.7 1 .4 1.5-.3.5-1 .7-1.6.5z" />
            </svg>
          </div>
        )}
      </div>

      {/* ── Right Block: Info & Full-Width Progress Bar Column (Matches Cover Height) ── */}
      <div className="h-[56px] sm:h-[60px] flex flex-col justify-between min-w-0 pr-0.5 py-[1px]">
        {/* Upper Portion: Text Block + Soundwave Visualizer */}
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          <div className="flex flex-col min-w-0">
            {/* Row 1: Spotify Icon + "Currently listening to" */}
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#1DB954" />
                <path
                  d="M17.5 16.2c-.2.3-.6.4-.9.2-2.5-1.5-5.6-1.9-9.3-1-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 4.1-1 7.6-.5 10.3 1.2.3.2.4.6.2.9zm1.2-2.7c-.3.4-.8.5-1.2.3-2.9-1.8-7.3-2.3-10.7-1.3-.5.1-.9-.1-1.1-.6-.1-.5.1-.9.6-1.1 4-1.1 8.8-.6 12.1 1.5.4.2.5.8.3 1.2zm.1-2.8C15.4 8.7 9.7 8.5 6.4 9.5c-.6.2-1.2-.2-1.3-.8-.2-.6.2-1.2.8-1.3 3.9-1.2 10.2-1 14.1 1.3.5.3.7 1 .4 1.5-.3.5-1 .7-1.6.5z"
                  fill="#000000"
                />
              </svg>
              <span className="text-[11px] sm:text-[11.5px] font-regular text-[#666666] tracking-tight leading-none">
                {isPlaying ? 'Currently listening to' : 'Paused on Spotify'}
              </span>
            </div>

            {/* Row 2: Track / Song Name (Bold) */}
            <span className="text-[13px] sm:text-[14px] font-bold text-[#1A1A1A] leading-tight truncate max-w-[120px] sm:max-w-[160px] md:max-w-[190px] mt-0.5">
              {track?.title || 'Untitled Track'}
            </span>

            {/* Row 3: Artist Name (Grey) */}
            <span className="text-[11px] sm:text-[11.5px] font-normal text-[#6E6E6E] leading-tight truncate max-w-[120px] sm:max-w-[160px] md:max-w-[190px]">
              {track?.artist || 'Unknown Artist'}
            </span>
          </div>

          {/* Soundwave Visualizer on the right */}
          <div
            className="hidden xs:flex items-center gap-[2.5px] shrink-0 pl-1"
            aria-label={isPlaying ? 'Audio playing' : 'Audio paused'}
          >
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-1' : 'h-[6px]'}`}
              style={!isPlaying ? { height: '6px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-2' : 'h-[12px]'}`}
              style={!isPlaying ? { height: '12px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-3' : 'h-[10px]'}`}
              style={!isPlaying ? { height: '10px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-4' : 'h-[18px]'}`}
              style={!isPlaying ? { height: '18px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-5' : 'h-[14px]'}`}
              style={!isPlaying ? { height: '14px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-6' : 'h-[11px]'}`}
              style={!isPlaying ? { height: '11px' } : undefined}
            />
            <span
              className={`w-[2.5px] rounded-full bg-[#0084FF] ${isPlaying ? 'animate-soundwave-7' : 'h-[7px]'}`}
              style={!isPlaying ? { height: '7px' } : undefined}
            />
          </div>
        </div>

        {/* Lower Portion: Full-Width Horizontal Blue Progress Bar (Underneath Text & Soundwave) */}
        <div
          className="w-full min-w-[110px] bg-[#E5E5E5] rounded-full overflow-hidden shrink-0 mt-1"
          style={{ height: '4px' }}
        >
          <div
            className="bg-[#0084FF] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%`, height: '100%' }}
          />
        </div>
      </div>
    </a>
  );
}
