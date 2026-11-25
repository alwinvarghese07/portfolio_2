import HeroNavbar from "../components/HeroNavbar";
import HeroSection from "../components/HeroSection";
import CustomCursor from "../components/CustomCursor";
import FooterLight from "../components/FooterLight";
import ProjectsSection from "../components/ProjectsSection";
import AboutSection from "../components/AboutSection";
import { EditorialDivider } from "../components/EditorialGrid";

export default function Home() {
    return (
        <div className="relative bg-white text-[#1A1A1A] min-h-screen font-roobert selection:bg-black/10 selection:text-black overflow-x-clip">
            {/* Accessible skip link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
            >
                Skip to main content
            </a>

            {/* Global custom cursor */}
            <CustomCursor />

            {/* Main Content Container — 864px max-width matches the 800px card + 32px side padding */}
            <main id="main-content" className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 max-w-[864px] mx-auto w-full">
                {/* ── Architectural Column Guideline (Left) ── */}
                <div
                    className="absolute -top-6 sm:-top-10 bottom-0 left-0 w-[1px] bg-[#E2E2E2] pointer-events-none select-none hidden sm:block"
                    aria-hidden="true"
                />

                {/* ── Architectural Column Guideline (Right) ── */}
                <div
                    className="absolute -top-6 sm:-top-10 bottom-0 right-0 w-[1px] bg-[#E2E2E2] pointer-events-none select-none hidden sm:block"
                    aria-hidden="true"
                />

                {/* ── First Screen Hero: Calibrated so the first card peeks naturally above the fold without vertically crushing the navbar or hero ── */}
                <div id="home" className="min-h-[calc(100dvh-160px)] sm:min-h-[calc(100vh-210px)] md:min-h-[calc(100vh-280px)] flex flex-col justify-between">
                    <header className="shrink-0 w-full z-20">
                        <HeroNavbar />
                        {/* ── Editorial Divider 1: Anchors the top navigation from the hero statement ── */}
                        <div className="w-full pt-3 sm:pt-4">
                            <EditorialDivider fullWidth={true} />
                        </div>
                    </header>

                    <section className="flex-1 flex flex-col justify-center py-4">
                        <HeroSection />
                    </section>
                </div>

                {/* ── Editorial Divider 2: Structural boundary between Hero and Selected Works ── */}
                <div className="w-full pt-6 sm:pt-8 md:pt-10 pb-6 sm:pb-8">
                    <EditorialDivider fullWidth={true} />
                </div>

                {/* ── Selected Works & Experience ── */}
                <section id="works" data-section="projects-section" className="w-full pt-2 sm:pt-3">
                    <ProjectsSection />
                </section>

                {/* ── Editorial Divider 3: Demarcates Project Works from the About Section ── */}
                <div className="w-full pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12 md:pb-14">
                    <EditorialDivider fullWidth={true} />
                </div>

                {/* ── About Section (Bento Grid, Bio & Outside Design) ── */}
                <AboutSection className="!mt-0" />

                {/* ── Editorial Divider 4: Framing the Footer ── */}
                <div className="w-full mt-16 md:mt-24">
                    <EditorialDivider fullWidth={true} />
                </div>

                {/* ── Footer ── */}
                <div className="mt-8 md:mt-12">
                    <FooterLight hideBorder={true} />
                </div>
            </main>
        </div>
    );
}
