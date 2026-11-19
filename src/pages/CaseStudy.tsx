import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ShowreelVideo from "../assets/videos/Showreel-Grid-Mobile-[remix] (1).mp4";
import DribbbleShot from "../assets/videos/Dribbble-shot.mp4";
import FooterLight from "../components/FooterLight";
import CustomCursor from "../components/CustomCursor";
import CaseStudyNavbar from "../components/CaseStudyNavbar";
import TumbledryContent from "../components/case-studies/TumbledryContent";
import WanderContent from "../components/case-studies/WanderContent";
import Wander from "../assets/images/header.webp";
import TumbleDry from "../assets/images/alwin.webp";

// Case study data registry
const getCaseStudyData = (id: string | undefined) => {
    if (id === "tumbledry") {
        return {
            title: "Tumbledry",
            subtitle: "Reimagining the laundry pickup experience.",
            description: "improving booking clarity, service selection, and the overall user experience.",
            tags: ["User Flows", "Wireframes", "UX Research", "Prototyping", "UI Design"],
            mediaUrl: ShowreelVideo,
            content: "This is the placeholder content for the TumbleDry case study. It will detail the process of redesigning the laundry service platform.",
            image: TumbleDry,
        };
    } else if (id === "wander") {
        return {
            title: "Wander",
            subtitle: "Outdoor adventure planning platform",
            description: "Built a platform to help people plan outdoor adventures with personalized suggestions and simple trip management.",
            tags: ["User Flows", "Wireframes", "UX Research", "Prototyping", "UI Design"],
            mediaUrl: DribbbleShot,
            content: "This is the placeholder content for the Wander case study. It describes the platform built to help people plan outdoor adventures.",
            image: Wander,
        };
    }
    return null;
};

export default function CaseStudy() {
    const { id } = useParams();
    const navigate = useNavigate();
    const data = getCaseStudyData(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!data) {
        return (
            <div className="relative bg-white text-[#1A1A1A] min-h-screen font-roobert flex flex-col items-center justify-center px-4">
                <CustomCursor />
                <h1 className="type-page-heading text-center mb-4">Case Study Not Found</h1>
                <p className="type-body text-[#666] mb-8 text-center">The project you're looking for doesn't exist or has moved.</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2.5 rounded-full bg-[#1A1A1A] text-white hover:bg-black transition-colors font-medium type-button"
                >
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="relative bg-white text-[#1A1A1A] min-h-screen font-roobert selection:bg-black/10 selection:text-black">
            {/* Global custom cursor */}
            <CustomCursor />

            {/* Subtle architectural grid background (matching homepage) */}
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

            {/* Atmospheric soft aura backdrop */}
            <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[340px] sm:w-[540px] h-[260px] pointer-events-none -z-0">
                <div
                    className="w-full h-full rounded-full opacity-35 blur-3xl"
                    style={{
                        background: 'radial-gradient(circle, rgba(165,180,252,0.3) 0%, rgba(224,231,255,0.18) 45%, rgba(255,255,255,0) 70%)'
                    }}
                />
            </div>

            {/* Main Content Container — 864px max-width matches the 800px card + 32px side padding */}
            <main className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 max-w-[864px] mx-auto w-full">
                {/* ── Case Study Navbar (Matches homepage liquid-glass navbar system) ── */}
                <header className="shrink-0 w-full">
                    <CaseStudyNavbar title={data.title} />
                </header>

                {/* ── Case Study Hero Header ── */}
                <div className="flex flex-col gap-4 max-w-[800px] mx-auto w-full pt-8 sm:pt-12">
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.06] text-[11px] sm:text-xs font-semibold text-[#666] tracking-wider uppercase">
                            Case Study
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h1 className="type-page-heading text-[#1A1A1A]">
                            {data.title}
                        </h1>

                        {data.subtitle && (
                            <p className="type-subheading text-[18px] sm:text-[21px] text-[#555] font-normal leading-snug max-w-[700px] mt-1">
                                {data.subtitle}
                            </p>
                        )}

                        {/* Metadata Tag Pills */}
                        <div className="flex flex-wrap gap-2 pt-3">
                            {data.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-black/[0.035] hover:bg-black/[0.06] text-[#222] text-[12px] sm:text-[13px] font-medium rounded-full border border-black/[0.06] transition-colors"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── Hero Media Showcase (LCP candidate, high fetchpriority per modern-web-guidance) ── */}
                    <div className="w-full mt-4 sm:mt-6 aspect-[16/10] rounded-[22px] md:rounded-[26px] overflow-hidden bg-[#FAFAFA] border-0 shadow-none relative">
                        {id === "tumbledry" && data.mediaUrl ? (
                            <video
                                src={data.mediaUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover rounded-[22px] md:rounded-[26px]"
                            />
                        ) : (
                            <img
                                src={data.image}
                                alt={data.title}
                                fetchPriority="high"
                                className="w-full h-full object-cover rounded-[22px] md:rounded-[26px]"
                            />
                        )}
                    </div>
                </div>

                {/* ── Case Study Detailed Content ── */}
                <div className="w-full max-w-[800px] mx-auto mt-12 sm:mt-16 md:mt-20">
                    {id === "wander" ? (
                        <WanderContent />
                    ) : id === "tumbledry" ? (
                        <TumbledryContent />
                    ) : (
                        <div className="mt-8 flex flex-col gap-6 w-full p-8 bg-[#FAFAFA] rounded-3xl border-0 shadow-none">
                            <h2 className="type-card-heading text-2xl text-[#1A1A1A]">Overview</h2>
                            <p className="type-body text-[#555] leading-relaxed">
                                {data.content}
                            </p>
                        </div>
                    )}
                </div>

                {/* ── Footer ── */}
                <div className="mt-20 md:mt-28">
                    <FooterLight />
                </div>
            </main>
        </div>
    );
}
