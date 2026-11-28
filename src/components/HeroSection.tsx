import { motion } from "motion/react";
import FuturisticResumeButton from "./FuturisticResumeButton";

export default function HeroSection() {
    return (
        <div className="relative w-full flex flex-col items-center justify-center text-center py-6 md:py-8">

            <div className="relative z-10 flex flex-col items-center max-w-[800px] mx-auto px-4">

                {/* ── Display / Hero Headline ── */}
                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.2,
                    }}
                    className="type-display text-[#1A1A1A] mb-4 md:mb-5"
                >
                    Designing digital products
                    <br />
                    that just make sense.
                </motion.h1>

                {/* ── Body Bio Paragraph ── */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.3,
                    }}
                    className="type-body text-[#555] max-w-[580px]"
                >
                    Hi, I'm Alwin. I design products from the first idea to the last pixel, and I cut more than I add.{" "}
                    Currently shaping products at{" "}
                    <span className="text-[#1A1A1A] font-medium underline underline-offset-4 decoration-[#D5D0CA]">
                        ITProfound Inc.
                    </span>{" "}
                    Previously at{" "}
                    <span className="text-[#1A1A1A] font-medium underline underline-offset-4 decoration-[#D5D0CA]">
                        Malayala Manorama
                    </span>,{" "}
                    <span className="text-[#1A1A1A] font-medium underline underline-offset-4 decoration-[#D5D0CA]">
                        Tillring
                    </span>
                    .
                </motion.p>

                {/* ── Futuristic Resume CTA Button ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        ease: [0.16, 1, 0.3, 1],
                        delay: 0.4,
                    }}
                    className="mt-7 md:mt-8"
                >
                    <FuturisticResumeButton href="https://drive.google.com/file/d/1gX57GUhkOfYPaT97oCK1ZxO59zW2WtSi/view?usp=sharing" />
                </motion.div>

            </div>
        </div>
    );
}
