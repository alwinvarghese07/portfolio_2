import { motion } from "motion/react";

interface GridHeartProps {
    className?: string;
}

/**
 * Editorial Grid Intersection Heart
 * A larger, beating heart in line color #E2E2E2 placed at structural line intersections.
 */
export function GridHeart({ className = "" }: GridHeartProps) {
    return (
        <div
            className={`absolute pointer-events-none select-none z-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center ${className}`}
            aria-hidden="true"
        >
            <motion.div
                animate={{
                    scale: [1, 1.3, 1, 1.18, 1],
                }}
                transition={{
                    duration: 1.35,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.14, 0.28, 0.42, 1],
                }}
                className="flex items-center justify-center"
            >
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="#E2E2E2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    className="overflow-visible"
                >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
            </motion.div>
        </div>
    );
}

interface GridCrosshairProps {
    className?: string;
}

/**
 * Editorial Registration Crosshair
 */
export function GridCrosshair({ className = "" }: GridCrosshairProps) {
    return (
        <div
            className={`absolute pointer-events-none select-none z-10 w-[7px] h-[7px] -translate-x-1/2 -translate-y-1/2 ${className}`}
            aria-hidden="true"
        >
            {/* Horizontal stroke */}
            <div className="absolute top-[3px] left-0 w-[7px] h-[1px] bg-[#E2E2E2]" />
            {/* Vertical stroke */}
            <div className="absolute top-0 left-[3px] w-[1px] h-[7px] bg-[#E2E2E2]" />
        </div>
    );
}

interface EditorialDividerProps {
    className?: string;
    fullWidth?: boolean;
}

/**
 * Editorial Horizontal Divider
 * An art-directed 1px horizontal rule with beating intersection hearts.
 * When fullWidth is false (default), the horizontal rule spans strictly across the center column
 * between the left and right guidelines, with the outer left/right extensions removed.
 */
export function EditorialDivider({ className = "", fullWidth = false }: EditorialDividerProps) {
    return (
        <div
            className={`relative -mx-4 sm:-mx-6 md:-mx-8 w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] md:w-[calc(100%+4rem)] h-[1px] pointer-events-none select-none ${className}`}
            aria-hidden="true"
        >
            {/* Horizontal rule: spans full viewport width when fullWidth is true, otherwise contained strictly to center */}
            {fullWidth ? (
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-[#E2E2E2]" />
            ) : (
                <div className="absolute inset-x-0 top-0 h-[1px] bg-[#E2E2E2]" />
            )}

            {/* Left Intersection Heart (aligns with left vertical guideline) */}
            <GridHeart className="left-0 top-[0.5px] hidden sm:flex" />

            {/* Right Intersection Heart (aligns with right vertical guideline) */}
            <GridHeart className="left-full top-[0.5px] hidden sm:flex" />
        </div>
    );
}
