import Reveal from "../reveal";
import FigmaHighlight from "../FigmaHighlight";
import { EditorialDivider } from "../EditorialGrid";
import ViewportVideo from "../ViewportVideo";
import homepageVideo from "../../assets/videos/homepage.mp4";
import propDetailsVideo from "../../assets/videos/prop_details.mp4";
import packageCardsImg from "../../assets/images/package_cards.png";
import stickyActionBarImg from "../../assets/images/sticky_action_bar.png";
import checkoutSummaryImg from "../../assets/images/checkout_summary.png";
import mobileWelcomeImg from "../../assets/images/mobile_welcome.jpg";
import mobileSignupImg from "../../assets/images/mobile_signup.png";
import mobileLoginEmailImg from "../../assets/images/mobile_login_email.png";
import mobileLoginMobileImg from "../../assets/images/mobile_login_mobile.png";
import mobileVerifyNumberImg from "../../assets/images/mobile_verify_number.png";
import mobileForgotPasswordImg from "../../assets/images/mobile_forgot_password.png";
import mobileCompleteProfileImg from "../../assets/images/mobile_complete_profile.png";
import mobileSearchHomeImg from "../../assets/images/mobile_search_home.jpg";
import mobileExploreImg from "../../assets/images/mobile_explore.jpg";
import mobileSearchResultsImg from "../../assets/images/mobile_search_results.jpg";
import mobilePropertyDetailsImg from "../../assets/images/mobile_property_details.jpg";
import mobileGuestDetailsImg from "../../assets/images/mobile_guest_details.png";
import mobileBookingConfirmedImg from "../../assets/images/mobile_booking_confirmed.jpg";
import mobileMyBookingsImg from "../../assets/images/mobile_my_bookings.jpg";
import mobileWishlistImg from "../../assets/images/mobile_wishlist.jpg";

interface ShowcaseFrameProps {
    title: string;
    caption?: string;
    aspect?: string;
    narrow?: boolean;
    variant?: "default" | "browser" | "sticky-bar" | "mobile-pair";
    badge?: string;
    mediaUrl?: string;
    isVideo?: boolean;
}

