import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import spotifyLogo from "../assets/images/spotify.webp";

export default function SpotifyCard() {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Parallax Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Ultra-smooth spring physics
    const mouseX = useSpring(x, { stiffness: 150, damping: 25 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 25 });

    // Rotate matrix based on distance from center
    const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
    const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

    // Parallax depth shift for album stack
    const imageShiftX = useTransform(mouseX, [-150, 150], [-5, 5]);
    const imageShiftY = useTransform(mouseY, [-150, 150], [-5, 5]);

    const handleMouseMove = (e: ReactMouseEvent<HTMLAnchorElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        x.set(localX - centerX);
        y.set(localY - centerY);
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const albumImages = [
        {
            src: "https://api.builder.io/api/v1/image/assets/TEMP/1612f19ae89d51872dbf5cd46097c10d9248d59d?width=200",
            alt: "Album cover 1",
        },
        {
            src: "https://api.builder.io/api/v1/image/assets/TEMP/c96e84ea82ca9962478b396584d7bc68ddcc09cd?width=200",
            alt: "Album cover 2",
        },
        {
            src: "https://api.builder.io/api/v1/image/assets/TEMP/f25a10435916dff1cb4816de5829468c8b74d3e9?width=200",
            alt: "Album cover 3",
        },
    ];

    return (
        <motion.a
            ref={cardRef}
            href="https://open.spotify.com/user/tab1twa8qs27vu9tdprv3o58l"
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1200,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full flex-1 gap-6 overflow-hidden bg-[#EDFCF3] cursor-pointer group shadow-xs transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[#EDFCF3]/60"
        >
            {/* Soft Ambient Breathing Glow */}
            <div
                className={`absolute inset-0 bg-linear-to-tr from-white/60 via-transparent to-white/10 transition-opacity duration-700 pointer-events-none rounded-2xl sm:rounded-3xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Top row */}
            <div
                className="flex items-center justify-between w-full gap-3 pointer-events-none relative z-10"
                style={{ transform: "translateZ(30px)" }}
            >
                {/* Left: Small Logo + Single-line Heading & Subtext */}
                <div className="flex items-center gap-3 min-w-0">
                    <img
                        src={spotifyLogo}
                        alt="Spotify logo"
                        width={28}
                        height={28}
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0 drop-shadow-xs transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-[#1A1A1A] text-[16px] sm:text-[17px] font-semibold tracking-tight whitespace-nowrap leading-tight">
                            No Skips 🎧
                        </span>
                        <span className="text-[#666666] text-[13px] sm:text-[13.5px] font-normal whitespace-nowrap leading-tight">
                            Curated by me
                        </span>
                    </div>
                </div>

                {/* Right: Album stack with parallax depth */}
                <motion.div
                    className="relative w-[124px] sm:w-[130px] h-[74px] sm:h-[80px] shrink-0"
                    style={{ x: imageShiftX, y: imageShiftY, transform: "translateZ(50px)" }}
                >
                    {albumImages.map((img, i) => (
                        <div
                            key={i}
                            className="absolute top-0 transition-transform duration-500 group-hover:-translate-y-1"
                            style={{
                                left: `${i * 25}px`,
                                zIndex: i + 1,
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-[74px] h-[74px] sm:w-[80px] sm:h-[80px] object-cover rounded-xl border border-white/90 shadow-[0_4px_14px_rgba(0,0,0,0.1)]"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom: Spotify link */}
            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                <span className="text-[#007BFF] text-[14px] sm:text-[15px] font-semibold leading-none font-roobert inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    Spotify ↗
                </span>
            </div>
        </motion.a>
    );
}
