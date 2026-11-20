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
    baseSize: number; // in px on 800px+ desktop
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

export interface FooterPlaygroundHandle {
    shake: () => void;
}

interface FooterPlaygroundProps {
    onShakeReady?: (shakeFn: () => void) => void;
}

export default function FooterPlayground({ onShakeReady }: FooterPlaygroundProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [isOverBlock, setIsOverBlock] = useState(false);
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

    // Responsive scaling based on viewport width
    const getScale = useCallback((width: number) => {
        if (width < 480) return 0.68;
        if (width < 768) return 0.82;
        return 1.0;
    }, []);

    // Create boundary walls: floor, left, right, and high ceiling
    const updateWalls = useCallback((width: number, height: number, engine: Matter.Engine) => {
        if (wallsRef.current.length > 0) {
            Matter.World.remove(engine.world, wallsRef.current);
            wallsRef.current = [];
        }

        const thickness = 200;
        const options: Matter.IChamferableBodyDefinition = {
            isStatic: true,
            friction: 0.35,
            restitution: 0.28,
            label: "boundary",
        };

        // Floor at bottom of playground, flush with the bottom edge
        const floor = Matter.Bodies.rectangle(width / 2, height + thickness / 2 + 4, width * 3, thickness, options);
        // Left wall spanning edge-to-edge
        const leftWall = Matter.Bodies.rectangle(-thickness / 2, height / 2 - 200, thickness, height * 2 + 800, options);
        // Right wall
        const rightWall = Matter.Bodies.rectangle(width + thickness / 2, height / 2 - 200, thickness, height * 2 + 800, options);
        // High ceiling so thrown blocks don't escape
        const ceiling = Matter.Bodies.rectangle(width / 2, -400 - thickness / 2, width * 3, thickness, options);

        wallsRef.current = [floor, leftWall, rightWall, ceiling];
        Matter.World.add(engine.world, wallsRef.current);
    }, []);

    // Sequentially drop blocks from above
    const startDropSequence = useCallback(() => {
        const container = containerRef.current;
        const engine = engineRef.current;
        if (!container || !engine) return;

        dropTimersRef.current.forEach(clearTimeout);
        dropTimersRef.current = [];

        bodiesRef.current.forEach((body) => {
            if (body) Matter.World.remove(engine.world, body);
        });
        bodiesRef.current = new Array(TOOLS.length).fill(null);

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const scale = getScale(width);

        elementsRef.current.forEach((el) => {
            if (el) {
                el.style.opacity = "0";
                el.style.transform = `translate3d(-999px, -999px, 0)`;
            }
        });

        TOOLS.forEach((tool, index) => {
            // Randomized delay: ~110ms to 230ms between blocks
            const delay = index * 120 + Math.random() * 80;

            const timer = window.setTimeout(() => {
                if (!engineRef.current || !containerRef.current) return;

                const size = tool.baseSize * scale;

                // Evenly distributed spawn column across full footer width with random jitter
                const colRatio = 0.08 + (index / (TOOLS.length - 1)) * 0.84;
                const jitter = (Math.random() - 0.5) * (width * 0.12);
                const spawnX = Math.max(size / 2 + 10, Math.min(width - size / 2 - 10, width * colRatio + jitter));
                const spawnY = -size - Math.random() * 50;

                // Rigid body with soft rounded cushion chamfer
                const body = Matter.Bodies.rectangle(spawnX, spawnY, size * 0.94, size * 0.94, {
                    chamfer: { radius: size * 0.24 },
                    restitution: 0.3,
                    friction: 0.28,
                    frictionAir: 0.018,
                    density: 0.003,
                    angle: (Math.random() - 0.5) * 0.5,
                });

                // Subtle initial tumble velocity
                Matter.Body.setVelocity(body, {
                    x: (Math.random() - 0.5) * 2.2,
                    y: Math.random() * 2 + 1.2,
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.035);

                bodiesRef.current[index] = body;
                Matter.World.add(engine.world, body);

                const el = elementsRef.current[index];
                if (el) {
                    el.style.opacity = "1";
                }
            }, delay);

            dropTimersRef.current.push(timer);
        });

        hasDroppedRef.current = true;
    }, [getScale]);

    // Shake things up: imparts upward pop and rotational impulse
    const handleShake = useCallback(() => {
        const engine = engineRef.current;
        if (!engine) return;

        let hasActiveBodies = false;
        bodiesRef.current.forEach((body) => {
            if (body) {
                hasActiveBodies = true;
                Matter.Body.applyForce(body, body.position, {
                    x: (Math.random() - 0.5) * 0.12,
                    y: -0.14 - Math.random() * 0.08,
                });
                Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.16);
            }
        });

        if (!hasActiveBodies) {
            startDropSequence();
        }
    }, [startDropSequence]);

    // Expose shake to parent
    useEffect(() => {
        if (onShakeReady) {
            onShakeReady(handleShake);
        }
    }, [onShakeReady, handleShake]);

    // Setup Matter.js Engine & RAF loop
    useEffect(() => {
        if (isReducedMotion) return;

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const engine = Matter.Engine.create({
            gravity: { x: 0, y: 1.0, scale: 0.001 },
            enableSleeping: false,
        });
        engineRef.current = engine;

        updateWalls(width, height, engine);

        let lastTime = performance.now();
        const updateLoop = (currentTime: number) => {
            if (isVisibleRef.current && engineRef.current) {
                const delta = Math.min(currentTime - lastTime, 32);
                lastTime = currentTime;

                Matter.Engine.update(engineRef.current, delta);

                const currentWidth = containerRef.current?.getBoundingClientRect().width || width;
                const scale = getScale(currentWidth);

                TOOLS.forEach((tool, index) => {
                    const body = bodiesRef.current[index];
                    const el = elementsRef.current[index];
                    if (!body || !el) return;

                    const size = tool.baseSize * scale;
                    const { x, y } = body.position;
                    const angle = body.angle;

                    el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0) rotate(${angle}rad)`;
                });
            } else {
                lastTime = currentTime;
            }

            rafIdRef.current = requestAnimationFrame(updateLoop);
        };

        rafIdRef.current = requestAnimationFrame(updateLoop);

        // IntersectionObserver: trigger drop and pause offscreen
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
                if (entry.isIntersecting && !hasDroppedRef.current) {
                    startDropSequence();
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(container);

        // ResizeObserver: update walls dynamically
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

        const clickedBodies = Matter.Query.point(
            bodiesRef.current.filter((b): b is Matter.Body => b !== null),
            { x: localX, y: localY }
        );

        if (clickedBodies.length > 0) {
            const targetBody = clickedBodies[0];
            activeDragBodyRef.current = targetBody;
            isDraggingRef.current = true;
            setIsInteracting(true);

            (window as unknown as { lenis?: { stop: () => void } }).lenis?.stop();

            Matter.Body.setStatic(targetBody, true);
            dragPointerHistoryRef.current = [{ x: localX, y: localY, time: performance.now() }];

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

        if (!isDraggingRef.current) {
            const activeBodies = bodiesRef.current.filter((b): b is Matter.Body => b !== null);
            const hovered = Matter.Query.point(activeBodies, { x: localX, y: localY });
            const over = hovered.length > 0;
            if (over !== isOverBlock) {
                setIsOverBlock(over);
            }
            return;
        }

        const activeBody = activeDragBodyRef.current;
        if (!activeBody) return;

        Matter.Body.setPosition(activeBody, {
            x: Math.max(30, Math.min(rect.width - 30, localX)),
            y: Math.max(20, Math.min(rect.height - 20, localY)),
        });

        const now = performance.now();
        const history = dragPointerHistoryRef.current;
        history.push({ x: localX, y: localY, time: now });
        if (history.length > 5) history.shift();
    };

    const handlePointerUp = () => {
        const activeBody = activeDragBodyRef.current;
        if (activeBody) {
            Matter.Body.setStatic(activeBody, false);

            const history = dragPointerHistoryRef.current;
            if (history.length >= 2) {
                const first = history[0];
                const last = history[history.length - 1];
                const dt = Math.max(16, last.time - first.time);
                const vx = ((last.x - first.x) / dt) * 16;
                const vy = ((last.y - first.y) / dt) * 16;

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
        setIsOverBlock(false);

        (window as unknown as { lenis?: { start: () => void } }).lenis?.start();
    };

    const handlePointerLeave = () => {
        if (!isDraggingRef.current) {
            setIsOverBlock(false);
        }
    };

    // Reduced Motion Fallback UI
    if (isReducedMotion) {
        return (
            <div className="w-full max-w-[800px] mx-auto px-4 sm:px-6 md:px-8 py-6 select-none">
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-4 w-full justify-items-center">
                    {TOOLS.map((tool) => (
                        <div key={tool.id} className="flex flex-col items-center gap-1.5 group">
                            <img
                                src={tool.src}
                                alt={tool.name}
                                width={68}
                                height={68}
                                className="w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] object-contain drop-shadow-sm transition-transform group-hover:scale-105"
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
        <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onPointerLeave={handlePointerLeave}
            data-cursor={isInteracting || isOverBlock ? "block-hand" : undefined}
            className={`relative w-full h-[140px] sm:h-[155px] md:h-[165px] overflow-hidden select-none will-change-transform ${
                isInteracting || isOverBlock ? "cursor-none" : "cursor-default"
            }`}
            style={{
                touchAction: isInteracting ? "none" : "pan-y",
            }}
        >
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
    );
}
