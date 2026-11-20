import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import ShowreelVideo from "../assets/videos/Showreel-Grid-Mobile-[remix] (1).mp4";
import DribbbleShot from "../assets/videos/Dribbble-shot.mp4";
import FooterLight from "../components/FooterLight";
import CustomCursor from "../components/CustomCursor";
import CaseStudyNavbar from "../components/CaseStudyNavbar";
import TumbledryContent from "../components/case-studies/TumbledryContent";
import WanderContent from "../components/case-studies/WanderContent";
import StayTransitContent from "../components/case-studies/StayTransitContent";
import Wander from "../assets/images/header.webp";
import TumbleDry from "../assets/images/alwin.webp";

// Case study data registry
const getCaseStudyData = (id: string | undefined) => {
    if (id === "staytransit") {
        return {
            title: "Designing airport services around a traveller’s time.",
            navTitle: "StayTransit",
            kicker: undefined,
            subtitle: "Making airport experiences easier to discover and book.",
            description: "StayTransit is an airport-focused booking platform for services such as lounges, stays, spas, workspaces and meet-and-greet assistance. I designed the traveller journey from search to booking, along with the operational dashboards behind the marketplace.",
            mediaUrl: undefined,
            content: "StayTransit is an airport-focused booking platform for services such as lounges, stays, spas, workspaces and meet-and-greet assistance. I designed the traveller journey from search to booking, along with the operational dashboards behind the marketplace.",
            image: undefined,
        };
    } else if (id === "tumbledry") {
        return {
            title: "Tumbledry",
            navTitle: "Tumbledry",
            kicker: undefined,
            subtitle: "Reimagining the laundry pickup experience.",
            description: "Improving booking clarity, service selection, and the overall user experience.",
            mediaUrl: ShowreelVideo,
            content: "This is the placeholder content for the TumbleDry case study. It will detail the process of redesigning the laundry service platform.",
            image: TumbleDry,
        };
    } else if (id === "wander") {
        return {
            title: "Wander",
            navTitle: "Wander",
            kicker: undefined,
            subtitle: "Outdoor adventure planning platform",
            description: "Built a platform to help people plan outdoor adventures with personalized suggestions and simple trip management.",
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
            {/* Accessible skip link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999999] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
            >
                Skip to main content
            </a>

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
            <main id="main-content" className="relative z-10 flex flex-col px-4 sm:px-6 md:px-8 max-w-[864px] mx-auto w-full">
                {/* ── Case Study Navbar (Matches homepage liquid-glass navbar system) ── */}
                <header className="shrink-0 w-full">
                    <CaseStudyNavbar title={data.navTitle || data.title} />
                </header>

                {/* ── Case Study Hero Header ── */}
                <div className="flex flex-col gap-2 max-w-[800px] mx-auto w-full pt-8 sm:pt-12">
                    {data.kicker && (
                        <span className="text-[12px] font-bold tracking-[0.13em] uppercase text-[#245CF5]">
                            {data.kicker}
                        </span>
                    )}
                    <h1 className="type-page-heading text-[#1A1A1A]">
                        {data.title}
                    </h1>

                    {data.subtitle && (
                        <p className="text-[15px] sm:text-[17px] md:text-[18px] text-[#596272] font-normal leading-relaxed max-w-[680px] mt-0.5">
                            {data.subtitle}
                        </p>
                    )}

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
                        ) : data.image ? (
                            <img
                                src={data.image}
                                alt={data.title}
                                fetchPriority="high"
                                className="w-full h-full object-cover rounded-[22px] md:rounded-[26px]"
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-[#F0F2F5] text-neutral-400 p-6 select-none rounded-[22px] md:rounded-[26px]">
                                <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center text-neutral-400 mb-2.5 shadow-xs">
                                    <svg className="w-7 h-7 stroke-[1.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                        <circle cx="8.5" cy="8.5" r="1.5"/>
                                        <polyline points="21 15 16 10 5 21"/>
                                    </svg>
                                </div>
                                <span className="text-xs uppercase tracking-widest text-neutral-600 font-semibold">{data.navTitle || data.title} Cover Placeholder</span>
                                <span className="text-[11px] text-neutral-400 mt-1">16:10 Hero Image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Case Study Detailed Content ── */}
                <div className="w-full max-w-[800px] mx-auto mt-12 sm:mt-16 md:mt-20">
                    {id === "staytransit" ? (
                        <StayTransitContent />
                    ) : id === "wander" ? (
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
