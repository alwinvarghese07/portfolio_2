import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { liquidGlass } from "../lib/liquid-glass";
import SpotifyLiveWidget from "./SpotifyLiveWidget";
import logoMonogram from "../assets/images/logo_monogram.png";

type SectionId = "home" | "works" | "about";

// Custom ease-in-out cubic easing curve:
// Starts gently, accelerates gradually, peaks at middle (t=0.5), decelerates smoothly to destination.
const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Distance-aware scrolling duration:
// - Short distances (< 700px): ~800ms (0.8s)
// - Medium distances (700px - 1500px): ~1000ms (0.8s - 1.1s)
// - Longer distances (> 1500px): ~1200ms - 1400ms (1.15s - 1.4s)
const getDistanceDuration = (distance: number): number => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return 0;
    }
    if (distance < 700) {
        return 0.8;
    }
    if (distance <= 1500) {
        return 0.8 + ((distance - 700) / 800) * 0.3;
    }
    const extra = Math.min(1, (distance - 1500) / 1500);
    return 1.15 + extra * 0.25;
};

interface NavbarContentProps {
    activeSection: SectionId;
    scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => void;
}

function NavbarContent({ activeSection, scrollToSection }: NavbarContentProps) {
    return (
        <div className="flex items-center justify-between w-full min-h-[56px] sm:min-h-[60px]">
            {/* ── Left: Permanent Brand Logo & Live Spotify Listening Widget ── */}
            <div className="flex items-center gap-7 min-h-[56px] sm:min-h-[60px] shrink-0">
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                    className="flex items-center group cursor-pointer focus:outline-none"
                    aria-label="Alwin Varghese Saji — Back to Top"
                >
                    <img
                        src={logoMonogram}
                        alt="Alwin Varghese Saji"
                        className="h-[26px] sm:h-[30px] w-auto object-contain transition-transform duration-200 group-hover:scale-105 select-none"
                    />
                </a>
                <SpotifyLiveWidget />
            </div>

            {/* ── Right: Clean Text Navigation (Home · Works · About) ── */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0">
                <a
                    href="#home"
                    onClick={(e) => scrollToSection(e, "home")}
                    className={`type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer ${activeSection === "home"
                        ? "text-[#1A1A1A] !font-medium"
                        : "text-[#888888] !font-normal hover:text-[#1A1A1A]"
                        }`}
                >
                    Home
                </a>
                <a
                    href="#works"
                    onClick={(e) => scrollToSection(e, "works")}
                    className={`type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer ${activeSection === "works"
                        ? "text-[#1A1A1A] !font-medium"
                        : "text-[#888888] !font-normal hover:text-[#1A1A1A]"
                        }`}
                >
                    Works
                </a>
                <a
                    href="#about"
                    onClick={(e) => scrollToSection(e, "about")}
                    className={`type-nav text-[15px] sm:text-[16px] transition-colors duration-200 cursor-pointer ${activeSection === "about"
                        ? "text-[#1A1A1A] !font-medium"
                        : "text-[#888888] !font-normal hover:text-[#1A1A1A]"
                        }`}
                >
                    About
                </a>
            </div>
        </div>
    );
}

// ── Floating Liquid Glass Navbar Component (Mounted on scroll) ──
interface FloatingLiquidNavbarProps {
    activeSection: SectionId;
    scrollToSection: (e: React.MouseEvent<HTMLAnchorElement>, id: SectionId) => void;
    isReducedMotion: boolean;
}

function FloatingLiquidNavbar({
    activeSection,
    scrollToSection,
    isReducedMotion,
}: FloatingLiquidNavbarProps) {
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
                <NavbarContent activeSection={activeSection} scrollToSection={scrollToSection} />
            </div>
        </motion.div>
    );
}

