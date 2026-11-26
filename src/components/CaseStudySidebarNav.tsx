import { useEffect, useState, useRef, useCallback } from "react";
import type Lenis from "@studio-freight/lenis";

interface SectionItem {
    id: string;
    label: string;
    element: HTMLElement;
    isSubItem?: boolean;
}

interface CaseStudySidebarNavProps {
    contentSelector?: string;
    caseStudyId?: string;
    variant: "sidebar" | "mobile";
}

function formatSectionLabel(rawText: string): string {
    let trimmed = rawText.trim();

    // Strip leading numbers like "01 / ", "05.1 — ", "05.1 - ", "01. ", "01 "
    trimmed = trimmed.replace(/^(\d+(\.\d+)?)\s*[/—–\-:]*\s*/i, "").trim();

    if (/^project overview$/i.test(trimmed)) return "Overview";

    if (trimmed === trimmed.toUpperCase()) {
        trimmed = trimmed
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    return trimmed;
}

function toSlug(text: string, index: number): string {
    const base = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    return base ? `section-${base}` : `section-${index + 1}`;
}

export default function CaseStudySidebarNav({
    contentSelector = "#case-study-content",
    caseStudyId,
    variant,
}: CaseStudySidebarNavProps) {
    const [sections, setSections] = useState<SectionItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const isClickScrollingRef = useRef(false);
    const clickTimeoutRef = useRef<number | null>(null);

    const discoverSections = useCallback((): SectionItem[] => {
        const container = document.querySelector(contentSelector);
        if (!container) return [];

        const candidates = Array.from(
            container.querySelectorAll<HTMLElement>("section, [data-case-study-subitem]")
        );

        const discovered: SectionItem[] = [];
        const usedIds = new Set<string>();

        candidates.forEach((block, idx) => {
            const isSubItem = block.hasAttribute("data-case-study-subitem");
            const kickerEl =
                block.querySelector<HTMLElement>(".type-metadata, [class*='font-mono'], span.font-mono") ||
                block.querySelector<HTMLElement>("h3, h2, span");
            const rawLabel = kickerEl?.textContent?.trim() || "";
            if (!rawLabel) return;

            const label = formatSectionLabel(rawLabel);
            let id = block.id || toSlug(label, idx);
            while (usedIds.has(id)) {
                id = `${id}-${idx + 1}`;
            }
            usedIds.add(id);

            if (!block.id) {
                block.id = id;
            }
            block.style.scrollMarginTop = "96px";

            discovered.push({ id, label, element: block, isSubItem });
        });

        return discovered;
    }, [contentSelector]);

    // Discover sections reliably without infinite mutation loops
    useEffect(() => {
        let mounted = true;

        const runDiscovery = () => {
            if (!mounted) return;
            const items = discoverSections();
            if (items.length > 0) {
                setSections((prev) => {
                    const isIdentical =
                        prev.length === items.length &&
                        prev.every((s, i) => s.id === items[i].id);
                    return isIdentical ? prev : items;
                });
                setActiveId((prev) => (prev && items.some((i) => i.id === prev) ? prev : items[0].id));
            }
        };

        runDiscovery();

        // Retry in case Suspense components mount slightly later
        const timer1 = setTimeout(runDiscovery, 120);
        const timer2 = setTimeout(runDiscovery, 400);

        // One-time observer that disconnects once sections are populated
        const container = document.querySelector(contentSelector);
        let observer: MutationObserver | null = null;
        if (container) {
            observer = new MutationObserver(() => {
                const items = discoverSections();
                if (items.length > 0) {
                    runDiscovery();
                    observer?.disconnect();
                }
            });
            observer.observe(container, { childList: true, subtree: true });
        }

        return () => {
            mounted = false;
            clearTimeout(timer1);
            clearTimeout(timer2);
            observer?.disconnect();
        };
    }, [contentSelector, caseStudyId, discoverSections]);

    // Flicker-free scroll-spy using deterministic RAF scroll sampling
    useEffect(() => {
        if (sections.length === 0) return;

        let rafId: number | null = null;

        const updateActive = () => {
            if (isClickScrollingRef.current) return;

            const scrollY = window.scrollY;
            const clientHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            // Detection zone set around upper-middle portion of viewport (~40% of viewport height)
            const triggerZone = clientHeight * 0.40;

            // Near top of document
            if (scrollY < 120) {
                setActiveId(sections[0].id);
                return;
            }

            // Near bottom of document
            if (scrollY + clientHeight >= scrollHeight - 60) {
                setActiveId(sections[sections.length - 1].id);
                return;
            }

            // Find section occupying the active reading zone
            let currentId = sections[0].id;
            for (let i = 0; i < sections.length; i++) {
                const rect = sections[i].element.getBoundingClientRect();
                if (rect.top <= triggerZone) {
                    currentId = sections[i].id;
                } else {
                    break;
                }
            }

            setActiveId((prev) => (prev !== currentId ? currentId : prev));
        };

        const onScroll = () => {
            if (rafId !== null) return;
            rafId = requestAnimationFrame(() => {
                updateActive();
                rafId = null;
            });
        };

        updateActive();

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        return () => {
            if (rafId !== null) cancelAnimationFrame(rafId);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sections]);

    const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, item: SectionItem) => {
        e.preventDefault();
        setActiveId(item.id);

        isClickScrollingRef.current = true;
        if (clickTimeoutRef.current !== null) {
            clearTimeout(clickTimeoutRef.current);
        }
        clickTimeoutRef.current = window.setTimeout(() => {
            isClickScrollingRef.current = false;
        }, 950);

        const lenis = (window as unknown as { lenis?: Lenis | null }).lenis;
        const easeInOutCubic = (t: number) =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (lenis) {
            lenis.scrollTo(item.element, {
                offset: -96,
                duration: 0.9,
                easing: easeInOutCubic,
            });
        } else {
            const top = item.element.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    if (sections.length === 0) return null;

    if (variant === "mobile") {
        return (
            <nav
                aria-label="Case study sections"
                className="xl:hidden sticky top-[72px] sm:top-[80px] z-30 bg-white/95 backdrop-blur-sm -mx-4 px-4 sm:-mx-6 sm:px-6 py-2.5 mb-6 border-b border-black/[0.04]"
            >
                <ul className="flex items-center gap-5 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {sections.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <li key={item.id} className="shrink-0">
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => handleNavigate(e, item)}
                                    aria-current={isActive ? "location" : undefined}
                                    className={`relative inline-block ${
                                        item.isSubItem ? "text-[13.5px]" : "text-[15px]"
                                    } tracking-tight pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171A22]/40 focus-visible:rounded-sm transition-colors duration-200 ${
                                        isActive
                                            ? "text-[#171A22] font-medium"
                                            : "text-[#9AA2B1] hover:text-[#171A22] font-normal"
                                    }`}
                                >
                                    <span>{item.label}</span>
                                    <span
                                        aria-hidden="true"
                                        className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#171A22] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                                            isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                                        }`}
                                    />
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }

    return (
        <nav
            aria-label="Case study sections"
            className="w-[230px] py-2 select-none"
        >
            <ul className="flex flex-col items-start gap-2.5">
                {sections.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li
                            key={item.id}
                            className={`w-full text-left ${item.isSubItem ? "pl-3.5" : ""}`}
                        >
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => handleNavigate(e, item)}
                                aria-current={isActive ? "location" : undefined}
                                className={`relative inline-block ${
                                    item.isSubItem ? "text-[13.5px]" : "text-[15px]"
                                } leading-snug tracking-tight pb-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#171A22]/40 focus-visible:rounded-sm transition-colors duration-200 ${
                                    isActive
                                        ? "text-[#171A22] font-medium"
                                        : "text-[#9AA2B1] hover:text-[#171A22] font-normal"
                                }`}
                            >
                                <span>{item.label}</span>
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 right-0 bottom-0 h-[1.5px] bg-[#171A22] origin-left transition-transform duration-250 ease-out pointer-events-none ${
                                        isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
                                    }`}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
