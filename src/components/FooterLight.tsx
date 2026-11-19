import mailIcon from "../assets/images/mail.webp";
import linkedinIcon from "../assets/images/linkedin.webp";
import xIcon from "../assets/images/insta.webp";

export default function Footer({ hideBorder = false }: { hideBorder?: boolean }) {
    return (
        <footer className={`w-full max-w-[800px] mx-auto ${hideBorder ? "pt-2" : "mt-20 pt-10 border-t border-[#D0D0D0]"}`}>
            <div className="w-full">
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
                                <img src={xIcon} alt="Instagram" className="w-7 h-7 object-contain" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="w-full mt-16 pb-8 flex justify-center">
                    <span className="type-caption text-[#999]">
                        © Alwin Varghese Saji, 2026
                    </span>
                </div>
            </div>
        </footer>
    );
}