export default function HeroNavbar() {
    const [activeSection, setActiveSection] = useState<SectionId>("home");
    const [isFloating, setIsFloating] = useState(false);
    const originalNavbarRef = useRef<HTMLDivElement>(null);
    const activeSectionRef = useRef<SectionId>("home");
    const isFloatingRef = useRef(false);
    const scrollRafRef = useRef<number | null>(null);

    // Scroll spy for updating active navigation state and floating navbar trigger
    useEffect(() => {
        let aboutEl = document.getElementById("about");
        let worksEl = document.getElementById("works") || document.getElementById("projects-section");

        const updateNavbarAndScrollState = () => {
            const scrollY = window.scrollY || 0;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Float the liquid-glass navbar smoothly when scrolling past initial top margin (~40px)
            const shouldFloat = scrollY > 40;
            if (shouldFloat !== isFloatingRef.current) {
                isFloatingRef.current = shouldFloat;
                setIsFloating(shouldFloat);
            }

            let nextSection: SectionId = "home";

            // Reached near bottom of page (About / Footer)
            if (windowHeight + scrollY >= docHeight - 70) {
                nextSection = "about";
            } else {
                if (!aboutEl) aboutEl = document.getElementById("about");
                if (!worksEl) worksEl = document.getElementById("works") || document.getElementById("projects-section");

                // Viewing threshold at ~35% from the top of the viewport
                const threshold = windowHeight * 0.35;

                if (aboutEl && (aboutEl.offsetTop - scrollY) <= threshold) {
                    nextSection = "about";
                } else if (worksEl && (worksEl.offsetTop - scrollY) <= threshold) {
                    nextSection = "works";
                } else {
                    nextSection = "home";
                }
            }

            if (nextSection !== activeSectionRef.current) {
                activeSectionRef.current = nextSection;
                setActiveSection(nextSection);
            }
        };

        const onScroll = () => {
            if (scrollRafRef.current === null) {
                scrollRafRef.current = requestAnimationFrame(() => {
                    scrollRafRef.current = null;
                    updateNavbarAndScrollState();
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        updateNavbarAndScrollState();

        // Also subscribe to Lenis scroll event if available
        const lenis = (window as unknown as { lenis?: { on: (event: string, cb: () => void) => () => void } }).lenis;
        let unsubscribeLenis: (() => void) | undefined;
        if (lenis && typeof lenis.on === "function") {
            unsubscribeLenis = lenis.on("scroll", onScroll);
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            if (unsubscribeLenis) unsubscribeLenis();
            if (scrollRafRef.current !== null) {
                cancelAnimationFrame(scrollRafRef.current);
            }
        };
    }, []);

    const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: SectionId) => {
        if (e && e.preventDefault) {
            e.preventDefault();
        }
        setActiveSection(targetId);

        const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const lenis = (window as unknown as {
            lenis?: {
                scroll: number;
                scrollTo: (
                    target: number | HTMLElement,
                    options?: {
                        offset?: number;
                        duration?: number;
                        easing?: (t: number) => number;
                        immediate?: boolean;
                        force?: boolean;
                    }
                ) => void;
            };
        }).lenis;

        let targetY = 0;
        // Accounting for floating navbar height (~68px) so section headers have clear breathing room
        const offset = -80;

        if (targetId === "home") {
            targetY = 0;
        } else {
            const el = document.getElementById(targetId) || (targetId === "works" ? document.getElementById("projects-section") : null);
            if (el) {
                const rect = el.getBoundingClientRect();
                const currentScroll = window.scrollY || (lenis ? lenis.scroll : 0);
                targetY = currentScroll + rect.top + offset;
            } else {
                return;
            }
        }

        const currentScroll = window.scrollY || (lenis ? lenis.scroll : 0);
        const distance = Math.abs(targetY - currentScroll);
        const duration = isReducedMotion ? 0 : getDistanceDuration(distance);

        if (lenis && typeof lenis.scrollTo === "function") {
            lenis.scrollTo(targetY, {
                offset: 0,
                duration,
                easing: easeInOutCubic,
                immediate: isReducedMotion,
                force: true,
            });
        } else {
            // Fallback
            if (isReducedMotion) {
                window.scrollTo({ top: targetY, behavior: "auto" });
            } else {
                window.scrollTo({ top: targetY, behavior: "smooth" });
            }
        }
    }, []);

    const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    return (
        <>
            {/* ── 1. Original Navbar (In normal document flow, blends naturally at top of page) ── */}
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
                    <NavbarContent activeSection={activeSection} scrollToSection={scrollToSection} />
                </motion.nav>
            </div>

            {/* ── 2. Floating Liquid Glass Navbar (Scroll-triggered when original navbar leaves viewport) ── */}
            <AnimatePresence>
                {isFloating && (
                    <FloatingLiquidNavbar
                        activeSection={activeSection}
                        scrollToSection={scrollToSection}
                        isReducedMotion={!!isReducedMotion}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
