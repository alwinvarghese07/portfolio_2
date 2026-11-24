import React, { useEffect, useRef } from "react";

interface ViewportVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    rootMargin?: string;
}

/**
 * ViewportVideo
 * High-performance video component that only decodes and plays when near or inside the viewport.
 * Automatically pauses when offscreen or when document visibility is hidden.
 */
export default function ViewportVideo({
    src,
    rootMargin = "120px",
    className = "",
    preload = "metadata",
    autoPlay = true,
    loop = true,
    muted = true,
    playsInline = true,
    ...props
}: ViewportVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (video.paused) {
                        video.play().catch(() => {
                            // Autoplay might be temporarily blocked by browser policy
                        });
                    }
                } else {
                    if (!video.paused) {
                        video.pause();
                    }
                }
            },
            { rootMargin, threshold: 0.05 }
        );

        observer.observe(video);

        const handleVisibilityChange = () => {
            if (document.hidden) {
                if (!video.paused) video.pause();
            } else {
                const rect = video.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView && video.paused) {
                    video.play().catch(() => {});
                }
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, [rootMargin]);

    return (
        <video
            ref={videoRef}
            src={src}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            preload={preload}
            className={className}
            {...props}
        />
    );
}
