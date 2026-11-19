import { useEffect, useRef } from 'react';
import ferrariCursor from '../assets/images/ferrari_cursor.png';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const roundCursorRef = useRef<HTMLDivElement>(null);
    const pillCursorRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    // Interaction states using refs
    const isVisible = useRef(false);
    const isHoveringBento = useRef(false);
    const isClickable = useRef(false);
    const currentText = useRef<string | null>(null);

    // Position tracking
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    // F1 Launch Interaction States
    const isHolding = useRef(false);
    const holdStartTime = useRef(0);
    const holdStartPos = useRef({ x: 0, y: 0 });
    const holdProgress = useRef(0);
    const isLaunching = useRef(false);
    const launchStartTime = useRef(0);
    const launchOrigin = useRef({ x: 0, y: 0 });
    const launchOffset = useRef({ x: 0, y: 0 });
    const isRecovering = useRef(false);
    const recoverStartTime = useRef(0);
    const lastFrameTime = useRef(performance.now());

    useEffect(() => {
        const isTouchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        if (isTouchOnly) {
            if (cursorRef.current) cursorRef.current.style.display = 'none';
            return;
        }

        const isInteractive = (target: HTMLElement | null): boolean => {
            if (!target) return false;
            return !!target.closest(
                "a, button, input, textarea, select, [role='button'], [data-cursor], [draggable='true'], iframe, video, audio, [contenteditable='true'], nav, header"
            );
        };

        const isSelectableTextOrContent = (e: MouseEvent, target: HTMLElement | null): boolean => {
            if (!target) return false;

            // 1. Any active text selection currently exists on the page
            const sel = window.getSelection();
            if (sel && (!sel.isCollapsed || sel.toString().trim().length > 0)) {
                return true;
            }

            // 2. Check if target or any ancestor is a typography or text-containing element
            const textAncestor = target.closest(
                "h1, h2, h3, h4, h5, h6, p, span, li, blockquote, figcaption, article, cite, code, pre, label, small, strong, em, b, i, u, mark, [class*='type-'], .select-text, dd, dt"
            ) as HTMLElement | null;

            if (textAncestor) {
                const style = window.getComputedStyle(textAncestor);
                if (style.userSelect !== 'none' && (textAncestor.textContent || '').trim().length > 0) {
                    return true;
                }
            }

            // 3. Direct text nodes within target
            if (target.childNodes && target.childNodes.length > 0) {
                for (let i = 0; i < target.childNodes.length; i++) {
                    const node = target.childNodes[i];
                    if (node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim().length > 0) {
                        const style = window.getComputedStyle(target);
                        if (style.userSelect !== 'none') return true;
                    }
                }
            }

            // 4. Point-based caret detection (inspects exact coordinates e.clientX, e.clientY)
            if (typeof document.caretRangeFromPoint === 'function') {
                try {
                    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
                    if (range && range.startContainer) {
                        const container = range.startContainer;
                        if (container.nodeType === Node.TEXT_NODE && (container.textContent || '').trim().length > 0) {
                            const rect = range.getBoundingClientRect ? range.getBoundingClientRect() : null;
                            if (rect && rect.height > 0) {
                                const distX = Math.max(0, rect.left - e.clientX, e.clientX - rect.right);
                                const distY = Math.max(0, rect.top - e.clientY, e.clientY - rect.bottom);
                                if (distX <= 40 && distY <= 30) {
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        }
                    }
                } catch {
                    // Ignore caret errors
                }
            }

            // 5. Content card or nested content container check:
            // Do not classify a card or content section as blank space
            const isPageRootCanvas =
                target === document.body ||
                target === document.documentElement ||
                target.id === 'main-content' ||
                target.id === 'home' ||
                target.classList.contains('min-h-screen') ||
                target.classList.contains('custom-grain-layer');

            if (!isPageRootCanvas) {
                const hasTextDescendant = target.querySelector("h1, h2, h3, h4, h5, h6, p, span, [class*='type-'], li, blockquote");
                if (hasTextDescendant) {
                    const style = window.getComputedStyle(target);
                    if (style.userSelect !== 'none') {
                        return true;
                    }
                }
            }

            return false;
        };

        const isGenuinelyEmptyBackground = (e: MouseEvent, target: HTMLElement | null): boolean => {
            if (!target) return false;

            // Never activate on clickable or interactive elements
            if (isInteractive(target)) return false;

            // Never activate on or near selectable text or inside content containers
            if (isSelectableTextOrContent(e, target)) return false;

            // Genuinely empty space must be the root page canvas or an empty container with no text content
            const isCanvas =
                target === document.body ||
                target === document.documentElement ||
                target.id === 'main-content' ||
                target.id === 'home' ||
                target.classList.contains('min-h-screen') ||
                target.classList.contains('custom-grain-layer');

            if (isCanvas) return true;

            // Otherwise, target must be completely empty of text
            if ((target.textContent || '').trim().length === 0) {
                return true;
            }

            return false;
        };

        const cancelHold = () => {
            if (isHolding.current) {
                isHolding.current = false;
                document.body.style.userSelect = '';
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
            if (!isVisible.current) {
                isVisible.current = true;
                cursorPos.current = { x: e.clientX, y: e.clientY };
                if (cursorRef.current) {
                    cursorRef.current.style.display = 'flex';
                    cursorRef.current.style.opacity = '1';
                }
            }

            const target = e.target as HTMLElement;

            // If holding in empty space, but user starts dragging (moved > 3px) or moves over text/interactive:
            // Cancel hold immediately to allow drag gestures without interference
            if (isHolding.current) {
                const dist = Math.hypot(e.clientX - holdStartPos.current.x, e.clientY - holdStartPos.current.y);
                if (dist > 3 || isInteractive(target) || isSelectableTextOrContent(e, target)) {
                    cancelHold();
                }
            }

            // 1. Detect Bento Grid items
            const bentoEl = target.closest("[data-cursor]") as HTMLElement;
            if (bentoEl) {
                const label = bentoEl.getAttribute("data-cursor");
                if (currentText.current !== label) {
                    currentText.current = label;
                    if (textRef.current) textRef.current.textContent = label;
                }
                isHoveringBento.current = true;
            } else {
                isHoveringBento.current = false;
            }

            // 2. Detect Clickable items
            const clickableEl = target.closest("a, button, [role='button'], [data-cursor]");
            isClickable.current = !!clickableEl;

            if (isClickable.current || isHoveringBento.current) {
                cancelHold();
            }
        };

        const onMouseDown = (e: MouseEvent) => {
            if (e.button !== 0) return; // Left click only
            if (isLaunching.current || isHoveringBento.current || isClickable.current) return;

            const target = e.target as HTMLElement;

            // Only genuinely empty background reaches here — selectable text & interactive elements are ignored
            if (!isGenuinelyEmptyBackground(e, target)) {
                cancelHold();
                return;
            }

            isHolding.current = true;
            holdStartTime.current = performance.now();
            holdStartPos.current = { x: e.clientX, y: e.clientY };
            holdProgress.current = 0;
            // Never set userSelect = 'none' here — preserve natural browser drag/selection
        };

        const onMouseUp = (e: MouseEvent) => {
            if (e.button === 0) {
                cancelHold();
            }
        };

        const onCancel = () => {
            cancelHold();
        };

        const onMouseLeave = () => {
            isVisible.current = false;
            cancelHold();
            if (cursorRef.current) cursorRef.current.style.opacity = '0';
        };

        const onMouseEnter = () => {
            isVisible.current = true;
            if (cursorRef.current) cursorRef.current.style.opacity = '1';
        };

        const onSelectionChange = () => {
            const sel = window.getSelection();
            if (sel && sel.toString().trim().length > 0) {
                cancelHold();
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('blur', onCancel);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        document.addEventListener('selectionchange', onSelectionChange);

        // Animation loop for smooth Lerp & F1 Launch Physics
        let rafId: number;
        const animate = () => {
            const now = performance.now();
            const dt = Math.min((now - lastFrameTime.current) / 1000, 0.05);
            lastFrameTime.current = now;

            const lerpFactor = 0.15;
            cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
            cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`;
            }

            // F1 Cursor States
            if (roundCursorRef.current) {
                if (isHoveringBento.current || isClickable.current) {
                    cancelHold();
                    roundCursorRef.current.style.transition = 'all 300ms ease';
                    roundCursorRef.current.style.transform = 'scale(0)';
                    roundCursorRef.current.style.opacity = '0';
                } else if (isLaunching.current) {
                    roundCursorRef.current.style.transition = 'none';
                    const t = (now - launchStartTime.current) / 1000;
                    // Acceleration curve: zooms forward to the left!
                    const speed = 1200 + 7500 * t * t;
                    launchOffset.current.x -= speed * dt;

                    const screenX = launchOrigin.current.x + launchOffset.current.x;
                    const screenY = launchOrigin.current.y + launchOffset.current.y;
                    const relX = screenX - cursorPos.current.x;
                    const relY = screenY - cursorPos.current.y;

                    roundCursorRef.current.style.transform = `translate3d(${relX}px, ${relY}px, 0) scale(2.8) scaleX(1.15)`;
                    roundCursorRef.current.style.opacity = '1';

                    // Check if car has fully exited the visible screen
                    if (screenX < -180) {
                        isLaunching.current = false;
                        isRecovering.current = true;
                        recoverStartTime.current = now;
                        document.body.style.userSelect = '';
                    }
                } else if (isHolding.current) {
                    roundCursorRef.current.style.transition = 'none';
                    const REV_DURATION = 1200; // 1.2s to reach launch
                    const elapsed = now - holdStartTime.current;
                    const progress = Math.min(1, elapsed / REV_DURATION);
                    holdProgress.current = progress;

                    if (progress >= 1) {
                        // Launch!
                        isHolding.current = false;
                        isLaunching.current = true;
                        launchStartTime.current = now;
                        launchOrigin.current = { x: cursorPos.current.x, y: cursorPos.current.y };
                        launchOffset.current = { x: 0, y: 0 };
                        document.body.style.userSelect = 'none';
                    } else {
                        // Progressive Rev: Scale up to 2.8x with subtle engine vibration
                        const currentScale = 1 + progress * 1.8;
                        const jitterX = (Math.random() - 0.5) * progress * 3.8;
                        const jitterY = (Math.random() - 0.5) * progress * 3.8;
                        roundCursorRef.current.style.transform = `translate3d(${jitterX}px, ${jitterY}px, 0) scale(${currentScale.toFixed(3)})`;
                        roundCursorRef.current.style.opacity = '1';
                    }
                } else if (isRecovering.current) {
                    roundCursorRef.current.style.transition = 'none';
                    const RECOVER_DURATION = 350;
                    const elapsed = now - recoverStartTime.current;
                    const progress = Math.min(1, elapsed / RECOVER_DURATION);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    roundCursorRef.current.style.transform = `scale(${eased.toFixed(3)})`;
                    roundCursorRef.current.style.opacity = `${eased.toFixed(3)}`;

                    if (progress >= 1) {
                        isRecovering.current = false;
                    }
                } else {
                    // Normal Idle
                    roundCursorRef.current.style.transition = 'all 300ms cubic-bezier(0.16, 1, 0.3, 1)';
                    roundCursorRef.current.style.transform = 'scale(1)';
                    roundCursorRef.current.style.opacity = '1';
                }
            }

            // Update pill cursor
            if (pillCursorRef.current) {
                if (isHoveringBento.current) {
                    pillCursorRef.current.style.transform = 'scale(1)';
                    pillCursorRef.current.style.opacity = '1';
                } else {
                    pillCursorRef.current.style.transform = 'scale(0.5)';
                    pillCursorRef.current.style.opacity = '0';
                }
            }

            rafId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('blur', onCancel);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('selectionchange', onSelectionChange);
            cancelAnimationFrame(rafId);
            document.body.style.userSelect = '';
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-10000 will-change-transform flex items-center justify-center opacity-0 transition-opacity duration-300"
        >
            {/* 1. FERRARI F1 CAR CURSOR */}
            <div
                ref={roundCursorRef}
                className="w-[72px] -ml-[36px] -mt-[8px] flex items-center justify-center will-change-transform origin-center pointer-events-none select-none relative"
                style={{ transformOrigin: 'center center' }}
            >
                {/* Ferrari F1 Car Image */}
                <img
                    src={ferrariCursor}
                    alt="Ferrari F1 Cursor"
                    width={72}
                    className="w-[72px] h-auto object-contain pointer-events-none select-none relative z-10"
                    style={{ width: '72px', height: 'auto', objectFit: 'contain' }}
                    draggable={false}
                />
            </div>

            {/* 2. BLUE PILL CURSOR */}
            <div
                ref={pillCursorRef}
                className="absolute flex flex-col items-start transition-all duration-300 ease-out will-change-transform"
                style={{
                    left: 0,
                    top: 0,
                    transform: 'scale(0.5)',
                    opacity: 0,
                    transformOrigin: 'top left'
                }}
            >
                {/* Pointer Triangle (Tip is at 0,0) */}
                <div
                    className="w-4 h-4 bg-[#0066FF] mb-[-4px] ml-1"
                    style={{ clipPath: 'polygon(0% 0%, 100% 100%, 0% 100%)', transform: 'rotate(-15deg)' }}
                ></div>

                {/* Text Pill */}
                <div className="bg-[#0066FF] rounded-full px-4 py-2 shadow-2xl border border-white/10 flex items-center gap-2">
                    <span ref={textRef} className="text-white text-xs md:text-sm font-semibold whitespace-nowrap select-none">
                    </span>
                </div>
            </div>
        </div>
    );
}
