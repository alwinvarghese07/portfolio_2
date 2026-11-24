import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { liquidGlass } from "../lib/liquid-glass";

interface CaseStudyNavbarContentProps {
    title: string;
}

function CaseStudyNavbarContent({ title }: CaseStudyNavbarContentProps) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between w-full min-h-[56px] sm:min-h-[60px]">
            {/* ── Left: Back Button (bigger icon + text, perfectly centre aligned) + Case Study Name ── */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <button
                    onClick={() => navigate("/#works")}
                    className="group inline-flex items-center gap-2 text-[#1A1A1A] hover:text-black text-[15px] sm:text-[16px] font-medium transition-colors duration-200 cursor-pointer shrink-0"
                    aria-label="Back to Works"
                >
                    <svg
                        className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M19 12H5" />
                        <path d="m12 19-7-7 7-7" />
                    </svg>
                    <span className="leading-none">Back</span>
                </button>

                <span className="text-black/25 text-sm font-light select-none" aria-hidden="true">/</span>

                <span className="type-nav text-[14px] sm:text-[15px] font-medium text-[#1A1A1A] truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[280px] md:max-w-[360px]">
                    {title}
                </span>
            </div>

            {/* ── Right: Clean Text Navigation (Home · Works · About) with Works selected ── */}
            <div className="flex items-center gap-5 sm:gap-8 shrink-0">
                <Link
                    to="/#home"
                    className="type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer text-[#888888] !font-normal hover:text-[#1A1A1A]"
                >
                    Home
                </Link>
                <Link
                    to="/#works"
                    className="type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer text-[#1A1A1A] !font-medium"
                >
                    Works
                </Link>
                <Link
                    to="/#about"
                    className="type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer text-[#888888] !font-normal hover:text-[#1A1A1A]"
                >
                    About
                </Link>
            </div>
        </div>
    );
}

// ── Floating Liquid Glass Navbar Component (Mounted on scroll) ──
interface FloatingCaseStudyNavbarProps {
    title: string;
    isReducedMotion: boolean;
}

function FloatingCaseStudyNavbar({ title, isReducedMotion }: FloatingCaseStudyNavbarProps) {
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = navRef.current;
        if (!el) return;

        // Apply Apple Liquid Glass refraction via liquid-glass.js
        const glass = liquidGlass(el, {
            scale: -112,
            chroma: 6,
            border: 1,
            blur: 0.5,
            saturate: 1.5,
        });

        return () => {
            glass.destroy();
        };
    }, []);

    return (
        <motion.div
            ref={navRef}
            initial={{ opacity: 0, y: isReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: isReducedMotion ? 0 : -20 }}
            transition={{
                duration: isReducedMotion ? 0 : 0.35,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-3 sm:top-4.5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] md:w-[864px] max-w-[864px] liquid-glass-navbar rounded-xl px-2.5 sm:px-2.5 md:px-2.5 py-2.5 sm:py-2.5 pointer-events-auto overflow-hidden will-change-transform"
        >
            {/* ── Top Specular Light Reflection (Apple curved glass highlight) ── */}
            <div
                className="pointer-events-none absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/95 to-transparent rounded-full opacity-90"
                aria-hidden="true"
            />

            {/* ── Curved Upper Glass Sheen (Simulates physical convex lens gloss) ── */}
            <div
                className="pointer-events-none absolute inset-0 h-[52%] rounded-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"
                aria-hidden="true"
            />

            {/* ── Bottom Edge Ambient Reflection Rim ── */}
            <div
                className="pointer-events-none absolute inset-x-12 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full opacity-70"
                aria-hidden="true"
            />

            {/* ── Navbar Content ── */}
            <div className="relative z-10 w-full">
                <CaseStudyNavbarContent title={title} />
            </div>
        </motion.div>
    );
}

interface CaseStudyNavbarProps {
    title: string;
}

export default function CaseStudyNavbar({ title }: CaseStudyNavbarProps) {
    const [isFloating, setIsFloating] = useState(false);
    const originalNavbarRef = useRef<HTMLDivElement>(null);

    // Synchronize floating navbar trigger with scroll position
    useEffect(() => {
        const isFloatingRef = { current: false };
        let rafId: number | null = null;

        const checkScroll = () => {
            const scrollY = window.scrollY || 0;
            const shouldFloat = scrollY > 40;
            if (shouldFloat !== isFloatingRef.current) {
                isFloatingRef.current = shouldFloat;
                setIsFloating(shouldFloat);
            }
        };

        const onScroll = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    checkScroll();
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        checkScroll();

        const lenis = (window as unknown as { lenis?: { on: (event: string, cb: () => void) => () => void } }).lenis;
        let unsubscribeLenis: (() => void) | undefined;
        if (lenis && typeof lenis.on === "function") {
            unsubscribeLenis = lenis.on("scroll", onScroll);
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (unsubscribeLenis) unsubscribeLenis();
            if (rafId !== null) cancelAnimationFrame(rafId);
        };
    }, []);

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <>
            {/* ── 1. Original Navbar (In normal document flow, blends naturally at top of case study) ── */}
            <div
                ref={originalNavbarRef}
                className={`w-full transition-opacity duration-200 ${isFloating ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            >
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full pt-6 md:pt-8"
                >
                    <CaseStudyNavbarContent title={title} />
                </motion.nav>
            </div>

            {/* ── 2. Floating Liquid Glass Navbar (Scroll-triggered when original navbar leaves viewport) ── */}
            <AnimatePresence>
                {isFloating && (
                    <FloatingCaseStudyNavbar
                        title={title}
                        isReducedMotion={!!isReducedMotion}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
