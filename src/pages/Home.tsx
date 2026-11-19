import HeroNavbar from "../components/HeroNavbar";
import HeroSection from "../components/HeroSection";
import CustomCursor from "../components/CustomCursor";
import FooterLight from "../components/FooterLight";
import ProjectsSection from "../components/ProjectsSection";
import AboutSection from "../components/AboutSection";

export default function Home() {
    return (
        <div className="relative bg-white text-[#1A1A1A] min-h-screen font-roobert selection:bg-black/10 selection:text-black">
            {/* Global custom cursor */}
            <CustomCursor />

            {/* Subtle architectural grid background */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-40"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(0,0,0,0.035) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(0,0,0,0.035) 1px, transparent 1px)
                    `,
                    backgroundSize: '160px 160px',
                }}
            />

            {/* Main Content Container — 864px max-width matches the 800px card + 32px side padding */}
            <main className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 max-w-[864px] mx-auto w-full">
                
                {/* ── First Screen Hero: Calibrated so exactly half (250px) of the 800x500 first card peeks above the fold ── */}
                <div id="home" className="h-[calc(100dvh-160px)] sm:h-[calc(100vh-210px)] md:h-[calc(100vh-295px)] min-h-[340px] flex flex-col justify-between">
                    <header className="shrink-0">
                        <HeroNavbar />
                    </header>

                    <section className="flex-1 flex flex-col justify-center">
                        <HeroSection />
                    </section>
                </div>

                {/* ── Selected Works & Experience ── */}
                <section id="works" data-section="projects-section" className="w-full pt-2 sm:pt-3">
                    <ProjectsSection />
                </section>

                {/* ── About Section (Bento Grid, Bio & Outside Design) ── */}
                <AboutSection />

                {/* ── Footer ── */}
                <div className="mt-20 md:mt-28">
                    <FooterLight />
                </div>
            </main>
        </div>
    );
}
