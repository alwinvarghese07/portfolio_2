import Reveal from "../reveal";
import FigmaHighlight from "../FigmaHighlight";

interface ShowcaseFrameProps {
    title: string;
    caption?: string;
    aspect?: string;
    narrow?: boolean;
    variant?: "default" | "browser" | "mobile";
    figmaLink?: string;
    badge?: string;
}

function ShowcaseFrame({
    title,
    caption,
    aspect = "aspect-[16/10]",
    narrow = false,
    variant = "default",
    figmaLink,
    badge
}: ShowcaseFrameProps) {
    return (
        <figure className={`w-full ${narrow ? 'max-w-[420px] mx-auto' : ''} my-6 sm:my-8`}>
            {/* Outer Showcase Frame */}
            <div className="w-full p-2.5 sm:p-4 md:p-5 rounded-[22px] md:rounded-[26px] bg-[#FBFBFB] border-0 shadow-none">
                {/* Inner Mockup Canvas / Surface */}
                <div className={`w-full ${aspect} rounded-[16px] md:rounded-[20px] bg-white border-0 shadow-none overflow-hidden flex flex-col relative`}>
                    {/* Browser-style minimal header bar for web screens */}
                    {variant === "browser" && (
                        <div className="h-7 sm:h-8 px-3 sm:px-4 bg-[#F8F9FA] border-b border-black/[0.04] flex items-center justify-between shrink-0 select-none">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                            </div>
                            <div className="px-3 py-0.5 rounded-md bg-black/[0.04] text-[10px] sm:text-[11px] text-[#717680] font-mono tracking-tight truncate max-w-[200px] sm:max-w-[320px]">
                                medaramjathara2026.in · {title.toLowerCase().replace(/\s+/g, '-')}
                            </div>
                            <div className="w-8" />
                        </div>
                    )}

                    {/* Mobile notch / status bar for app screens */}
                    {variant === "mobile" && (
                        <div className="h-6 px-4 bg-[#F8F9FA] border-b border-black/[0.04] flex items-center justify-between shrink-0 select-none">
                            <span className="text-[10px] font-mono text-[#717680] font-medium">9:41</span>
                            <div className="w-16 h-3 rounded-full bg-black/10" />
                            <div className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-black/20" />
                                <span className="w-2 h-2 rounded-full bg-black/20" />
                            </div>
                        </div>
                    )}

                    {/* Canvas Area with interface placeholder wireframe hints */}
                    <div className="grow bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center relative select-none">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-neutral-400 mb-2.5">
                            <svg className="w-6 h-6 stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5"/>
                                <polyline points="21 15 16 10 5 21"/>
                            </svg>
                        </div>

                        {badge && (
                            <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#174A78]/10 text-[#174A78] text-[10px] font-bold uppercase tracking-wider mb-1">
                                {badge}
                            </span>
                        )}
                        <span className="text-[13px] sm:text-[13.5px] font-semibold text-[#171A22]">{title}</span>
                        <span className="text-[11px] text-[#717680] mt-0.5">Interface screenshot ready for swap</span>
                    </div>
                </div>
            </div>

            {/* Editorial Caption Bar */}
            {caption && (
                <figcaption className="mt-3 px-2 flex items-start gap-2.5 text-left">
                    <span className="w-1 h-3 rounded-full bg-[#174A78] shrink-0 mt-1" aria-hidden="true" />
                    <p className="text-[12.5px] sm:text-[13px] text-[#596272] leading-relaxed">
                        <strong className="text-[#171A22] font-semibold">{title}: </strong>
                        {caption}{" "}
                        {figmaLink && (
                            <a
                                href={figmaLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[#174A78] hover:underline font-medium ml-1"
                            >
                                Open original Figma frame ↗
                            </a>
                        )}
                    </p>
                </figcaption>
            )}
        </figure>
    );
}

export default function MedaramJatharaContent() {
    return (
        <div className="w-full flex flex-col gap-12 sm:gap-16 md:gap-20 font-roobert text-[#171A22]">

            {/* ── PROJECT HERO METADATA & OVERVIEW ── */}
            <Reveal>
                <div className="flex flex-col gap-5 sm:gap-6">
                    {/* Project Overview Spotlight Card */}
                    <div className="p-6 sm:p-7 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none flex flex-col md:flex-row gap-3 md:gap-8 items-start">
                        <div className="shrink-0 md:w-36 flex items-center">
                            <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                                <FigmaHighlight>Project overview</FigmaHighlight>
                            </h3>
                        </div>
                        <div className="grow">
                            <p className="text-[#2D3748] text-[14px] sm:text-[14.5px] leading-relaxed">
                                A connected digital experience that helps visitors prepare for a large-scale tribal festival and access essential information and support while they are there. Built around the Sammakka–Saralamma Jathara in Medaram, Telangana across two touchpoints: a Guest Web experience and a Guest App.
                            </p>
                        </div>
                    </div>

                    {/* Project Meta Bar */}
                    <div className="py-1 px-1">
                        <dl className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
                            <div>
                                <dt className="text-[11px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Touchpoints</dt>
                                <dd className="text-[13.5px] sm:text-[14px] font-semibold text-[#171A22]">Guest App + Guest Web</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Location</dt>
                                <dd className="text-[13.5px] sm:text-[14px] font-semibold text-[#171A22]">Medaram, Telangana</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Scope</dt>
                                <dd className="text-[13.5px] sm:text-[14px] font-semibold text-[#171A22]">Product design & flows</dd>
                            </div>
                            <div>
                                <dt className="text-[11px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Adoption</dt>
                                <dd className="inline-flex items-center gap-1.5 text-[13.5px] sm:text-[14px] font-semibold text-[#171A22]">
                                    <span className="w-2 h-2 rounded-full bg-[#1E8B68] animate-pulse" />
                                    5,000+ Downloads
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Reveal>

            {/* ── 01 / PROJECT SNAPSHOT ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>01 / PROJECT SNAPSHOT</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        One festival. Two digital touchpoints.
                    </h2>

                    <p className="text-[14px] sm:text-[14.5px] text-[#2D3748] leading-relaxed max-w-[760px]">
                        Medaram Jathara 2026 is a digital experience built around the Sammakka–Saralamma Jathara in Medaram, Telangana. The project contains two product surfaces: a Guest Web experience and a Guest App.
                    </p>
                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The website is primarily for discovery and preparation before a visit. The mobile app is designed for people attending the festival who need quick access to practical information, services and safety support.
                    </p>
                </section>
            </Reveal>

            {/* ── 02 / CONTEXT ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>02 / CONTEXT</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Designing for the scale of Medaram
                    </h2>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The full-scale 2024 Jathara was held from 21–24 February. On the final day, Telangana minister Danasari Anasuya said approximately 1.35 crore devotees had offered prayers by Saturday afternoon. The Government of India’s Press Information Bureau described the biennial gathering as the second-largest fair in India after the Kumbh Mela.
                    </p>

                    {/* 3-column Metrics Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 my-2">
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[140px]">
                            <div>
                                <strong className="block text-[24px] sm:text-[28px] font-bold text-[#174A78] tracking-tight leading-none mb-2">1.35 crore</strong>
                                <b className="block text-[13.5px] font-semibold text-[#171A22] mb-1">Reported attendance</b>
                                <p className="text-[12px] text-[#717680] leading-relaxed">
                                    Minister-reported figure by 24 Feb 2024 afternoon; not a final audited headcount.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[140px]">
                            <div>
                                <strong className="block text-[24px] sm:text-[28px] font-bold text-[#174A78] tracking-tight leading-none mb-2">5,090</strong>
                                <b className="block text-[13.5px] font-semibold text-[#171A22] mb-1">Missing-child reports</b>
                                <p className="text-[12px] text-[#717680] leading-relaxed">
                                    Reported during the 2024 four-day gathering.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[140px]">
                            <div>
                                <strong className="block text-[24px] sm:text-[28px] font-bold text-[#174A78] tracking-tight leading-none mb-2">5,062</strong>
                                <b className="block text-[13.5px] font-semibold text-[#171A22] mb-1">Children reunited</b>
                                <p className="text-[12px] text-[#717680] leading-relaxed">
                                    Reported reunifications during the 2024 event.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The same ministerial briefing said 20 departments were involved in the event. These figures communicate the operational scale and the importance of clear assistance pathways. They are context—not outcomes caused by this 2026 product.
                    </p>

                    {/* Editorial Callout */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none my-1">
                        <p className="text-[14px] sm:text-[14.5px] text-[#20394F] font-medium leading-relaxed italic border-l-2 border-[#174A78] pl-4">
                            When more than a crore devotees gather over four days, even basic tasks—finding a service point, understanding where to go, or asking for help—become high-stakes interactions.
                        </p>
                    </div>
                </section>
            </Reveal>

            {/* ── 03 / THE CHALLENGE ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>03 / THE CHALLENGE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Make the festival easier to navigate, before and during the visit
                    </h2>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        Visitors need different information at different moments: travel routes and schedules before setting out; then medical help, drinking water, parking, help desks, missing-person support or emergency assistance once they reach the festival area.
                    </p>

                    {/* Two-Column Stage Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-1">
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-3.5 rounded-full bg-[#174A78]" />
                                <h3 className="text-[15px] font-semibold text-[#171A22]">Before the visit</h3>
                            </div>
                            <p className="text-[13.5px] text-[#4A5568] leading-relaxed">
                                Help people understand the festival, plan the journey and find reliable official information.
                            </p>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-3.5 rounded-full bg-[#245CF5]" />
                                <h3 className="text-[15px] font-semibold text-[#171A22]">During the visit</h3>
                            </div>
                            <p className="text-[13.5px] text-[#4A5568] leading-relaxed">
                                Make essential services and safety actions easy to locate and act on in a crowded, unfamiliar environment.
                            </p>
                        </div>
                    </div>

                    {/* Problem Statement Card */}
                    <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-1.5 my-1">
                        <h3 className="text-[11.5px] font-bold uppercase tracking-wider text-[#717680]">Problem statement</h3>
                        <p className="text-[14px] sm:text-[14.5px] text-[#171A22] italic leading-relaxed">
                            “How might we help visitors prepare for Medaram Jathara and access essential information and support during the event, through two connected digital experiences designed for different stages of the journey?”
                        </p>
                    </div>
                </section>
            </Reveal>

            {/* ── 04 / PEOPLE AND NEEDS ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>04 / PEOPLE AND NEEDS</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Different visitors, different moments of need
                    </h2>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The experience brings together several visitor needs:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 my-1">
                        <div className="p-5 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#174A78]/10 text-[#174A78] flex items-center justify-center text-[11px] font-bold font-mono">01</span>
                            <h3 className="text-[14px] font-semibold text-[#171A22]">First-time visitors</h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                Need to understand the event, reach Medaram and find key locations without getting disoriented.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#174A78]/10 text-[#174A78] flex items-center justify-center text-[11px] font-bold font-mono">02</span>
                            <h3 className="text-[14px] font-semibold text-[#171A22]">Families & groups</h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                May need help locating one another or quickly initiating a missing-person report in large crowds.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#174A78]/10 text-[#174A78] flex items-center justify-center text-[11px] font-bold font-mono">03</span>
                            <h3 className="text-[14px] font-semibold text-[#171A22]">Assistance seekers</h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                Visitors requiring urgent medical assistance, accessibility support or on-ground help from an event desk.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2 sm:col-span-2 md:col-span-2">
                            <span className="w-6 h-6 rounded-md bg-[#174A78]/10 text-[#174A78] flex items-center justify-center text-[11px] font-bold font-mono">04</span>
                            <h3 className="text-[14px] font-semibold text-[#171A22]">Everyday facility seekers</h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                Visitors looking for drinking water, toilets, parking zones, accommodation, prasadam or darshan timings and procedures.
                            </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#174A78]/10 text-[#174A78] flex items-center justify-center text-[11px] font-bold font-mono">05</span>
                            <h3 className="text-[14px] font-semibold text-[#171A22]">Remote planners</h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                People planning from afar who need accurate schedules, transport routes, road guidelines and official advisories.
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ── 05 / PRODUCT STRATEGY ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>05 / PRODUCT STRATEGY</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        One ecosystem, two distinct jobs
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-1">
                        {/* Guest Web Panel */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-3.5 rounded-full bg-[#174A78]" />
                                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Guest Web — plan the visit</h3>
                                </div>
                                <p className="text-[13.5px] sm:text-[14px] text-[#4A5568] leading-relaxed">
                                    The website acts as the public information layer. It introduces the festival, explains how to reach the location, presents the schedule and route information, and provides a directory of safety services and practical facilities.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/80 border-0 shadow-none">
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#174A78] block mb-1">Primary question</span>
                                <p className="text-[13px] text-[#20394F] font-medium italic leading-relaxed">
                                    “What do I need to know before I go, and where can I find reliable information?”
                                </p>
                            </div>
                        </div>

                        {/* Guest App Panel */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-3.5 rounded-full bg-[#245CF5]" />
                                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Guest App — support the visit</h3>
                                </div>
                                <p className="text-[13.5px] sm:text-[14px] text-[#4A5568] leading-relaxed">
                                    The app acts as an on-ground companion. It foregrounds quick actions such as Report an Incident and Help Desk, alongside access to emergency SOS, medical assistance, missing-person reporting and other facilities.
                                </p>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/80 border-0 shadow-none">
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#245CF5] block mb-1">Primary question</span>
                                <p className="text-[13px] text-[#20394F] font-medium italic leading-relaxed">
                                    “I’m here. What do I need, where do I go, and how do I get help quickly?”
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The app and website serve different contexts of use, while forming one connected visitor experience.
                    </p>
                </section>
            </Reveal>

            {/* ── 06 / INFORMATION ARCHITECTURE ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>06 / INFORMATION ARCHITECTURE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        What each surface brings together
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-1">
                        {/* Guest Web IA */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3.5">
                            <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Guest Web Architecture</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#174A78] bg-[#174A78]/10 px-2 py-0.5 rounded-full">Public Layer</span>
                            </div>
                            <ul className="flex flex-col gap-2.5 text-[13px] sm:text-[13.5px] text-[#4A5568]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>Festival introduction and official information</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>How to reach Medaram: train and road guidance, route map</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>Festival schedule and chronological ceremonies</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>Public safety: SOS, help desk, incident reporting, lost and found, missing cases, safety guidelines</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>Service directory: ambulances, drinking water, landmarks, missing-person camps, fire response, parking, medical camps, toilets and water facilities</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold text-xs mt-0.5">•</span>
                                    <span>Help channels, accommodation, gallery and festival resources</span>
                                </li>
                            </ul>
                        </div>

                        {/* Guest App IA */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3.5">
                            <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Guest App Architecture</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#245CF5] bg-[#245CF5]/10 px-2 py-0.5 rounded-full">Companion Layer</span>
                            </div>
                            <ul className="flex flex-col gap-2.5 text-[13px] sm:text-[13.5px] text-[#4A5568]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Onboarding and mobile verification</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Home: official identity, quick actions and temple location</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Services and visitor support hub</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Safety: emergency SOS, medical assistance, missing-person reporting and incident reporting</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Service details: help desks, fire stations, medical points, parking, water and toilets</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-0.5">•</span>
                                    <span>Darshan, prasadam, accommodation and profile management</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ── 07 / KEY JOURNEYS ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>07 / KEY JOURNEYS</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Three useful paths through the experience
                    </h2>

                    <div className="flex flex-col gap-4 my-1">
                        {/* Journey A */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-3.5 rounded-full bg-[#174A78]" />
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">A — Prepare before travelling (web)</h3>
                            </div>
                            <ol className="flex flex-col gap-2.5 text-[13.5px] text-[#4A5568]">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <span>Discover the festival and understand the official information.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <span>Check the event schedule and how to reach Medaram.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <span>Review the route map and transport guidance.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <span>Browse relevant services, help channels and accommodation information.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">5</span>
                                    <span>Use the website as a reference while planning the visit.</span>
                                </li>
                            </ol>
                        </div>

                        {/* Journey B */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-3.5 rounded-full bg-[#245CF5]" />
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">B — Get help during the visit (app)</h3>
                            </div>
                            <ol className="flex flex-col gap-2.5 text-[13.5px] text-[#4A5568]">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <span>Open the app and reach the home screen.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <span>Choose a quick action such as Help Desk or Report an Incident, or navigate to Safety.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <span>For urgent situations, use Emergency SOS / Request Help Now.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <span>For a missing-person case, provide identifying details, last known location and a recent photo.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">5</span>
                                    <span>For everyday needs, find medical assistance, parking, water, toilets, help desks or other facilities.</span>
                                </li>
                            </ol>
                        </div>

                        {/* Journey C */}
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3">
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="w-1.5 h-3.5 rounded-full bg-[#1E8B68]" />
                                <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">C — Find a festival service (app or web)</h3>
                            </div>
                            <ol className="flex flex-col gap-2.5 text-[13.5px] text-[#4A5568]">
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">1</span>
                                    <span>Open the relevant service directory.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">2</span>
                                    <span>Choose a category, such as medical assistance, parking or accommodation.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">3</span>
                                    <span>Review the location, timing or listing details shown in the interface.</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="w-5 h-5 rounded-full bg-white text-[#171A22] text-[11px] font-semibold flex items-center justify-center shrink-0 mt-0.5">4</span>
                                    <span>Use the provided action or contact path to proceed.</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ── 08 / SELECTED INTERFACE SCREENS ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>08 / SELECTED INTERFACE SCREENS</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        How the experience takes shape
                    </h2>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The selected screens show how the two digital touchpoints support visitors before and during the festival.
                    </p>

                    {/* App Screens: 2-column Showcase */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
                        <ShowcaseFrame
                            title="Guest App — Home Screen"
                            caption="The on-ground entry point: official identity, quick actions and temple location."
                            aspect="aspect-[9/18]"
                            variant="mobile"
                            badge="Mobile App"
                            figmaLink="https://www.figma.com/design/JpjJkeBbKm6UT4iufypsOd/Medaram-Jathara-2026?node-id=1-457"
                        />

                        <ShowcaseFrame
                            title="Guest App — Darshan Details"
                            caption="A service detail screen with description, timings, location, instructions and charges."
                            aspect="aspect-[9/18]"
                            variant="mobile"
                            badge="Mobile App"
                            figmaLink="https://www.figma.com/design/JpjJkeBbKm6UT4iufypsOd/Medaram-Jathara-2026?node-id=1-1564"
                        />
                    </div>

                    {/* Web Screen: Full-width Browser Showcase */}
                    <ShowcaseFrame
                        title="Guest Web — Festival Information Page"
                        caption="A long-form page bringing together festival information, travel routes, schedule, public safety and service directories."
                        aspect="aspect-[16/10]"
                        variant="browser"
                        badge="Web Platform"
                        figmaLink="https://www.figma.com/design/JpjJkeBbKm6UT4iufypsOd/Medaram-Jathara-2026?node-id=1-3001"
                    />
                </section>
            </Reveal>

            {/* ── 09 / DESIGN DECISIONS ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>09 / DESIGN DECISIONS</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Decisions worth explaining
                    </h2>

                    <div className="flex flex-col gap-3 my-1">
                        <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-lg bg-white text-[#174A78] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border-0 shadow-none">01</span>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#171A22] mb-0.5">Separate by context</h3>
                                <p className="text-[13px] text-[#596272] leading-relaxed">
                                    Web for pre-visit discovery, app for on-ground utility.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-lg bg-white text-[#174A78] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border-0 shadow-none">02</span>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#171A22] mb-0.5">Prioritise urgent actions</h3>
                                <p className="text-[13px] text-[#596272] leading-relaxed">
                                    Place emergency and help pathways close to the app home and safety areas.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-lg bg-white text-[#174A78] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border-0 shadow-none">03</span>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#171A22] mb-0.5">Make services scannable</h3>
                                <p className="text-[13px] text-[#596272] leading-relaxed">
                                    Use clear categories and dedicated detail screens for a broad set of facilities.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-lg bg-white text-[#174A78] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border-0 shadow-none">04</span>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#171A22] mb-0.5">Show practical details</h3>
                                <p className="text-[13px] text-[#596272] leading-relaxed">
                                    Provide location and timing information where the interface supports it, while acknowledging that operational availability can change.
                                </p>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex items-start gap-3.5">
                            <span className="w-7 h-7 rounded-lg bg-white text-[#174A78] text-[11px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 border-0 shadow-none">05</span>
                            <div>
                                <h3 className="text-[14px] font-semibold text-[#171A22] mb-0.5">Structure sensitive reports</h3>
                                <p className="text-[13px] text-[#596272] leading-relaxed">
                                    Collect key details in missing-person and incident-reporting flows rather than relying only on an unstructured message.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* ── 10 / OUTCOMES ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>10 / OUTCOMES</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Reach and real-world context
                    </h2>

                    {/* Outcomes Metrics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-1">
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[130px]">
                            <div>
                                <strong className="block text-[24px] sm:text-[28px] font-bold text-[#174A78] tracking-tight leading-none mb-2">5,000+</strong>
                                <b className="block text-[13.5px] font-semibold text-[#171A22] mb-1">App downloads</b>
                                <p className="text-[12px] text-[#717680] leading-relaxed">
                                    Recorded across mobile app stores for the festival.
                                </p>
                            </div>
                        </div>

                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[130px]">
                            <div>
                                <strong className="block text-[24px] sm:text-[28px] font-bold text-[#174A78] tracking-tight leading-none mb-2">1.35 crore</strong>
                                <b className="block text-[13.5px] font-semibold text-[#171A22] mb-1">2024 reported attendance</b>
                                <p className="text-[12px] text-[#717680] leading-relaxed">
                                    Reported attendance during the 2024 full-scale festival.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        The mobile application recorded more than 5,000 downloads.
                    </p>

                    <p className="text-[14px] sm:text-[14.5px] text-[#4A5568] leading-relaxed max-w-[760px]">
                        During the 2024 Jathara, the minister reported 5,090 missing-child cases and 5,062 reunifications, highlighting the importance of clear reporting and assistance pathways at an event of this scale.
                    </p>
                </section>
            </Reveal>

            {/* ── 11 / SOURCES ── */}
            <Reveal>
                <section className="flex flex-col gap-3.5 sm:gap-4 pb-6">
                    <div>
                        <h3 className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#717680]">
                            <FigmaHighlight>11 / SOURCES</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-[20px] sm:text-[22px] md:text-[24px] font-semibold text-[#171A22] tracking-tight leading-snug">
                        Evidence and references
                    </h2>

                    <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-5 my-1">
                        <div>
                            <h3 className="text-[13.5px] font-semibold text-[#171A22] mb-2">
                                External context — 2024 attendance and missing-child figures
                            </h3>
                            <ul className="flex flex-col gap-2.5 text-[13px] text-[#596272]">
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold">•</span>
                                    <span>
                                        <a
                                            href="https://www.newindianexpress.com/amp/story/states/telangana/2024/Feb/25/135-crore-devotees-visited-medaram-jatara-over-5000-missing-kids-reunited"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#174A78] font-medium hover:underline"
                                        >
                                            The New Indian Express, 25 February 2024 ↗
                                        </a>
                                        : reports approximately 1.35 crore devotees and 5,090 missing-child reports / 5,062 reunifications, attributing the figures to minister Danasari Anasuya.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-[#174A78] font-bold">•</span>
                                    <span>
                                        <a
                                            href="https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2008538&lang=2&reg=48"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#174A78] font-medium hover:underline"
                                        >
                                            Press Information Bureau, Ministry of Tribal Affairs, 23 February 2024 ↗
                                        </a>
                                        : official description of the biennial festival and its 21–24 February 2024 dates.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-3 border-t border-black/[0.04]">
                            <h3 className="text-[13.5px] font-semibold text-[#171A22] mb-1.5">
                                Project source — Figma
                            </h3>
                            <p className="text-[13px] text-[#596272]">
                                <a
                                    href="https://www.figma.com/design/JpjJkeBbKm6UT4iufypsOd/Medaram-Jathara-2026?node-id=1-2978"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#174A78] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    Medaram Jathara 2026 — Guest App and Guest Web pages ↗
                                </a>
                            </p>
                        </div>

                        <div className="pt-3 border-t border-black/[0.04]">
                            <h3 className="text-[13.5px] font-semibold text-[#171A22] mb-1.5">
                                Project metric — 5,000+ downloads
                            </h3>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                Provided directly by the designer for this case study. No independent analytics source was supplied in this conversation; attach evidence before treating it as publicly verified.
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

        </div>
    );
}
