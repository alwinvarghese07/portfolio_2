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
          <div className="w-full h-full bg-[#1ed760]/10 flex items-center justify-center">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 64 64" fill="none">
              <path
                d="M32 0C14.3 0 0 14.337 0 32c0 17.7 14.337 32 32 32 17.7 0 32-14.337 32-32S49.663 0 32 0zm14.68 46.184c-.573.956-1.797 1.223-2.753.65-7.532-4.588-16.975-5.62-28.14-3.097-1.07.23-2.14-.42-2.37-1.49s.42-2.14 1.49-2.37c12.196-2.79 22.67-1.606 31.082 3.556a2 2 0 0 1 .688 2.753zm3.9-8.717c-.726 1.185-2.256 1.53-3.44.84-8.602-5.276-21.716-6.805-31.885-3.747-1.338.382-2.714-.344-3.097-1.644-.382-1.338.344-2.714 1.682-3.097 11.622-3.517 26.074-1.835 35.976 4.244 1.147.688 1.49 2.217.765 3.403zm.344-9.1c-10.323-6.117-27.336-6.69-37.2-3.708-1.568.497-3.25-.42-3.747-1.988s.42-3.25 1.988-3.747c11.317-3.44 30.127-2.753 41.98 4.282 1.415.84 1.873 2.676 1.032 4.09-.765 1.453-2.638 1.912-4.053 1.07z"
                fill="#1ed760"
              />
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
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 64 64" fill="none">
                <path
                  d="M32 0C14.3 0 0 14.337 0 32c0 17.7 14.337 32 32 32 17.7 0 32-14.337 32-32S49.663 0 32 0zm14.68 46.184c-.573.956-1.797 1.223-2.753.65-7.532-4.588-16.975-5.62-28.14-3.097-1.07.23-2.14-.42-2.37-1.49s.42-2.14 1.49-2.37c12.196-2.79 22.67-1.606 31.082 3.556a2 2 0 0 1 .688 2.753zm3.9-8.717c-.726 1.185-2.256 1.53-3.44.84-8.602-5.276-21.716-6.805-31.885-3.747-1.338.382-2.714-.344-3.097-1.644-.382-1.338.344-2.714 1.682-3.097 11.622-3.517 26.074-1.835 35.976 4.244 1.147.688 1.49 2.217.765 3.403zm.344-9.1c-10.323-6.117-27.336-6.69-37.2-3.708-1.568.497-3.25-.42-3.747-1.988s.42-3.25 1.988-3.747c11.317-3.44 30.127-2.753 41.98 4.282 1.415.84 1.873 2.676 1.032 4.09-.765 1.453-2.638 1.912-4.053 1.07z"
                  fill="#1ed760"
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
