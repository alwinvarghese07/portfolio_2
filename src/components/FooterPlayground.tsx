import React, { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";

// Import all 13 3D tool cushion PNG assets
import jiraImg from "../assets/footer blocks/Blue Embossed Jira Logo Cushion.png";
import miroImg from "../assets/footer blocks/Glossy Yellow Leather Miro Icon.png";
import framerImg from "../assets/footer blocks/Inflatable Leather Framer Icon.png";
import antigravityImg from "../assets/footer blocks/Inflatable Rainbow Antigravity Icon.png";
import claudeImg from "../assets/footer blocks/Inflatable Terracotta Claude Starburst Icon.png";
import raycastImg from "../assets/footer blocks/Padded Charcoal Leather R Logo.png";
import notionImg from "../assets/footer blocks/Padded Leather Notion Cube Icon.png";
import chatgptImg from "../assets/footer blocks/Plush Black ChatGPT Knot Icon.png";
import figmaImg from "../assets/footer blocks/Plush Leather Figma Icon.png";
import githubImg from "../assets/footer blocks/Plush Leather GitHub Octocat Icon.png";
import jitterImg from "../assets/footer blocks/Puffy Purple Leather “Jttr” Icon.png";
import slackImg from "../assets/footer blocks/Puffy Purple Slack Icon.png";
import musicImg from "../assets/footer blocks/Stitched Leather Mango Music Icon.png";

interface ToolItem {
    id: string;
    name: string;
    category: string;
    src: string;
    baseSize: number; // in px on 800px desktop
}

const TOOLS: ToolItem[] = [
    { id: "figma", name: "Figma", category: "Product Design", src: figmaImg, baseSize: 84 },
    { id: "antigravity", name: "Antigravity", category: "Agentic IDE", src: antigravityImg, baseSize: 82 },
    { id: "claude", name: "Claude", category: "AI & Reasoning", src: claudeImg, baseSize: 80 },
    { id: "framer", name: "Framer", category: "Interactive Web", src: framerImg, baseSize: 78 },
    { id: "notion", name: "Notion", category: "Knowledge Base", src: notionImg, baseSize: 78 },
    { id: "slack", name: "Slack", category: "Collaboration", src: slackImg, baseSize: 78 },
    { id: "jira", name: "Jira", category: "Issue Tracking", src: jiraImg, baseSize: 76 },
    { id: "miro", name: "Miro", category: "User Journeys", src: miroImg, baseSize: 76 },
    { id: "chatgpt", name: "ChatGPT", category: "Generative AI", src: chatgptImg, baseSize: 74 },
    { id: "github", name: "GitHub", category: "Code & Shipping", src: githubImg, baseSize: 74 },
    { id: "raycast", name: "Raycast", category: "Speed & Workflows", src: raycastImg, baseSize: 72 },
    { id: "jitter", name: "Jitter", category: "Motion Graphics", src: jitterImg, baseSize: 72 },
    { id: "music", name: "Music Craft", category: "Audio Production", src: musicImg, baseSize: 72 },
];

export default function FooterPlayground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [hoveredTool, setHoveredTool] = useState<{ name: string; category: string; x: number; y: number } | null>(null);
    const [isInteracting, setIsInteracting] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    // Physics references
    const engineRef = useRef<Matter.Engine | null>(null);
    const bodiesRef = useRef<(Matter.Body | null)[]>([]);
    const rafIdRef = useRef<number | null>(null);
    const isVisibleRef = useRef(false);
    const hasDroppedRef = useRef(false);
    const dropTimersRef = useRef<number[]>([]);
    const wallsRef = useRef<Matter.Body[]>([]);

    // Drag tracking
    const activeDragBodyRef = useRef<Matter.Body | null>(null);
    const dragPointerHistoryRef = useRef<{ x: number; y: number; time: number }[]>([]);
    const isDraggingRef = useRef(false);

    // Check prefers-reduced-motion
    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(media.matches);
        const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    // Scale calculation based on container width
    const getScale = useCallback((width: number) => {
        if (width < 480) return 0.68;
        if (width < 768) return 0.82;
        return 1.0;
    }, []);

    // Create boundary walls
    const updateWalls = useCallback((width: number, height: number, engine: Matter.Engine) => {
        // Remove existing walls
        if (wallsRef.current.length > 0) {
            Matter.World.remove(engine.world, wallsRef.current);
            wallsRef.current = [];
        }

        const thickness = 100;
        const options: Matter.IChamferableBodyDefinition = {
            isStatic: true,
            friction: 0.4,
            restitution: 0.25,
            label: "boundary",
        };

        // Floor
        const floor = Matter.Bodies.rectangle(width / 2, height + thickness / 2, width * 2, thickness, options);
        // Left wall (extended upward so blocks dropping in don't escape sideways)
        const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2 - 200, thickness, height * 2 + 600, options);
        // Right wall
        const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2 - 200, thickness, height * 2 + 600, options);

        wallsRef.current = [floor, leftWall, rightWall];
        Matter.World.add(engine.world, wallsRef.current);
    }, []);

    // Sequentially drop blocks from above
    const startDropSequence = useCallback(() => {
        const container = containerRef.current;
        const engine = engineRef.current;
        if (!container || !engine) return;

        // Clear any pending drop timers
        dropTimersRef.current.forEach(clearTimeout);
        dropTimersRef.current = [];

        // Clear existing tool bodies from world
        bodiesRef.current.forEach((body) => {
            if (body) Matter.World.remove(engine.world, body);
        });
        bodiesRef.current = new Array(TOOLS.length).fill(null);

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const scale = getScale(width);

        // Reset DOM elements out of view
        elementsRef.current.forEach((el) => {
            if (el) {
                el.style.opacity = "0";
                el.style.transform = `translate3d(-999px, -999px, 0)`;
            }
        });

        // Staggered drop sequence
        TOOLS.forEach((tool, index) => {
            // Randomized delay: ~110ms to 240ms between blocks
            const delay = index * 130 + Math.random() * 80;

            const timer = window.setTimeout(() => {
                if (!engineRef.current || !containerRef.current) return;

                const size = tool.baseSize * scale;

                // Evenly distributed spawn column across width with random jitter
                const colRatio = 0.12 + (index / (TOOLS.length - 1)) * 0.76;
                const jitter = (Math.random() - 0.5) * (width * 0.15);
                const spawnX = Math.max(size / 2 + 10, Math.min(width - size / 2 - 10, width * colRatio + jitter));
                const spawnY = -size - Math.random() * 60; // Just above the visible container top

                // Rigid body with smooth rounded pillow corners
                const body = Matter.Bodies.rectangle(spawnX, spawnY, size * 0.95, size * 0.95, {
                    chamfer: { radius: size * 0.22 },
                    restitution: 0.32,      // Natural soft inflatable bounce
                    friction: 0.22,         // Good grip when sliding against other blocks
                    frictionAir: 0.018,     // Gentle air resistance for floaty settling
                    density: 0.003,
                    angle: (Math.random() - 0.5) * 0.5,
                });

                // Impart subtle initial tumble velocity
                Matter.Body.setVelocity(body, {
                    x: (Math.random() - 0.5) * 2.2,
                    y: Math.random() * 2 + 1.5,
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);

                bodiesRef.current[index] = body;
                Matter.World.add(engine.world, body);

                // Make DOM element visible
                const el = elementsRef.current[index];
                if (el) {
                    el.style.opacity = "1";
                }
            }, delay);

            dropTimersRef.current.push(timer);
        });

        hasDroppedRef.current = true;
    }, [getScale]);

    // Shake things up: imparts a playful upward shockwave impulse or replays drop
    const handleShake = useCallback(() => {
        const engine = engineRef.current;
        if (!engine) return;

        // If blocks are already in world, impart a joyful upward and chaotic lateral impulse
        let hasActiveBodies = false;
        bodiesRef.current.forEach((body) => {
            if (body) {
                hasActiveBodies = true;
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.14,
                    y: -0.12 - Math.random() * 0.1, // strong pop upwards
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);
            }
        });

        // If no bodies or first time, run full drop sequence
        if (!hasActiveBodies) {
            startDropSequence();
        }
    }, [startDropSequence]);

    // Setup Matter.js Engine & Game Loop
    useEffect(() => {
        if (isReducedMotion) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // 1. Initialize Matter.js Engine
        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1.0, scale: 0.001 },
            enableSleeping: false,
        });
        engineRef.current = engine;

        // 2. Setup Boundaries
        updateWalls(width, height, engine);

        // 3. RAF Simulation Loop with Direct DOM Sync
        let lastTime = performance.now();
        const updateLoop = (currentTime: number) => {
            // Only simulate when visible in viewport
            if (isVisibleRef.current && engineRef.current) {
                const delta = Math.min(currentTime - lastTime, 32);
                lastTime = currentTime;

                Matter.Engine.update(engineRef.current, delta);

                // Synchronize DOM elements directly without triggering React re-renders
                const currentWidth = containerRef.current?.getBoundingClientRect().width || width;
                const scale = getScale(currentWidth);

                TOOLS.forEach((tool, index) => {
                    const body = bodiesRef.current[index];
                    const el = elementsRef.current[index];
                    if (!body || !el) return;

                    const size = tool.baseSize * scale;
                    const { x, y } = body.position;
                    const angle = body.angle;

                    // GPU-accelerated translate3d + rotate
                    el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${angle}rad)`;
                });
            } else {
                lastTime = currentTime;
            }

            rafIdRef.current = requestAnimationFrame(updateLoop);
        };

        rafIdRef.current = requestAnimationFrame(updateLoop);

        // 4. IntersectionObserver: triggers initial drop & pauses when offscreen
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting && !hasDroppedRef.current) {
                    startDropSequence();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(container);

        // 5. ResizeObserver: adjusts walls and clamps bodies dynamically
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                const newWidth = entry.contentRect.width;
                const newHeight = entry.contentRect.height;
                if (newWidth > 0 && newHeight > 0 && engineRef.current) {
                    updateWalls(newWidth, newHeight, engineRef.current);
                }
            }
        });
        resizeObserver.observe(container);

        // 6. Cleanup
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            dropTimersRef.current.forEach(clearTimeout);
            observer.disconnect();
            resizeObserver.disconnect();
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world, false);
                Matter.Engine.clear(engineRef.current);
                engineRef.current = null;
            }
        };
    }, [isReducedMotion, updateWalls, startDropSequence, getScale]);

    // Pointer Drag & Throw Handlers
    const handlePointerDown = (e: React.PointerEvent) => {
        const container = containerRef.current;
        const engine = engineRef.current;
        if (!container || !engine) return;

        const rect = container.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;

        // Find nearest body clicked
        const clickedBodies = Matter.Query.point(
            bodiesRef.current.filter((b): b is Matter.Body => b !== null),
            { x: localX, y: localY }
        );

        if (clickedBodies.length > 0) {
            const targetBody = clickedBodies[0];
            activeDragBodyRef.current = targetBody;
            isDraggingRef.current = true;
            setIsInteracting(true);

            // Pause Lenis smooth scroll while dragging
            (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();

            // Set static during drag for precise pointer following
            Matter.Body.setStatic(targetBody, true);

            dragPointerHistoryRef.current = [{ x: localX, y: localY, time: performance.now() }];

            // Capture pointer on container
            (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            e.preventDefault();
        }
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const localX = e.clientX - rect.left;
        const localY = e.clientY - rect.top;

        // Hover detection for tooltip when not dragging
        if (!isDraggingRef.current) {
            const activeBodies = bodiesRef.current.filter((b): b is Matter.Body => b !== null);
            const hovered = Matter.Query.point(activeBodies, { x: localX, y: localY });
            if (hovered.length > 0) {
                const bodyIndex = bodiesRef.current.indexOf(hovered[0]);
                if (bodyIndex !== -1) {
                    const tool = TOOLS[bodyIndex];
                    setHoveredTool({
                        name: tool.name,
                        category: tool.category,
                        x: localX,
                        y: Math.max(20, localY - 45),
                    });
                    return;
                }
            }
            setHoveredTool(null);
            return;
        }

        // Active dragging
        const activeBody = activeDragBodyRef.current;
        if (!activeBody) return;

        // Update body position directly
        Matter.Body.setPosition(activeBody, {
            x: Math.max(30, Math.min(rect.width - 30, localX)),
            y: Math.max(30, Math.min(rect.height - 20, localY)),
        });

        // Track velocity history (keep last 4 points for throwing momentum)
        const now = performance.now();
        const history = dragPointerHistoryRef.current;
        history.push({ x: localX, y: localY, time: now });
        if (history.length > 5) history.shift();

        // Update tooltip position to follow dragged block
        const bodyIndex = bodiesRef.current.indexOf(activeBody);
        if (bodyIndex !== -1) {
            setHoveredTool({
                name: TOOLS[bodyIndex].name,
                category: TOOLS[bodyIndex].category,
                x: localX,
                y: Math.max(20, localY - 50),
            });
        }
    };

    const handlePointerUp = () => {
        const activeBody = activeDragBodyRef.current;
        if (activeBody) {
            // Restore dynamic physics state
            Matter.Body.setStatic(activeBody, false);

            // Calculate release velocity for natural throwing
            const history = dragPointerHistoryRef.current;
            if (history.length >= 2) {
                const first = history[0];
                const last = history[history.length - 1];
                const dt = Math.max(16, last.time - first.time);
                const vx = ((last.x - first.x) / dt) * 16;
                const vy = ((last.y - first.y) / dt) * 16;

                // Clamp throwing velocity to prevent wild clipping
                const clampedVx = Math.max(-24, Math.min(24, vx));
                const clampedVy = Math.max(-24, Math.min(24, vy));

                Matter.Body.setVelocity(activeBody, { x: clampedVx, y: clampedVy });
                Matter.Body.setAngularVelocity(activeBody, clampedVx * 0.016);
            }

            activeDragBodyRef.current = null;
        }

        isDraggingRef.current = false;
        setIsInteracting(false);
        dragPointerHistoryRef.current = [];
        setHoveredTool(null);

        // Resume Lenis smooth scroll
        (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
    };

    // Reduced Motion Fallback UI: Clean, static, accessible grid
    if (isReducedMotion) {
        return (
            <div className="w-full flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] text-[#888] uppercase tracking-wider">
                        The tools behind the work
                    </span>
                    <span className="font-mono text-[10px] text-[#aaa]">
                        Static View
                    </span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 w-full py-4 justify-items-center">
                    {TOOLS.map((tool) => (
                        <div key={tool.id} className="flex flex-col items-center gap-1.5 group">
                            <img
                                src={tool.src}
                                alt={tool.name}
                                width={68}
                                height={68}
                                className="w-[56px] h-[56px] sm:w-[68px] sm:h-[68px] object-contain drop-shadow-sm transition-transform group-hover:scale-105"
                            />
                            <span className="font-mono text-[10px] text-[#777] group-hover:text-black">
                                {tool.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col select-none">
            {/* ── Editorial Header & Controls ── */}
            <div className="flex items-center justify-between w-full mb-3 px-1">
                <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[11px] text-[#777] uppercase tracking-wider font-medium">
                        The tools behind the work
                    </span>
                    <span className="hidden sm:inline-block text-[#ccc]">/</span>
                    <span className="hidden sm:inline-block font-mono text-[11px] text-[#999]">
                        Grab & toss daily drivers
                    </span>
                </div>

                {/* Understated "Shake things up" Replay Control */}
                <button
                    type="button"
                    onClick={handleShake}
                    data-cursor="pointer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#555] bg-black/[0.03] border border-black/[0.07] hover:bg-black/[0.06] hover:text-[#1A1A1A] active:scale-95 transition-all duration-200 cursor-pointer"
                    title="Shake things up and bounce the blocks"
                    aria-label="Shake things up"
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:rotate-180"
                        aria-hidden="true"
                    >
                        <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                    <span>Shake things up</span>
                </button>
            </div>

            {/* ── Interactive Physics Playground Container ── */}
            <div
                ref={containerRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                data-cursor={isInteracting ? "grabbing" : "grab"}
                className="relative w-full h-[300px] sm:h-[350px] md:h-[380px] rounded-2xl bg-gradient-to-b from-black/[0.015] to-transparent border border-[#E2E2E2] overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing will-change-transform"
                style={{
                    touchAction: isInteracting ? "none" : "pan-y",
                }}
            >
                {/* Subtle subtle floor drafting coordinate marks */}
                <div className="absolute bottom-2 left-3 font-mono text-[9px] text-[#bbb] pointer-events-none select-none tracking-wider">
                    2D PHYSICS // MATTER.JS
                </div>
                <div className="absolute bottom-2 right-3 font-mono text-[9px] text-[#bbb] pointer-events-none select-none tracking-wider">
                    13 RIGID BODIES
                </div>

                {/* Floating Tooltip for Active/Hovered Tool */}
                {hoveredTool && (
                    <div
                        className="absolute z-30 pointer-events-none select-none -translate-x-1/2 -translate-y-full transition-opacity duration-150"
                        style={{
                            left: hoveredTool.x,
                            top: hoveredTool.y,
                        }}
                    >
                        <div className="px-2.5 py-1 rounded-full bg-black/90 backdrop-blur-md text-white text-[11px] font-mono tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap">
                            <span className="font-medium text-white">{hoveredTool.name}</span>
                            <span className="text-white/40">·</span>
                            <span className="text-white/70 text-[10px]">{hoveredTool.category}</span>
                        </div>
                    </div>
                )}

                {/* Physics Bodies Rendered as High-Resolution 3D Tool Cushions */}
                {TOOLS.map((tool, index) => (
                    <div
                        key={tool.id}
                        ref={(el) => {
                            elementsRef.current[index] = el;
                        }}
                        className="absolute top-0 left-0 pointer-events-none will-change-transform opacity-0"
                        style={{
                            width: `${tool.baseSize}px`,
                            height: `${tool.baseSize}px`,
                        }}
                    >
                        <img
                            src={tool.src}
                            alt={tool.name}
                            width={tool.baseSize * 2}
                            height={tool.baseSize * 2}
                            loading="eager"
                            decoding="async"
                            draggable={false}
                            className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] select-none"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
