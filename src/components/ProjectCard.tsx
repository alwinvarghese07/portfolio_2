import { useState, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { Link } from "react-router-dom";
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useMotionTemplate,
    useReducedMotion
} from "motion/react";
import ViewportVideo from "./ViewportVideo";

interface ProjectCardProps {
    title: string;
    category?: string;
    description: string;
    tags?: string[];
    mediaUrl?: string;
    isVideo?: boolean;
    id?: string;
}

export default function ProjectCard({
    title,
    category,
    description,
    mediaUrl,
    isVideo = false,
    id
}: ProjectCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Normalized motion coordinates [-1, 1]
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring physics for organic tactile motion
    const springConfig = { stiffness: 220, damping: 25, mass: 0.6 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    // 3D Tilt rotations: subtle ±6° angle calibrated for 800px cards
    const rotateX = useTransform(mouseY, [-1, 1], shouldReduceMotion ? [0, 0] : [6, -6]);
    const rotateY = useTransform(mouseX, [-1, 1], shouldReduceMotion ? [0, 0] : [-6, 6]);

    // Dynamic specular glare that tracks cursor position across the card surface
    const glareX = useTransform(mouseX, [-1, 1], [15, 85]);
    const glareY = useTransform(mouseY, [-1, 1], [15, 85]);
    const glareBackground = useMotionTemplate`radial-gradient(circle 480px at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 45%, transparent 75%)`;

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || shouldReduceMotion) return;
        const rect = cardRef.current.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;

        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const normX = Math.max(-1, Math.min(1, (localX - centerX) / centerX));
        const normY = Math.max(-1, Math.min(1, (localY - centerY) / centerY));

        x.set(normX);
        y.set(normY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const CardContent = (
        <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto border-0 outline-none">
            {/* 1. Media Container with 3D Tilt Card Interaction */}
            <div style={{ perspective: 1200 }} className="w-full max-w-[800px] mx-auto">
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onTouchEnd={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                        willChange: "transform",
                    }}
                    animate={{
                        scale: isHovered ? 1.015 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                    }}
                    className={`w-full max-w-[800px] ${id === "staytransit"
                        ? "aspect-[1916/1080] h-auto"
                        : id === "medaram-jathara"
                            ? "aspect-[6688/3732] h-auto"
                            : "aspect-[16/10] h-[260px] sm:h-[380px] md:h-[500px]"
                        } mx-auto bg-[#FAFAFA] rounded-[22px] md:rounded-[26px] overflow-hidden relative border-0 outline-none ring-0 shadow-none cursor-pointer select-none`}
                >
                    {mediaUrl ? (
                        isVideo ? (
                            <ViewportVideo
                                src={mediaUrl}
                                width={800}
                                height={id === "staytransit" ? 451 : 500}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="w-full h-full object-cover rounded-[22px] md:rounded-[26px] border-0 outline-none"
                            />
                        ) : (
                            <img
                                src={mediaUrl}
                                alt={title}
                                width={800}
                                height={500}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover rounded-[22px] md:rounded-[26px] border-0 outline-none"
                            />
                        )
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#F0F2F5] rounded-[22px] md:rounded-[26px] text-neutral-400 p-6 select-none">
                            <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-400 mb-2 shadow-xs">
                                <svg className="w-6 h-6 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>
                            <span className="type-caption uppercase tracking-widest text-neutral-600 font-semibold">{title}</span>
                            <span className="text-[11px] text-neutral-400 mt-0.5">Image placeholder</span>
                        </div>
                    )}

                    {/* Dynamic Specular Glare Sheen Overlay */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-[22px] md:rounded-[26px] z-10 transition-opacity duration-300"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: glareBackground,
                        }}
                        aria-hidden="true"
                    />
                </motion.div>
            </div>

            {/* 2. Content Container: Title -> Category -> Description */}
            <div className="flex flex-col gap-1.5 px-1 w-full max-w-[800px] mx-auto border-0 outline-none">
                {/* 1. Project Title — Card Heading */}
                <div className="flex items-center gap-2">
                    <h3 className="type-card-heading text-[#1A1A1A] group-hover:text-black transition-colors">
                        {title}
                    </h3>
                    <span className="text-[#999] group-hover:text-[#1A1A1A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[18px]" aria-hidden="true">
                        ↗
                    </span>
                </div>

                {/* 2. Category / Year — Metadata */}
                {category && (
                    <span className="type-metadata text-[#888]">
                        {category}
                    </span>
                )}

                {/* 3. Short Project Description — Body */}
                <p className="type-body text-[#555] w-full mt-0.5">
                    {description}
                </p>
            </div>
        </div>
    );

    if (id) {
        return (
            <Link to={`/case-study/${id}`} className="group cursor-pointer block w-full border-0 outline-none focus:outline-none focus:ring-0 active:scale-[0.995] transition-transform duration-200">
                {CardContent}
            </Link>
        );
    }

    return (
        <div className="group block w-full border-0 outline-none">
            {CardContent}
        </div>
    );
}
