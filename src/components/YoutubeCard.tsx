import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import youtubeLogo from "../assets/images/yt.webp";
import weightless from "../assets/images/weightless_remix.webp";
import makeyoumine from "../assets/images/makeyoumine.webp";
import control from "../assets/images/control.webp";

export default function YTCard() {
    const cardRef = useRef<HTMLAnchorElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // 3D Parallax Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics
    const mouseX = useSpring(x, { stiffness: 150, damping: 25 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 25 });

    const rotateX = useTransform(mouseY, [-150, 150], [6, -6]);
    const rotateY = useTransform(mouseX, [-150, 150], [-6, 6]);

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
            src: weightless,
            alt: "Album cover 1",
        },
        {
            src: makeyoumine,
            alt: "Album cover 2",
        },
        {
            src: control,
            alt: "Album cover 3",
        },
    ];

    return (
        <motion.a
            ref={cardRef}
            href="https://www.youtube.com/@alweece"
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
            className="relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-5 sm:p-6 w-full flex-1 gap-6 bg-[#FFF0F0] overflow-hidden cursor-pointer group shadow-xs transition-all duration-500 ease-out hover:shadow-xl hover:shadow-[#FFF0F0]/60"
        >
            {/* Soft Ambient Breathing Glow */}
            <div
                className={`absolute inset-0 bg-linear-to-tr from-white/60 via-transparent to-white/10 transition-opacity duration-700 pointer-events-none rounded-2xl sm:rounded-3xl ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Top Section */}
            <div
                className="flex items-center justify-between w-full gap-3 pointer-events-none relative z-10"
                style={{ transform: "translateZ(30px)" }}
            >
                {/* Left: Small Logo + Single-line Heading & Subtext */}
                <div className="flex items-center gap-3 min-w-0">
                    <img
                        src={youtubeLogo}
                        alt="YouTube logo"
                        height={22}
                        className="h-5 sm:h-6 w-auto object-contain shrink-0 drop-shadow-xs transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="flex flex-col gap-1 min-w-0">
                        <span className="text-[#1A1A1A] text-[16px] sm:text-[17px] font-semibold tracking-tight whitespace-nowrap leading-tight">
                            Tunes by me
                        </span>
                        <span className="text-[#666666] text-[13px] sm:text-[13.5px] font-normal whitespace-nowrap leading-tight">
                            Originals & remixes
                        </span>
                    </div>
                </div>

                {/* Right: Album Stack with parallax depth */}
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
                                zIndex: albumImages.length - i,
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

            {/* Bottom Link */}
            <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                <span className="text-[#007BFF] text-[14px] sm:text-[15px] font-semibold leading-none font-roobert inline-flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    YouTube ↗
                </span>
            </div>
        </motion.a>
    );
}
