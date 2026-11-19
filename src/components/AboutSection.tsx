import { lazy, Suspense } from "react";
import { motion } from "motion/react";
import BentoGrid from "./BentoGrid";
import FigmaHighlight from "./FigmaHighlight";
import ExperienceHistory from "./ExperienceHistory";

const SpotifyCard = lazy(() => import("./SpotifyCard"));
const YTCard = lazy(() => import("./YoutubeCard"));

const BIO_PARAGRAPHS = [
    "I'm Alwin Varghese Saji, a UI/UX designer from India and a Computer Science undergrad, focused on designing clear, practical digital experiences.",
    "I've previously interned at Malayala Manorama, one of India's largest media organizations, and I'm currently working at ITProfound, where I design end-to-end experiences for travel and hospitality products.",
    "Alongside design, I produce electronic music under the name Alweece. Music has been a constant for me and gives me a different creative outlet outside of screens and interfaces.",
    "When I'm not working, you'll probably find me producing music, watching football, F1, WWE, cricket or tweaking my Spotify playlists.",
];

export default function AboutSection({ className = "" }: { className?: string }) {
    return (
        <section id="about" className={`w-full max-w-[800px] mx-auto ${className || "mt-20 md:mt-28"} flex flex-col`}>
            {/* ── Section Heading ── */}
            <div className="mb-5 md:mb-6">
                <h2 className="type-primary-section-heading">
                    <FigmaHighlight>About</FigmaHighlight>
                </h2>
            </div>

            {/* ── Visual Bento Grid ── */}
            <div className="w-full">
                <BentoGrid />
            </div>

            {/* ── Work Experience ── */}
            <ExperienceHistory />

            {/* ── Editorial Bio: A bit about me ── */}
            <div className="mt-14 md:mt-18 flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3 className="type-card-heading text-[#1A1A1A]">
                        A bit about me
                    </h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    className="flex flex-col gap-4 type-body text-[#333333] leading-[1.7]"
                >
                    {BIO_PARAGRAPHS.map((text, i) => (
                        <p key={i}>
                            {text}
                        </p>
                    ))}
                </motion.div>
            </div>

            {/* ── Outside of design: Music & Media ── */}
            <div className="mt-14 md:mt-18 flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h3 className="type-card-heading text-[#1A1A1A]">
                        Outside of design
                    </h3>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full items-stretch"
                >
                    <div className="w-full flex-1">
                        <Suspense fallback={<div className="h-[200px] w-full rounded-2xl bg-black/5" />}>
                            <SpotifyCard />
                        </Suspense>
                    </div>

                    <div className="w-full flex-1">
                        <Suspense fallback={<div className="h-[200px] w-full rounded-2xl bg-black/5" />}>
                            <YTCard />
                        </Suspense>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
