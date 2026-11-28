import React from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

/**
 * Reveal — Clean layout wrapper.
 * Unnecessary scroll-triggered opacity fades removed per design audit (Pattern 19).
 * Content renders immediately and smoothly without scroll jank or layout shift.
 */
export default function Reveal({ children, className = "" }: RevealProps) {
    return (
        <div className={className}>
            {children}
        </div>
    );
}