function ShowcaseFrame({
    title,
    caption,
    aspect,
    narrow = false,
    badge,
    mediaUrl,
    isVideo = false,
}: ShowcaseFrameProps) {
    const resolvedAspect = aspect || (mediaUrl ? "" : "aspect-[16/10]");

    return (
        <figure className={`w-full ${narrow ? 'max-w-[700px] mx-auto' : ''} my-6 sm:my-8`}>
            {/* Outer Showcase Frame */}
            <div className="w-full p-1.5 sm:p-2 md:p-2.5 rounded-[20px] md:rounded-[24px] bg-[#F2F4F7] border border-black/[0.06] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.06)]">
                {/* Inner Mockup Canvas / Surface */}
                <div className={`w-full ${resolvedAspect} rounded-[15px] md:rounded-[18px] bg-white border border-black/[0.07] overflow-hidden flex flex-col relative shadow-none`}>
                    {mediaUrl ? (
                        isVideo ? (
                            <ViewportVideo
                                src={mediaUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="metadata"
                                className="w-full h-auto block object-cover"
                            />
                        ) : (
                            <img
                                src={mediaUrl}
                                alt={title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-auto block"
                            />
                        )
                    ) : (
                        <div className="grow bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center relative select-none">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-neutral-400 mb-3 shadow-none">
                                <svg className="w-7 h-7 stroke-[1.4]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </div>

                            {badge && (
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#245CF5]/10 text-[#245CF5] text-[10px] font-bold uppercase tracking-wider mb-1.5">
                                    {badge}
                                </span>
                            )}
                            <span className="text-[13px] sm:text-[14px] font-semibold text-[#171A22]">{title}</span>
                            <span className="text-[11px] text-[#717680] mt-0.5">Interface screenshot ready for swap</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Editorial Caption Bar */}
            {caption && (
                <figcaption className="mt-3.5 px-2 flex items-start gap-3 text-left">
                    <span className="w-1 h-3.5 rounded-full bg-[#245CF5] shrink-0 mt-1" aria-hidden="true" />
                    <p className="text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                        <strong className="text-[#171A22] font-semibold">{title}: </strong>
                        {caption}
                    </p>
                </figcaption>
            )}
        </figure>
    );
}

export default function StayTransitContent() {
    return (
        <div className="w-full flex flex-col gap-10 sm:gap-14 md:gap-18 font-roobert text-[#171A22]">

            {/* ── PROJECT HERO METADATA & OVERVIEW ── */}
            <Reveal>
                <div className="flex flex-col gap-6">
                    {/* Project Overview Spotlight Card */}
                    <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none">
                        <div className="md:col-span-4 flex items-center gap-2.5">
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>Project overview</FigmaHighlight>
                            </h3>
                        </div>
                        <div className="md:col-span-8 mt-2">
                            <p className="text-[#3F4856] text-[15px] sm:text-[16px] leading-relaxed">
                                StayTransit is an airport-focused booking platform designed to connect travellers with short-stay rooms, lounges, spas, workspaces and transit assistance. I designed the end-to-end traveller booking experience across web and mobile, alongside the operational dashboards supporting property management, marketplace administration and partner workflows.
                            </p>
                        </div>
                    </div>

                    {/* Project Meta Bar */}
                    <div className="py-2">
                        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">My role</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">UI/UX Designer</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Scope</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Product Design, 0 → 1</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Platforms</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Web, iOS, Android & Dashboards</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Status</dt>
                                <dd className="inline-flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-[#171A22]">
                                    <span className="w-2.5 h-2.5 rounded-full bg-[#1E8B68] animate-pulse" />
                                    Launched
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 01 / CONTEXT ── */}
            <Reveal>
                <section id="context" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>01 / CONTEXT</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        An airport journey has more than one kind of need.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Airports are high-friction environments where time is strictly bounded by flight schedules. Depending on where someone is in their journey, an hour or two at the terminal carries completely different needs, expectations and stress levels.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Some travellers arrive early to avoid security queues and look for a quiet workspace or lounge before boarding. Others arrive exhausted after long-haul flights needing a shower or day-room before heading into the city. Many are caught in transit with tight layovers, needing rapid rest without risking missed boarding calls.
                    </p>

                    {/* 3-column Journey Situations Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-2">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 01</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">Before departure</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    Travellers who have cleared security early or face unexpected delays, seeking dedicated workspaces or quiet lounge rest before boarding.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 02</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">After arrival</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    Long-haul or red-eye arrivals needing immediate recovery, private showers or short-stay rooms before continuing into the city.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 03</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">During transit</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    Transit passengers with defined connection windows who need services strictly matched to their schedule without leaving the terminal zone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        These distinct situations make conventional overnight hotel booking models ineffective. To be useful, StayTransit had to design discovery around the traveller’s available airport window rather than fixed calendar dates.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 02 / THE PROBLEM ── */}
            <Reveal>
                <section id="the-problem" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>02 / THE PROBLEM</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Finding the right service within a limited airport window.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Airport services are historically fragmented and difficult to coordinate. Lounges, day-use rooms, terminal spas and meet-and-greet assistance operate as disconnected vendors with separate booking channels, varying package durations and distinct access conditions.
                    </p>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        For travellers with limited time between flights or before departure, figuring out which options actually fit their schedule becomes unnecessarily complicated. Travellers are left to calculate flight buffers, verify whether a property is airside or landside, and cross-reference package lengths with their boarding time.
                    </p>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The challenge was to bring these services into one connected experience while helping travellers find relevant options based on their airport, available time and specific operational needs.
                    </p>

                    {/* Concluding Statement with subtle visual emphasis */}
                    <div className="p-6 sm:p-7 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none my-2">
                        <div className="flex items-start gap-3.5">
                            <span className="w-1.5 h-5 rounded-full bg-[#245CF5] shrink-0 mt-1" aria-hidden="true" />
                            <p className="text-[16px] sm:text-[17px] text-[#171A22] font-medium leading-relaxed">
                                <strong className="text-[#245CF5] font-semibold">The key question: </strong>
                                How might we make airport services easier to discover, compare and book around a traveller&apos;s available time?
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 03 / MY ROLE ── */}
            <Reveal>
                <section id="my-role" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>03 / MY ROLE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Designing the traveller experience and operational ecosystem.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        I was responsible for the product design of StayTransit from early user flows to production interfaces, working across both customer-facing products and internal operational tooling.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        My work spanned two complementary sides of the platform: shaping the end-to-end booking journey for travellers on web and mobile, while designing the back-office interfaces required to support property operations, marketplace governance and partner management.
                    </p>

                    {/* Two-Column Scope Split Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-4">
                            <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                                <h3 className="text-[18px] font-semibold text-[#171A22]">Traveller-facing product</h3>
                            </div>
                            <ul className="flex flex-col gap-3 text-[14px] text-[#424B59]">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Website search and time-window discovery</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Property details and package selection architecture</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Guest information, flight details and checkout flow</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Booking confirmation and reservation retrieval</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Mobile application experience for iOS and Android</span>
                                </li>
                            </ul>
                        </div>

                        <div className="p-6 sm:p-7 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-4">
                            <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-4 rounded-full bg-[#1E8B68]" />
                                <h3 className="text-[18px] font-semibold text-[#171A22]">Operational product</h3>
                            </div>
                            <ul className="flex flex-col gap-3 text-[14px] text-[#424B59]">
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Super Admin dashboard for platform-wide governance</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Merchant dashboard for property packages, pricing and availability</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Partner dashboard for affiliate and distribution management</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Financial dashboard for transaction settlements and payouts</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Reusable UI components and responsive design patterns</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        While the operational tools provided the inventory and structure behind the marketplace, the core product design challenge lay in the traveller journey: establishing how travellers input their schedule and match with eligible services.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 04 / THE CORE CHALLENGE ── */}
            <Reveal>
                <section id="the-core-challenge" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>04 / THE CORE CHALLENGE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        How should travellers tell us how much time they have?
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        The search input is the pivotal moment of StayTransit. Every downstream decision—from property availability to package eligibility—depends on how travellers define their available time.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Our primary challenge was identifying an input model that aligned naturally with a traveller’s mental model rather than forcing them into the property’s package structure.
                    </p>

                    {/* Editorial Exploration Matrix */}
                    <div className="flex flex-col gap-3 my-2">
                        {/* Exploration 01 */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
                            <div className="md:col-span-3">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-[#717680] text-[11px] font-bold uppercase tracking-wider">
                                    Exploration 01
                                </span>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-[16px] font-semibold text-[#171A22] mb-1">Airport first, then browse packages</h3>
                                <p className="text-[14px] text-[#596272] leading-relaxed">
                                    Travellers selected an airport and browsed inventory directly. However, this forced travellers to evaluate package lengths before knowing if any matched their flight window, shifting the burden of filtering onto the user.
                                </p>
                            </div>
                        </div>

                        {/* Exploration 02 */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
                            <div className="md:col-span-3">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-[#717680] text-[11px] font-bold uppercase tracking-wider">
                                    Exploration 02
                                </span>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-[16px] font-semibold text-[#171A22] mb-1">Ask for the number of hours</h3>
                                <p className="text-[14px] text-[#596272] leading-relaxed">
                                    Asking travellers to specify duration (e.g., &quot;3 hours&quot;) moved closer to the matching logic, but still required travellers to do mental math on arrival and boarding times before initiating a search.
                                </p>
                            </div>
                        </div>

                        {/* Final Direction (Highlighted Solution) */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
                            <div className="md:col-span-3">
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#245CF5] text-white text-[11px] font-bold uppercase tracking-wider">
                                    Final direction
                                </span>
                            </div>
                            <div className="md:col-span-9">
                                <h3 className="text-[16px] font-semibold text-[#171A22] mb-1">Ask for actual check-in and check-out times</h3>
                                <p className="text-[14px] text-[#3F4856] leading-relaxed">
                                    Travellers enter the exact times they know—such as landing at 2:00 PM and departing at 6:00 PM. The platform automatically calculates the duration and surfaces properties with packages that comfortably fit within that window.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Editorial Takeaway Banner (The Shift) */}
                    <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none my-2">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl leading-none text-[#245CF5]" aria-hidden="true">“</span>
                            <p className="text-[16px] sm:text-[18px] text-[#283B6E] font-medium leading-relaxed">
                                <strong>The shift:</strong> Instead of asking travellers to think in package durations, the experience starts with the time they know they have. StayTransit takes care of calculating duration and matching eligible packages.
                            </p>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        This decision also accommodates varying service durations across categories: while a transit hotel might offer 4- or 6-hour blocks, an express spa might offer 30-minute sessions, and a lounge might provide standard entry passes. A single time-window input gives the platform one consistent framework to match multiple service types without fragmenting the search.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 05 / WEB ── */}
            <Reveal>
                <section id="web" className="flex flex-col gap-8 sm:gap-10">
                    {/* Section Header */}
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>05 / WEB</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            The website booking experience.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            StayTransit’s web booking experience translates time-aware discovery into a continuous, dependable journey across three stages: finding eligible properties, reviewing package conditions, and completing guest details through checkout.
                        </p>
                    </div>

                    {/* ── 05.1 — Search & Discovery ── */}
                    <div id="web-search" data-case-study-subitem="true" className="flex flex-col gap-4 sm:gap-5 pt-2">
                        <div>
                            <span className="text-[12px] font-mono font-semibold tracking-wider text-[#245CF5] uppercase">
                                05.1 — Search & Discovery
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22] tracking-tight mt-1">
                                Making search the central anchor of the experience.
                            </h3>
                        </div>

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Because flight schedules dictate every decision, search sits prominently as the primary action on the homepage. Travellers select their airport, travel status (departure, arrival or transit), check-in and check-out times, and traveller count.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            On the search results page, this context remains anchored at the top. Keeping the selected airport, dates and time window persistent allows travellers to adjust their criteria immediately without navigating backward.
                        </p>

                        <ShowcaseFrame
                            variant="browser"
                            title="Search results"
                            caption="The search context remains visible at the top while travellers explore properties returned for their selected airport and time window."
                            badge="Discovery Surface"
                            mediaUrl={homepageVideo}
                            isVideo={true}
                        />

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Filters in the left sidebar address the unique logistics of an airport stay: airside versus landside location (critical for knowing whether security clearance is needed), price range, and key amenities such as private showers or quiet rooms.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Property cards surface high-signal comparative information—imagery, location within terminal, included facilities, available package durations and starting prices—enabling travellers to shortlist options before opening detailed listings.
                        </p>
                    </div>

                    {/* ── 05.2 — Property Details ── */}
                    <div id="web-property-details" data-case-study-subitem="true" className="flex flex-col gap-4 sm:gap-5 pt-8 border-t border-black/[0.06]">
                        <div>
                            <span className="text-[12px] font-mono font-semibold tracking-wider text-[#245CF5] uppercase">
                                05.2 — Property Details
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22] tracking-tight mt-1">
                                Giving travellers clear context to evaluate packages.
                            </h3>
                        </div>

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            While property cards help travellers shortlist, the property detail page answers the logistical questions required before committing: exactly where the property is located, terminal operating hours, and how to reach it between gates.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            The overview combines a photo gallery, terminal location, airside or landside status, and facility descriptions, establishing clear expectations before asking the user to select a package.
                        </p>

                        <ShowcaseFrame
                            variant="browser"
                            title="Property overview and time selection"
                            caption="The property page establishes the physical context and operating hours before presenting available packages."
                            mediaUrl={propDetailsVideo}
                            isVideo={true}
                        />

                        {/* Subsection: Packages */}
                        <div className="mt-3">
                            <div className="flex items-center gap-2.5 mb-2">
                                <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                                <h4 className="text-[15px] sm:text-[16px] md:text-[17px] font-semibold text-[#171A22]">
                                    Surfacing package conditions alongside price and duration.
                                </h4>
                            </div>
                            <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                                In an airport environment, packages of identical duration can carry fundamentally different constraints. One four-hour lounge pass might be adults-only, another might include private nap pods, and a third might have specific non-refundable policies.
                            </p>
                            <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px] mt-2">
                                Rather than burying these details behind modals or checkout disclaimers, package cards surface duration, checkout deadlines, guest limits, refundability and included amenities directly alongside the price. This transparency lets travellers make confident decisions without surprises.
                            </p>
                        </div>

                        <figure className="w-full my-4 sm:my-6">
                            <img
                                src={packageCardsImg}
                                alt="Available packages comparison"
                                className="w-full h-auto block rounded-2xl md:rounded-3xl"
                            />
                            <figcaption className="mt-3.5 px-2 flex items-start gap-3 text-left">
                                <span className="w-1 h-3.5 rounded-full bg-[#245CF5] shrink-0 mt-1" aria-hidden="true" />
                                <p className="text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                                    <strong className="text-[#171A22] font-semibold">Available packages: </strong>
                                    Package cards surface duration, checkout deadlines, guest count, refundability, included amenities and total price for direct side-by-side comparison.
                                </p>
                            </figcaption>
                        </figure>
                    </div>

                    {/* ── 05.3 — Checkout & Confirmation ── */}
                    <div id="web-checkout" data-case-study-subitem="true" className="flex flex-col gap-4 sm:gap-5 pt-8 border-t border-black/[0.06]">
                        <div>
                            <span className="text-[12px] font-mono font-semibold tracking-wider text-[#245CF5] uppercase">
                                05.3 — Checkout & Confirmation
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22] tracking-tight mt-1">
                                Maintaining continuity from package selection to payment.
                            </h3>
                        </div>

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Airport bookings are often made under tight layover time constraints. Any confusion or lack of continuity during checkout increases hesitation and drop-off.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            When a traveller selects a package, a persistent booking bar anchors to the bottom of the viewport with the selected package count, total price and a direct &quot;Book Now&quot; action. Travellers can review remaining amenities or property details without scrolling back to find the package CTA.
                        </p>

                        {/* Floating / Sticky Bar Asset Showcase */}
                        <figure className="w-full my-4 sm:my-6 flex flex-col items-center">
                            <div className="w-full flex justify-center py-2">
                                <img
                                    src={stickyActionBarImg}
                                    alt="Persistent booking action sticky bar"
                                    className="w-full h-auto block select-none"
                                />
                            </div>
                            <figcaption className="mt-4 px-2 flex items-start gap-3 text-left w-full max-w-[800px]">
                                <span className="w-1 h-3.5 rounded-full bg-[#245CF5] shrink-0 mt-1" aria-hidden="true" />
                                <p className="text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                                    <strong className="text-[#171A22] font-semibold">Persistent booking action: </strong>
                                    The selected package, duration and running total remain accessible across the property page, keeping the booking path frictionless.
                                </p>
                            </figcaption>
                        </figure>

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            The checkout form organizes guest information and flight details into structured steps. Capturing flight numbers, airline codes and arrival/departure times allows property operators to anticipate flight delays and coordinate service hand-offs.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            A persistent booking summary sits alongside the form, displaying the selected package, exact check-in and check-out times, guest count, subtotal, taxes and grand total. Keeping costs completely transparent throughout data entry prevents unexpected pricing surprises prior to payment hand-off.
                        </p>

                        <ShowcaseFrame
                            variant="browser"
                            title="Checkout and price summary"
                            caption="Guest details and booking breakdown sit side by side, keeping total costs transparent as the traveller completes the reservation."
                            badge="Checkout Flow"
                            mediaUrl={checkoutSummaryImg}
                        />

                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            From checkout, the traveller completes payment securely via Stripe Checkout. Upon completion, an instant confirmation surfaces terminal directions and scannable check-in passes, with reservations permanently stored under My Bookings for quick retrieval on any device.
                        </p>
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 06 / DASHBOARDS & ADMIN ── */}
            <Reveal>
                <section id="dashboards-admin" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>06 / DASHBOARDS & ADMIN</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Building the operational layer behind StayTransit.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Behind the traveller booking experience sits a multi-sided operational infrastructure. For StayTransit to deliver accurate availability and package matching, property managers, commercial partners and internal administrators needed dedicated workspaces tailored to their operational responsibilities.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        I designed four distinct dashboard experiences, establishing clear boundaries between system administration, vendor inventory management, partnership operations and financial accounting.
                    </p>

                    {/* Roles */}
                    <div className="mt-4 flex flex-col gap-2">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-2">
                            <div className="flex items-center gap-2.5">
                                <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                                <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22]">
                                    Four interfaces, distinct responsibilities.
                                </h3>
                            </div>
                            <span className="text-[11px] font-semibold tracking-wider text-[#777] uppercase">
                                Operational dashboards
                            </span>
                        </div>

                        <div className="flex flex-col">
                            {[
                                {
                                    no: "01",
                                    title: "Super Admin",
                                    desc: "Platform-wide governance interface for onboarding airports and terminals, auditing catalog metadata, managing user roles, and monitoring system-wide availability.",
                                },
                                {
                                    no: "02",
                                    title: "Merchant",
                                    desc: "Property management workspace for airport hotels, lounges and service vendors to configure packages, manage duration-based pricing, set room quotas and update operational conditions.",
                                },
                                {
                                    no: "03",
                                    title: "Partner",
                                    desc: "Collaboration portal for airline partners, travel management companies and airport authorities to track affiliate bookings, commissions and marketplace volume.",
                                },
                                {
                                    no: "04",
                                    title: "Financial",
                                    desc: "Dedicated accounting interface supporting transaction reconciliations, automated merchant disbursements, tax reporting and settlement tracking.",
                                },
                            ].map((role) => (
                                <div
                                    key={role.no}
                                    className="grid grid-cols-[36px_1fr] md:grid-cols-[52px_220px_1fr] gap-x-3 gap-y-1.5 md:gap-5 items-baseline py-5 border-b border-black/[0.05] last:border-b-0"
                                >
                                    <span className="text-[11px] font-mono font-semibold text-[#245CF5] tracking-wider">
                                        {role.no}
                                    </span>
                                    <h4 className="text-[16px] sm:text-[17px] font-semibold text-[#171A22] tracking-tight">
                                        {role.title}
                                    </h4>
                                    <p className="col-start-2 md:col-start-auto text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                        {role.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Confidentiality Note */}
                    <aside
                        className="my-3 pl-4 sm:pl-5 border-l-2 border-[#245CF5]/30 max-w-[780px]"
                        aria-label="Confidentiality note"
                    >
                        <p
                            className="text-[16px] sm:text-[18px] text-[#3F4856] italic leading-relaxed"
                            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                        >
                            The internal dashboards are not shown here due to confidentiality constraints. Reach out to me directly if you&apos;d like to learn more.
                        </p>
                    </aside>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 07 / PLATFORM ── */}
            <Reveal>
                <section id="platform" className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>07 / PLATFORM</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Carrying the experience across web and mobile.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Airport travellers rely heavily on mobile devices while navigating terminals under time pressure. To provide a dependable experience on the move, I extended StayTransit into native iOS and Android applications.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The mobile product translates the same core booking journey—time-based search, property discovery, package evaluation and reservation checkout—into touch-first patterns optimized for handheld use. Compact date and time sheets make setting flight windows effortless, while listing cards prioritize immediate visual cues like airside/landside tags, walking distance indicators, and clear starting rates.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Because the product started without an existing design system, I developed a foundational library of reusable UI components and typographic scales. Establishing consistent button hierarchies, form inputs, status tags and card containers across web and mobile allowed engineering to ship new screens efficiently while maintaining visual and functional coherence throughout the entire ecosystem.
                    </p>

                    <div className="my-8 sm:my-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                        {[
                            {
                                src: mobileWelcomeImg,
                                alt: "StayTransit mobile onboarding welcome screen",
                                position: "object-center",
                            },
                            {
                                src: mobileSignupImg,
                                alt: "StayTransit mobile sign up screen",
                                position: "object-center",
                            },
                            {
                                src: mobileLoginEmailImg,
                                alt: "StayTransit mobile email login screen",
                                position: "object-center",
                            },
                            {
                                src: mobileLoginMobileImg,
                                alt: "StayTransit mobile phone login screen",
                                position: "object-center",
                            },
                            {
                                src: mobileVerifyNumberImg,
                                alt: "StayTransit mobile OTP verification screen",
                                position: "object-center",
                            },
                            {
                                src: mobileForgotPasswordImg,
                                alt: "StayTransit mobile forgot password screen",
                                position: "object-center",
                            },
                            {
                                src: mobileCompleteProfileImg,
                                alt: "StayTransit mobile profile completion screen",
                                position: "object-center",
                            },
                            {
                                src: mobileSearchHomeImg,
                                alt: "StayTransit mobile time-based search screen",
                                position: "object-top",
                            },
                            {
                                src: mobileExploreImg,
                                alt: "StayTransit mobile explore categories screen",
                                position: "object-top",
                            },
                            {
                                src: mobileSearchResultsImg,
                                alt: "StayTransit mobile airport search results screen",
                                position: "object-top",
                            },
                            {
                                src: mobilePropertyDetailsImg,
                                alt: "StayTransit mobile property details and packages screen",
                                position: "object-top",
                            },
                            {
                                src: mobileGuestDetailsImg,
                                alt: "StayTransit mobile guest and flight details form",
                                position: "object-top",
                            },
                            {
                                src: mobileBookingConfirmedImg,
                                alt: "StayTransit mobile booking confirmation screen",
                                position: "object-top",
                            },
                            {
                                src: mobileMyBookingsImg,
                                alt: "StayTransit mobile bookings list screen",
                                position: "object-top",
                            },
                            {
                                src: mobileWishlistImg,
                                alt: "StayTransit mobile wishlist screen",
                                position: "object-top",
                            },
                        ].map((screen) => (
                            <div
                                key={screen.alt}
                                className="aspect-[402/874] rounded-[8px] sm:rounded-[12px] overflow-hidden"
                            >
                                <img
                                    src={screen.src}
                                    alt={screen.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className={`w-full h-full object-cover ${screen.position} block select-none`}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 08 / REFLECTION ── */}
            <Reveal>
                <section id="reflection" className="flex flex-col gap-8 sm:gap-10">
                    {/* Top Area: Label, Heading left, Intro right */}
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>08 / REFLECTION</FigmaHighlight>
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start pt-1">
                            <div className="md:col-span-6">
                                <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                                    A different way to think about product design.
                                </h2>
                            </div>
                            <div className="md:col-span-6 md:pt-1">
                                <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed">
                                    Working on StayTransit taught me to look beyond individual screens and consider how the entire experience fits together.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Area: Four Reflection Points in an editorial 2-column grid */}
                    <div className="border-t border-black/[0.07] pt-8 sm:pt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 sm:gap-y-10">
                        <div className="flex flex-col">
                            <span className="text-[11.5px] font-mono font-medium text-[#717680] mb-2 tracking-wider">01</span>
                            <h3 className="text-[16px] font-semibold text-[#171A22] tracking-tight mb-2">
                                Design around what people know
                            </h3>
                            <p className="text-[14px] text-[#596272] leading-relaxed">
                                Start with the information travellers already have, like their available time, rather than asking them to figure out package durations themselves.
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[11.5px] font-mono font-medium text-[#717680] mb-2 tracking-wider">02</span>
                            <h3 className="text-[16px] font-semibold text-[#171A22] tracking-tight mb-2">
                                Clarity is part of the experience
                            </h3>
                            <p className="text-[14px] text-[#596272] leading-relaxed">
                                Location, eligibility and booking conditions matter just as much as price. Making these details visible helps travellers compare their options.
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[11.5px] font-mono font-medium text-[#717680] mb-2 tracking-wider">03</span>
                            <h3 className="text-[16px] font-semibold text-[#171A22] tracking-tight mb-2">
                                The experience extends beyond the user
                            </h3>
                            <p className="text-[14px] text-[#596272] leading-relaxed">
                                The traveller-facing product depends on the operational tools used by merchants, partners and internal teams.
                            </p>
                        </div>

                        <div className="flex flex-col">
                            <span className="text-[11.5px] font-mono font-medium text-[#717680] mb-2 tracking-wider">04</span>
                            <h3 className="text-[16px] font-semibold text-[#171A22] tracking-tight mb-2">
                                Think in connected systems
                            </h3>
                            <p className="text-[14px] text-[#596272] leading-relaxed">
                                Designing across web, mobile and multiple dashboards reinforced the importance of consistent patterns that work across different contexts.
                            </p>
                        </div>
                    </div>
                </section>
            </Reveal>

        </div>
    );
}
