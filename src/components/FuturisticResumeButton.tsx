import { useRef, useEffect } from "react";
import { motion } from "motion/react";

interface FuturisticResumeButtonProps {
    href: string;
}

export default function FuturisticResumeButton({ href }: FuturisticResumeButtonProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLAnchorElement>(null);
    const animFrameRef = useRef<number | null>(null);
    const isHoveredRef = useRef(false);
    const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let isVisible = true;
        let time = 0;

        const resize = () => {
            const rect = container.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            mousePosRef.current.x = width * 0.5;
            mousePosRef.current.y = height * 0.5;
            mousePosRef.current.targetX = width * 0.5;
            mousePosRef.current.targetY = height * 0.5;
        };

        const ro = new ResizeObserver(() => resize());
        ro.observe(container);
        resize();

        // Pause animation when off-screen to preserve battery and 0% CPU consumption
        const io = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        });
        io.observe(container);

        // Interactive mouse tracking for fluid warping
        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mousePosRef.current.targetX = e.clientX - rect.left;
            mousePosRef.current.targetY = e.clientY - rect.top;
            mousePosRef.current.active = true;
        };

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            mousePosRef.current.active = true;
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            mousePosRef.current.active = false;
        };

        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseenter", handleMouseEnter);
        container.addEventListener("mouseleave", handleMouseLeave);

        // ── Deep Black Obsidian Liquid Silk Nodes ──
        // Pure deep blacks, onyx, and subtle charcoal/graphite ripples — NO WHITE PATCHES
        const nodes = [
            // 0: Deep Jet-Black Void (Left)
            {
                baseX: 0.15,
                baseY: 0.5,
                radius: 65,
                speedX: 0.5,
                speedY: 0.65,
                color0: "rgba(0, 0, 0, 1.0)",
                color1: "rgba(8, 8, 10, 0.0)",
            },
            // 1: Velvety Charcoal Shimmer (Center-Left)
            {
                baseX: 0.35,
                baseY: 0.45,
                radius: 60,
                speedX: 0.6,
                speedY: 0.75,
                color0: "rgba(35, 35, 42, 0.45)",
                color1: "rgba(10, 10, 12, 0.0)",
            },
            // 2: Deep Obsidian Core (Center)
            {
                baseX: 0.52,
                baseY: 0.55,
                radius: 68,
                speedX: 0.45,
                speedY: 0.6,
                color0: "rgba(0, 0, 0, 1.0)",
                color1: "rgba(12, 12, 15, 0.0)",
            },
            // 3: Subtle Graphite Ripple (Center-Right)
            {
                baseX: 0.70,
                baseY: 0.42,
                radius: 58,
                speedX: 0.65,
                speedY: 0.7,
                color0: "rgba(42, 42, 50, 0.4)",
                color1: "rgba(15, 15, 18, 0.0)",
            },
            // 4: Dark Onyx Shadow (Right)
            {
                baseX: 0.86,
                baseY: 0.5,
                radius: 65,
                speedX: 0.52,
                speedY: 0.68,
                color0: "rgba(12, 12, 16, 0.8)",
                color1: "rgba(0, 0, 0, 0.0)",
            },
            // 5: Soft Micro-Graphite Wave
            {
                baseX: 0.48,
                baseY: 0.4,
                radius: 50,
                speedX: 0.75,
                speedY: 0.8,
                color0: "rgba(30, 30, 36, 0.35)",
                color1: "rgba(0, 0, 0, 0.0)",
            },
        ];

        let lastTime = performance.now();

        const render = (now: number) => {
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;

            if (isVisible && width > 0 && height > 0) {
                // Smooth interpolation for mouse reactivity
                const m = mousePosRef.current;
                m.x += (m.targetX - m.x) * 0.12;
                m.y += (m.targetY - m.y) * 0.12;

                // Smooth, continuous liquid silk motion
                const speedMult = isHoveredRef.current ? 1.4 : 1.0;
                time += dt * speedMult;

                // ── 1. Pure Jet-Black Solid Base ──
                ctx.fillStyle = "#000000";
                ctx.fillRect(0, 0, width, height);

                // ── 2. Render Subtle Liquid Charcoal/Graphite Waves (No white spaces) ──
                nodes.forEach((node, idx) => {
                    const offsetX = Math.sin(time * node.speedX + idx * 1.5) * 22 + Math.cos(time * 0.35 + idx) * 8;
                    const offsetY = Math.cos(time * node.speedY + idx * 1.2) * 12 + Math.sin(time * 0.45 + idx) * 5;
                    const centerX = node.baseX * width + offsetX;
                    const centerY = node.baseY * height + offsetY;

                    // Mouse magnetic attraction
                    let pullX = 0;
                    let pullY = 0;
                    if (m.active) {
                        const dx = m.x - centerX;
                        const dy = m.y - centerY;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 110) {
                            const strength = (1 - dist / 110) * 0.35;
                            pullX = dx * strength;
                            pullY = dy * strength;
                        }
                    }

                    const currentRadius = node.radius + Math.sin(time * 1.2 + idx * 1.1) * 8;

                    const radGrad = ctx.createRadialGradient(
                        centerX + pullX,
                        centerY + pullY,
                        0,
                        centerX + pullX,
                        centerY + pullY,
                        currentRadius
                    );
                    radGrad.addColorStop(0, node.color0);
                    radGrad.addColorStop(1, node.color1);

                    ctx.fillStyle = radGrad;
                    ctx.fillRect(0, 0, width, height);
                });

                // ── 3. Subtle Interactive Charcoal Glow under Pointer ──
                if (m.active) {
                    const cursorGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 65);
                    cursorGrad.addColorStop(0, "rgba(45, 45, 55, 0.3)");
                    cursorGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
                    ctx.fillStyle = cursorGrad;
                    ctx.fillRect(0, 0, width, height);
                }

                // ── 4. Deep Jet-Black Edge Vignette ──
                const vignette = ctx.createLinearGradient(0, 0, width, 0);
                vignette.addColorStop(0, "rgba(0, 0, 0, 0.98)");
                vignette.addColorStop(0.12, "rgba(0, 0, 0, 0.4)");
                vignette.addColorStop(0.5, "rgba(0, 0, 0, 0.1)");
                vignette.addColorStop(0.88, "rgba(0, 0, 0, 0.4)");
                vignette.addColorStop(1, "rgba(0, 0, 0, 0.98)");
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);
            }

            animFrameRef.current = requestAnimationFrame(render);
        };

        animFrameRef.current = requestAnimationFrame(render);

        return () => {
            if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
            }
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseenter", handleMouseEnter);
            container.removeEventListener("mouseleave", handleMouseLeave);
            ro.disconnect();
            io.disconnect();
        };
    }, []);

    return (
        <motion.a
            ref={containerRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center justify-center h-12 sm:h-[52px] px-8 sm:px-10 rounded-full select-none overflow-hidden cursor-pointer will-change-transform bg-black transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            title="View Resume (PDF)"
        >
            {/* ── 1. Deep-Black Liquid Obsidian Canvas (NO white patches) ── */}
            <canvas
                ref={canvasRef}
                className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] rounded-full filter blur-[10px] pointer-events-none"
            />

            {/* ── 2. Subtle Razor Specular Rim along top edge ── */}
            <div
                className="pointer-events-none absolute inset-x-7 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full opacity-60"
                aria-hidden="true"
            />

            {/* ── 3. Ultra-Crisp White Typography ── */}
            <span className="relative z-10 text-[15px] sm:text-[16px] font-medium text-white tracking-tight transition-colors duration-200">
                View Resume
            </span>
        </motion.a>
    );
}
