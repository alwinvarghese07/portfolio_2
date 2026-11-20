import { useState, useCallback } from "react";
import mailIcon from "../assets/images/mail.webp";
import linkedinIcon from "../assets/images/linkedin.webp";
import xIcon from "../assets/images/insta.webp";
import FooterPlayground from "./FooterPlayground";

export default function Footer({ hideBorder = false }: { hideBorder?: boolean }) {
    const [shakeFn, setShakeFn] = useState<(() => void) | null>(null);

    const handleShakeReady = useCallback((fn: () => void) => {
        setShakeFn(() => fn);
    }, []);

    const triggerShake = () => {
        if (shakeFn) {
            shakeFn();
        }
    };

    return (
        <footer className={`w-full max-w-[800px] mx-auto overflow-hidden ${hideBorder ? "pt-2" : "mt-20 pt-10 border-t border-[#D0D0D0]"}`}>
            <div className="w-full">
                {/* ── Conversation & Socials ── */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mt-6">
                    {/* Left side */}
                    <div className="flex flex-col gap-2">
                        <h2 className="type-card-heading text-[22px] md:text-[24px] text-[#1A1A1A]">
                            Glad you made it this far.
                        </h2>
                        <p className="type-body-secondary text-[#666]">
                            Hope something here sparked an idea or at least left you curious.
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col items-start md:items-end gap-4 text-left md:text-right">
                        <span className="type-body-secondary text-[#666]">
                            Let's keep the conversation going.
                        </span>
                        <div className="flex gap-2 sm:gap-3 items-center">
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="mailto:alwin.varghese.saji@gmail.com"
                                aria-label="Send email to Alwin"
                                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/[0.04] active:scale-95 transition-all duration-200"
                            >
                                <img src={mailIcon} alt="Email" className="w-7 h-7 object-contain" />
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://linkedin.com/in/alwinvarghesesaji"
                                aria-label="Alwin's LinkedIn Profile"
                                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/[0.04] active:scale-95 transition-all duration-200"
                            >
                                <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 object-contain" />
                            </a>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.instagram.com/alweece/"
                                aria-label="Alwin's Instagram Profile"
                                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-black/[0.04] active:scale-95 transition-all duration-200"
                            >
                                <img src={xIcon} alt="Instagram" className="w-6 h-6 object-contain" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Subtle, understated introduction */}
                <div className="pt-8 sm:pt-10 pb-1">
                    <span className="font-mono text-[11px] text-[#888] uppercase tracking-wider font-medium">
                        The tools behind the work
                    </span>
                </div>

                {/* ── Center Space Physics Playground ── */}
                <div className="w-full">
                    <FooterPlayground onShakeReady={handleShakeReady} />
                </div>

                {/* ── Footer Bottom: Copyright & Replay Control ── */}
                <div className="w-full pt-3 pb-8 flex items-center justify-between text-[#999]">
                    <span className="type-caption text-[#999]">
                        © Alwin Varghese Saji, 2026
                    </span>

                    {/* Understated "Shake things up" button */}
                    <button
                        type="button"
                        onClick={triggerShake}
                        data-cursor="pointer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#666] hover:text-[#1A1A1A] hover:bg-black/[0.04] active:scale-95 transition-all duration-200 cursor-pointer"
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
                            className="transition-transform duration-300 hover:rotate-180"
                            aria-hidden="true"
                        >
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                        </svg>
                        <span>Shake things up</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
