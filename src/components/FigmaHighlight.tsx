import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const FIGMA_SELECTION_FILL = "#B8DDF5";
export const FIGMA_SELECTION_COLOR = "#1A1A1A";
export const FIGMA_SELECTION_BORDER = "#168BEB";

interface FigmaHighlightProps {
    children: React.ReactNode;
    className?: string;
}

/**
 * FigmaHighlight — Reusable Figma-inspired text selection highlight component.
 *
 * Visual specifications:
 * - Light blue selection fill: #B8DDF5
 * - Heading text color: #1A1A1A (Black)
 * - Bright blue selection boundaries & handles: #168BEB
 * - Asymmetrical handles:
 *   - Left side: Vertical blue line with a circular blue handle at its BOTTOM endpoint.
 *   - Right side: Vertical blue line with a circular blue handle at its TOP endpoint.
 */
export default function FigmaHighlight({
    children,
    className = "",
}: FigmaHighlightProps) {
    return (
        <span
            className={`relative inline-block bg-[#B8DDF5] text-[#000000] px-2 sm:px-2.5 py-0.5 sm:py-1 select-text ${className}`}
        >
            {/* ── Left Selection Boundary Line & Bottom Circle Handle ── */}
            <span
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#168BEB] pointer-events-none select-none z-10"
                aria-hidden="true"
            >
                {/* Asymmetrical circular handle at BOTTOM endpoint */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#168BEB] shadow-[0_0_0_0.5px_#168BEB]" />
            </span>

            {/* ── Right Selection Boundary Line & Top Circle Handle ── */}
            <span
                className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#168BEB] pointer-events-none select-none z-10"
                aria-hidden="true"
            >
                {/* Asymmetrical circular handle at TOP endpoint */}
                <span className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#168BEB] shadow-[0_0_0_0.5px_#168BEB]" />
            </span>

            {/* ── Real, Accessible Heading Text (Clearly positioned above background) ── */}
            <span className="relative z-20 font-inherit tracking-inherit leading-inherit text-[#000000]">
                {children}
            </span>
        </span>
    );
}

interface LineRect {
    top: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}

/**
 * Merges raw DOMRects on the same visual text line into cohesive continuous bounding boxes.
 */
function mergeLineRects(rects: DOMRect[]): LineRect[] {
    if (rects.length === 0) return [];

    const lines: LineRect[] = [];
    const sorted = [...rects].sort((a, b) => a.top - b.top || a.left - b.left);

    for (const r of sorted) {
        if (r.width <= 0.5 || r.height <= 0.5) continue;

        const lastLine = lines[lines.length - 1];
        if (lastLine && Math.abs(r.top - lastLine.top) < 6 && Math.abs(r.bottom - lastLine.bottom) < 6) {
            lastLine.left = Math.min(lastLine.left, r.left);
            lastLine.right = Math.max(lastLine.right, r.right);
            lastLine.top = Math.min(lastLine.top, r.top);
            lastLine.bottom = Math.max(lastLine.bottom, r.bottom);
            lastLine.width = lastLine.right - lastLine.left;
            lastLine.height = lastLine.bottom - lastLine.top;
        } else {
            lines.push({
                top: r.top,
                left: r.left,
                right: r.right,
                bottom: r.bottom,
                width: r.width,
                height: r.height,
            });
        }
    }

    return lines;
}

/**
 * FigmaSelectionOverlay — Global dynamic selection manager.
 * Extends the Figma highlight effect across any selected text in the portfolio.
 */
export function FigmaSelectionOverlay() {
    const [lines, setLines] = useState<LineRect[] | null>(null);
    const [mounted, setMounted] = useState(false);
    const rafIdRef = useRef<number | null>(null);
    const hasActiveSelectionRef = useRef(false);

    useEffect(() => {
        setMounted(true);

        const updateSelection = () => {
            const selection = window.getSelection();
            if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
                hasActiveSelectionRef.current = false;
                setLines(null);
                return;
            }

            const text = selection.toString();
            if (!text || text.trim().length === 0) {
                hasActiveSelectionRef.current = false;
                setLines(null);
                return;
            }

            // Don't interfere with inputs, textareas, or editable elements
            const anchorNode = selection.anchorNode;
            const focusNode = selection.focusNode;
            const isInsideInput = (node: Node | null) => {
                let el = node instanceof Element ? node : node?.parentElement;
                while (el) {
                    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable) {
                        return true;
                    }
                    el = el.parentElement;
                }
                return false;
            };

            if (isInsideInput(anchorNode) || isInsideInput(focusNode)) {
                hasActiveSelectionRef.current = false;
                setLines(null);
                return;
            }

            try {
                const range = selection.getRangeAt(0);
                const rawRects = Array.from(range.getClientRects());
                const merged = mergeLineRects(rawRects);

                if (merged.length === 0) {
                    hasActiveSelectionRef.current = false;
                    setLines(null);
                    return;
                }

                hasActiveSelectionRef.current = true;
                setLines(merged);
            } catch {
                hasActiveSelectionRef.current = false;
                setLines(null);
            }
        };

        const queueUpdate = () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
            rafIdRef.current = requestAnimationFrame(updateSelection);
        };

        const onSelectionChange = () => {
            const sel = window.getSelection();
            if (!sel || sel.isCollapsed) {
                if (hasActiveSelectionRef.current) {
                    hasActiveSelectionRef.current = false;
                    setLines(null);
                }
                return;
            }
            queueUpdate();
        };

        // Scroll or resize only needs to recompute rects when an active selection is displayed!
        const onScrollOrResize = () => {
            if (!hasActiveSelectionRef.current) return;
            queueUpdate();
        };

        document.addEventListener("selectionchange", onSelectionChange);
        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize, { passive: true });

        // Connect with Lenis smooth scroll if active
        const lenis = (window as unknown as { lenis?: { on: (event: string, cb: () => void) => () => void } }).lenis;
        let unsubscribeLenis: (() => void) | undefined;
        if (lenis && typeof lenis.on === "function") {
            unsubscribeLenis = lenis.on("scroll", onScrollOrResize);
        }

        return () => {
            document.removeEventListener("selectionchange", onSelectionChange);
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            if (unsubscribeLenis) unsubscribeLenis();
        };
    }, []);

    if (!mounted || !lines || lines.length === 0) {
        return null;
    }

    const firstLine = lines[0];
    const lastLine = lines[lines.length - 1];

    return createPortal(
        <div
            className="fixed inset-0 pointer-events-none select-none z-[999999] overflow-hidden"
            aria-hidden="true"
        >
            {/* ── Left Selection Boundary Line & Bottom Circle Handle (at selection start) ── */}
            <div
                className="absolute w-[2px] bg-[#168BEB] pointer-events-none"
                style={{
                    left: `${firstLine.left}px`,
                    top: `${firstLine.top}px`,
                    height: `${firstLine.height}px`,
                }}
            >
                {/* Asymmetrical circular handle at BOTTOM endpoint */}
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#168BEB] shadow-[0_0_0_0.5px_#168BEB]" />
            </div>

            {/* ── Right Selection Boundary Line & Top Circle Handle (at selection end) ── */}
            <div
                className="absolute w-[2px] bg-[#168BEB] pointer-events-none"
                style={{
                    left: `${lastLine.right - 2}px`,
                    top: `${lastLine.top}px`,
                    height: `${lastLine.height}px`,
                }}
            >
                {/* Asymmetrical circular handle at TOP endpoint */}
                <span className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#168BEB] shadow-[0_0_0_0.5px_#168BEB]" />
            </div>
        </div>,
        document.body
    );
}
