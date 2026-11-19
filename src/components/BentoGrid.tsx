import React, { useRef, lazy, Suspense } from "react";
import { motion } from "motion/react";
import profile from "../assets/images/alwin.webp";
import whiteboard from "../assets/images/whiteboard.webp";
import LazyIframe from "./LazyIframe";

const HyperGlass = lazy(() => import("./HyperGlass"));
const Shelf = lazy(() => import("./Shelf"));

interface StickyNoteProps {
    text: string;
    color: string;
    rotation: number;
    position: { x: number; y: number };
    constraintsRef: React.RefObject<HTMLDivElement | null>;
}

const StickyNote = ({ text, color, rotation, position, constraintsRef }: StickyNoteProps) => {
    return (
        <motion.div
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.05}
            dragMomentum={false}
            initial={{ rotate: rotation }}
            whileHover={{ scale: 1.05, rotate: rotation + 2, zIndex: 50 }}
            whileTap={{ scale: 1.1, cursor: "grabbing" }}
            whileDrag={{ scale: 1.1, rotate: rotation - 2, zIndex: 100 }}
            className={`absolute w-12 h-12 md:w-20 md:h-20 shadow-lg flex items-center justify-center text-center select-none cursor-grab active:cursor-grabbing transition-shadow duration-300 ${color}`}
            style={{
                left: position.x,
                top: position.y,
                borderRadius: "2px 4px 3px 12px",
                boxShadow: "inset 0 0 40px rgba(0,0,0,0.02), 2px 5px 15px rgba(0,0,0,0.08)",
                willChange: "transform"
            }}
        >
            {/* Subtle Texture Layer */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/felt.png')]"></div>

            <span className="text-[10px] md:text-xs font-bold text-black/60 tracking-tight leading-tight z-10 pointer-events-none">
                {text}
            </span>

            {/* Corner fold effect hint */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-black/5 rounded-tl-lg pointer-events-none"></div>
        </motion.div>
    );
};

export default function BentoGrid() {
    const freezerRef = useRef<HTMLDivElement>(null);

    return (
        <div className="w-full max-w-[800px] mx-auto flex flex-col gap-3 sm:gap-4">
            {/* ── Top Block: Left (Profile) + Right (Shelf on top, Tools & Whiteboard on bottom) ── */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch">

                {/* 1. PROFILE (Left Column - spans full height of the top block) */}
                <div
                    data-cursor="Yep, that's me"
                    className="w-full sm:w-[35%] h-[360px] sm:h-auto min-h-[300px] rounded-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-500 shrink-0"
                >
                    <img
                        src={profile}
                        alt="Alwin Varghese Saji"
                        className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                        fetchPriority="high"
                    />
                </div>

                {/* ── Right Column: Shelf on top, Tools + Whiteboard on bottom ── */}
                <div className="w-full sm:w-[65%] flex flex-col gap-3 sm:gap-4 flex-1">

                    {/* 2. SHELF (Top Right - full width of right column) */}
                    <div
                        data-cursor="My interests"
                        className="w-full h-[180px] sm:h-[210px] rounded-2xl overflow-hidden p-0 m-0 border-0 shadow-none bg-[#FAFAFA]"
                    >
                        <Suspense fallback={<div className="w-full h-full bg-[#FAFAFA]" />}>
                            <Shelf />
                        </Suspense>
                    </div>

                    {/* ── Bottom row of right column: HyperGlass + Whiteboard ── */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full h-[180px] sm:h-[210px]">

                        {/* 3. HYPER-REALISTIC GLASS CORE (Tools I use) */}
                        <div
                            data-cursor="Tools I use"
                            className="w-full h-full overflow-hidden rounded-2xl bg-[#FAFAFA]"
                        >
                            <Suspense fallback={<div className="w-full h-full bg-[#FAFAFA]" />}>
                                <HyperGlass />
                            </Suspense>
                        </div>

                        {/* 4. FREEZER - Interactive Sticky Notes */}
                        <div
                            ref={freezerRef}
                            data-cursor="Drag around the notes"
                            className="relative overflow-hidden group w-full h-full rounded-2xl border-0 shadow-none bg-[#FAFAFA]"
                        >
                            {/* Whiteboard Background Image */}
                            <img
                                src={whiteboard}
                                alt="Whiteboard"
                                loading="lazy"
                                decoding="async"
                                className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                            />

                            {/* Content Layer (Sticky Notes) */}
                            <div className="relative z-10 w-full h-full">
                                <StickyNote
                                    text="Hey There!"
                                    color="bg-[#DCFCE7]"
                                    rotation={-2}
                                    position={{ x: 16, y: 75 }}
                                    constraintsRef={freezerRef}
                                />
                                <StickyNote
                                    text="Product Designer"
                                    color="bg-[#FCE7F3]"
                                    rotation={4}
                                    position={{ x: 105, y: 85 }}
                                    constraintsRef={freezerRef}
                                />
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* ── Bottom Block: Spotify Embed (Full Width) ── */}
            <LazyIframe
                data-cursor="On Loop"
                src="https://open.spotify.com/embed/playlist/2CcAzDF4uZapVsEA2Xlo1w?utm_source=generator&theme=1"
                className="w-full relative overflow-hidden rounded-2xl hover:scale-[1.01] transition-transform duration-500 h-[240px]"
                style={{ minHeight: '240px', height: '240px' }}
                iframeStyle={{
                    border: "0",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "63.3%",
                    height: "152px",
                    transform: "scale(1.58)",
                    transformOrigin: "top left",
                }}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                rootMargin="300px"
            />
        </div>
    );
}