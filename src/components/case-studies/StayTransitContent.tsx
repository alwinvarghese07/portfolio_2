import Reveal from "../reveal";
import FigmaHighlight from "../FigmaHighlight";
import { EditorialDivider } from "../EditorialGrid";
import ViewportVideo from "../ViewportVideo";
import propDetailsVideo from "../../assets/videos/prop_details.mp4";
import packageCardsImg from "../../assets/images/package_cards.png";

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
    variant = "default",
    badge,
    mediaUrl,
    isVideo = false,
}: ShowcaseFrameProps) {
    const resolvedAspect = aspect || (mediaUrl ? "" : "aspect-[16/10]");

    return (
        <figure className={`w-full ${narrow ? 'max-w-[700px] mx-auto' : ''} my-6 sm:my-8`}>
            {/* Outer Showcase Frame */}
            <div className={`w-full ${isVideo || mediaUrl ? 'p-1.5 sm:p-2 md:p-2.5' : 'p-2.5 sm:p-4 md:p-5'} rounded-[20px] md:rounded-[24px] bg-[#F2F4F7] border border-black/[0.06] shadow-[0_16px_40px_-20px_rgba(0,0,0,0.06)]`}>
                {/* Inner Mockup Canvas / Surface */}
                <div className={`w-full ${resolvedAspect} rounded-[15px] md:rounded-[18px] bg-white border border-black/[0.07] overflow-hidden flex flex-col relative shadow-none`}>
                    {/* Browser-style minimal header bar for web screens (omitted for media frames) */}
                    {!isVideo && !mediaUrl && (variant === "browser" || variant === "default") && (
                        <div className="h-7 sm:h-8 px-3 sm:px-4 bg-[#FBFBFB] border-b border-black/[0.05] flex items-center justify-between shrink-0 select-none">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-black/15" />
                            </div>
                            <div className="px-3 py-0.5 rounded-md bg-black/[0.04] text-[10px] sm:text-[11px] text-[#717680] font-mono tracking-tight truncate max-w-[200px] sm:max-w-[320px]">
                                staytransit.com · {title.toLowerCase().replace(/\s+/g, '-')}
                            </div>
                            <div className="w-8" />
                        </div>
                    )}

                    {/* Canvas Area with interface media OR placeholder wireframe hints */}
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
                                className="w-full h-auto block object-cover"
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
                        <div className="md:col-span-8">
                            <p className="text-[#3F4856] text-[15px] sm:text-[16px] leading-relaxed">
                                StayTransit is an airport-focused booking platform for services such as lounges, stays, spas, workspaces and meet-and-greet assistance. I designed the traveller journey from search to booking, along with the operational dashboards behind the OTA.
                            </p>
                        </div>
                    </div>

                    {/* Project Meta Bar (Clean, no harsh divider line) */}
                    <div className="py-2">
                        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">My role</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">UI/UX Designer</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Scope</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Research, UI/UX Design, 0 → 1 </dd>
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
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>01 / CONTEXT</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        An airport journey has more than one kind of need.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Travellers use airport time differently. Some need a place to rest before departure, others have just arrived or are between flights. Some only need a short service, such as a spa session or meet-and-greet assistance.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        StayTransit brings these services into one place, allowing travellers to discover and book options that fit their situation and available time.
                    </p>

                    {/* 3-column Journey Situations Card Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 my-2">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 01</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">Before departure</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    A traveller may have time before their flight and want to use an airport service during that window.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 02</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">After arrival</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    A traveller may need a service after landing, before leaving the airport or continuing their journey.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[160px]">
                            <div>
                                <span className="text-[11px] font-mono text-[#717680] block mb-2 font-medium">SITUATION 03</span>
                                <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">During transit</h3>
                                <p className="text-[13.5px] text-[#596272] leading-relaxed">
                                    A traveller may have a defined interval between arrival and the next leg of their journey.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        These different situations shaped the search experience: capture the traveller’s airport context and available time without making them understand each property’s package setup.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 02 / MY ROLE ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>02 / MY ROLE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Taking the product from flows to interfaces.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        My involvement covered the end-to-end design of StayTransit, not only the customer-facing screens.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        I owned the end-to-end design work, from defining user flows to translating requirements into interfaces. My scope covered the web booking journey, iOS and Android apps and four operational dashboards.
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
                                    <span>Website search and discovery experience</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Property details and package selection</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Guest information and checkout</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#245CF5] font-bold text-xs mt-1">✓</span>
                                    <span>Booking, payment hand-off and confirmation journey</span>
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
                                    <span>Super Admin dashboard</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Merchant / property dashboard</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Partner dashboard</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>Financial dashboard</span>
                                </li>
                                <li className="flex items-start gap-2.5">
                                    <span className="text-[#1E8B68] font-bold text-xs mt-1">✓</span>
                                    <span>UI components and interface patterns created for the product</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The traveller journey takes centre stage because it contains the product’s key design decision: using actual time windows to drive discovery. The dashboards are covered later at an ecosystem level.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 03 / THE CORE CHALLENGE ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>03 / THE CORE CHALLENGE</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        How should travellers tell us how much time they have?
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        The search experience was the most important part to get right. It is the entry point to StayTransit, and every result that follows depends on the information travellers provide here.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Our first direction was simple: select an airport and browse its packages. But this made travellers compare package durations before knowing which options suited their schedule.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Next, we considered asking how many hours they planned to stay. It was more useful, but still required travellers to calculate a duration.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        We settled on actual check-in and check-out times. A traveller may know they need a place from 3 PM until 6 PM; they shouldn't have to calculate that this equals three hours before they can search.
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
                                    This approach exposed the traveller to property packages before understanding whether those durations suited their schedule. It also left the traveller to compare package lengths across different properties.
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
                                    This moved closer to the matching logic, but still made the traveller calculate or estimate a duration as part of the search.
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
                                    This lets travellers express the time window they already understand. The platform can calculate the duration and use it to find relevant properties and packages.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Editorial Takeaway Banner (The Shift) */}
                    <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none my-2">
                        <div className="flex items-start gap-4">
                            <span className="text-2xl leading-none text-[#245CF5]" aria-hidden="true">“</span>
                            <p className="text-[16px] sm:text-[18px] text-[#283B6E] font-medium leading-relaxed">
                                <strong>The shift:</strong> Instead of asking travellers to think in package durations, I designed the search around the time they know they have. StayTransit takes care of matching that window to the available packages.
                            </p>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        It also supports different service durations: a lounge may offer hour-based packages, while a spa may offer 20- or 30-minute sessions. A time window gives the platform one flexible way to match them.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 04 / SEARCH ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>04 / SEARCH</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Making the search the centre of the experience.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Because search is the heart of StayTransit, I made it the primary starting point on the homepage rather than treating it as one element among many.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The search combines airport location, travel status, check-in and check-out times, and traveller count. Together, these inputs establish where and when the traveller needs a service.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Popular stays and featured services sit below the search, keeping the primary task clear while still giving visitors more to explore.
                    </p>

                    <ShowcaseFrame
                        variant="browser"
                        title="Search results"
                        caption="The search context remains visible at the top while travellers explore the properties returned for their selected airport and time window."
                        badge="Discovery Surface"
                    />

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        After search, the results page keeps the selected airport, travel status, dates, times and guest count visible, so travellers can understand the context behind the results.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Filters on the left narrow results by price, airside or landside location, and amenities. Property cards show the image, name, location, facilities, duration and starting price for quick comparison.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The results are property-led: travellers compare places first, then explore package details and property-specific rules within a listing.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 05 / MATCHING LOGIC (Light Section) ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>05 / MATCHING LOGIC</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        The traveller chooses the time. The platform finds the fit.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        A key part of the experience sits behind the search results: how the platform connects a traveller’s time window with packages created by each property.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Each property creates and manages its own packages, including durations, prices and eligibility conditions. Property admins define what is offered; they do not choose which packages appear for each traveller.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        StayTransit calculates the duration from the traveller’s check-in and check-out times, then surfaces properties with packages that fit. A four-hour search can show four-hour packages and shorter eligible options.
                    </p>

                    {/* Architecture Workflow Canvas - Light Theme */}
                    <div className="my-4 p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#245CF5]" />
                            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#171A22]">How time-based discovery works</h3>
                        </div>
                        <p className="text-[14px] text-[#596272] mb-8">
                            A simplified view of the relationship between property-created packages and the traveller’s search.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1.2fr_auto_1fr] items-center gap-4 md:gap-3">
                            <div className="p-5 rounded-xl bg-white border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#171A22]">Property admin</b>
                                <span className="block text-[12px] text-[#596272] mt-1.5 leading-relaxed">
                                    Creates packages, durations, prices and conditions
                                </span>
                            </div>

                            <div className="text-center text-[#245CF5] text-2xl font-bold rotate-90 md:rotate-0">→</div>

                            <div className="p-5 rounded-xl bg-[#EDF2FF] border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#245CF5]">StayTransit matching</b>
                                <span className="block text-[12px] text-[#3F4856] mt-1.5 leading-relaxed">
                                    Reads the traveller’s time window and identifies eligible options
                                </span>
                            </div>

                            <div className="text-center text-[#245CF5] text-2xl font-bold rotate-90 md:rotate-0">→</div>

                            <div className="p-5 rounded-xl bg-white border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#171A22]">Traveller results</b>
                                <span className="block text-[12px] text-[#596272] mt-1.5 leading-relaxed">
                                    Sees properties with packages that fit the selected time
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        This keeps responsibilities clear: properties manage their offerings, while StayTransit applies the matching consistently. Travellers enter their schedule; the platform finds relevant options.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The same model works across service categories. Lounge stays, spa sessions and workspaces can have different durations, but discovery starts with the same input: the traveller’s available time.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 06 / PROPERTY DETAILS ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>06 / PROPERTY DETAILS</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Giving travellers enough context to choose.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        A property card helps someone shortlist an option. The property page needs to answer the more detailed questions that come before a booking.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The property page brings together its gallery, name, location, airside or landside status, description and operating hours, helping travellers understand the place before choosing.
                    </p>

                    <ShowcaseFrame
                        variant="browser"
                        title="Property overview and time selection"
                        caption="The property page establishes the context before asking the traveller to choose a package."
                        mediaUrl={propDetailsVideo}
                        isVideo={true}
                    />

                    {/* Subsection: Packages */}
                    <div className="mt-3">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#171A22]">
                                Package cards need to show more than price and duration.
                            </h3>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Even packages with the same duration can have different conditions. Clearly highlight details like child eligibility and adults-only restrictions so users can compare options and make informed choices.
                        </p>
                    </div>

                    <figure className="w-full my-6 sm:my-8">
                        <img
                            src={packageCardsImg}
                            alt="Available packages"
                            className="w-full h-auto block rounded-2xl md:rounded-3xl"
                        />
                        <figcaption className="mt-3.5 px-2 flex items-start gap-3 text-left">
                            <span className="w-1 h-3.5 rounded-full bg-[#245CF5] shrink-0 mt-1" aria-hidden="true" />
                            <p className="text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                                <strong className="text-[#171A22] font-semibold">Available packages: </strong>
                                Package cards surface duration, checkout time, guest count, refundability, included amenities and price.
                            </p>
                        </figcaption>
                    </figure>

                    {/* Subsection: Service Rules */}
                    <div className="mt-3">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#171A22]">
                                Making service rules visible before booking
                            </h3>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Important operational details include ID requirements, boarding-pass rules, passenger eligibility, service hours and voucher instructions.
                        </p>
                    </div>

                    <ShowcaseFrame
                        title="Service rules and eligibility"
                        caption="Property-specific requirements are presented before the traveller commits to the booking."
                        badge="Operational Rules"
                    />

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Showing these rules before booking helps travellers spot important restrictions before committing.
                    </p>

                    <ShowcaseFrame
                        title="Ratings and reviews"
                        caption="Guest feedback supports the decision with information beyond the property’s own description."
                        badge="Social Proof"
                    />
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 07 / CHECKOUT ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>07 / CHECKOUT</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Keeping the selected package and the booking details connected.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        Once a traveller has chosen a package, the next step should be clear and the cost should remain easy to review.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Selecting a package reveals a sticky bar with the selection count, total price and Book Now action. Travellers can proceed without scrolling back to the package card.
                    </p>

                    {/* Floating / Sticky Bar Asset Showcase */}
                    <ShowcaseFrame
                        aspect="aspect-[21/9]"
                        narrow={true}
                        variant="sticky-bar"
                        title="Persistent booking action"
                        caption="The selected package and total remain visible while the traveller continues reviewing the property."
                        badge="Sticky Action"
                    />

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Checkout brings together guest information and booking review. Travellers enter the primary guest’s name, email and phone number. The flight details section supports a flight number, date and time, departure and arrival airports, and additional flight entries.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        A summary beside the form keeps the package, duration, times, guest count, subtotal, taxes and grand total visible throughout checkout.
                    </p>

                    <ShowcaseFrame
                        variant="browser"
                        title="Checkout and price summary"
                        caption="Guest information and booking review sit side by side, keeping the cost visible as the traveller completes the form."
                        badge="Checkout Flow"
                    />

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        From checkout, the traveller moves to Stripe to pay. Successful payment leads to a confirmation screen, and the reservation remains available under My Bookings or My Reservations.
                    </p>

                    {/* Step Progression Ribbon */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-2">
                        <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[110px]">
                            <span className="text-[11px] font-mono text-[#245CF5] font-semibold">STEP 01</span>
                            <div>
                                <b className="text-[13.5px] font-semibold text-[#171A22] block mb-0.5">Select</b>
                                <span className="text-[12px] text-[#717680] leading-snug block">Choose a property package.</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[110px]">
                            <span className="text-[11px] font-mono text-[#245CF5] font-semibold">STEP 02</span>
                            <div>
                                <b className="text-[13.5px] font-semibold text-[#171A22] block mb-0.5">Review</b>
                                <span className="text-[12px] text-[#717680] leading-snug block">Check guest and booking details.</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[110px]">
                            <span className="text-[11px] font-mono text-[#245CF5] font-semibold">STEP 03</span>
                            <div>
                                <b className="text-[13.5px] font-semibold text-[#171A22] block mb-0.5">Pay</b>
                                <span className="text-[12px] text-[#717680] leading-snug block">Complete payment through Stripe Checkout.</span>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[110px]">
                            <span className="text-[11px] font-mono text-[#245CF5] font-semibold">STEP 04</span>
                            <div>
                                <b className="text-[13.5px] font-semibold text-[#171A22] block mb-0.5">Confirm</b>
                                <span className="text-[12px] text-[#717680] leading-snug block">See the booking confirmation.</span>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1 p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between min-h-[110px]">
                            <span className="text-[11px] font-mono text-[#245CF5] font-semibold">STEP 05</span>
                            <div>
                                <b className="text-[13.5px] font-semibold text-[#171A22] block mb-0.5">Revisit</b>
                                <span className="text-[12px] text-[#717680] leading-snug block">Find the reservation in the profile.</span>
                            </div>
                        </div>
                    </div>

                    {/* Section Note */}
                    <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EE] border border-[#F4E1BD] text-[#7A5A2B] text-[13px] leading-relaxed my-2 flex items-start gap-3">
                        <span className="text-[#C4882B] text-lg leading-none" aria-hidden="true">ℹ</span>
                        <p>
                            <strong>Screen placeholders to add:</strong> Stripe Checkout hand-off/payment and the final booking confirmation / My Bookings screens. These stages were confirmed in the walkthrough, but screenshots have not yet been supplied.
                        </p>
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 08 / THE ECOSYSTEM (Light Section) ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>08 / THE ECOSYSTEM</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Designing the product beyond the traveller.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        The booking experience is only one side of StayTransit. Behind every property a traveller discovers is a business managing its services, packages and day-to-day operations. The platform also needs a central layer for the teams overseeing the wider marketplace.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        I also designed four operational dashboards—Super Admin, Merchant, Partner and Financial—as core parts of the product, each serving a distinct role in the StayTransit ecosystem.
                    </p>

                    {/* Ecosystem Architecture Canvas - Light Theme */}
                    <div className="my-4 p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-[#245CF5]" />
                            <h3 className="text-[18px] sm:text-[20px] font-semibold text-[#171A22]">One marketplace, multiple working environments</h3>
                        </div>
                        <p className="text-[14px] text-[#596272] mb-8">
                            A high-level view of the product areas I designed. Each dashboard supports a different role, while the traveller-facing experience brings the services together.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_auto_1.3fr_auto_1.1fr] items-center gap-4 md:gap-3">
                            <div className="p-5 rounded-xl bg-white border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#171A22]">Property / Merchant</b>
                                <span className="block text-[12px] text-[#596272] mt-1.5 leading-relaxed">
                                    Manages property details, services and packages
                                </span>
                            </div>

                            <div className="text-center text-[#245CF5] text-2xl font-bold rotate-90 md:rotate-0">→</div>

                            <div className="p-5 rounded-xl bg-[#EDF2FF] border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#245CF5]">StayTransit platform</b>
                                <span className="block text-[12px] text-[#3F4856] mt-1.5 leading-relaxed">
                                    Brings property offerings into the traveller discovery and booking experience
                                </span>
                            </div>

                            <div className="text-center text-[#245CF5] text-2xl font-bold rotate-90 md:rotate-0">→</div>

                            <div className="p-5 rounded-xl bg-white border-0 shadow-none text-center">
                                <b className="block text-[14px] font-semibold text-[#171A22]">Traveller</b>
                                <span className="block text-[12px] text-[#596272] mt-1.5 leading-relaxed">
                                    Discovers, selects and books a suitable service
                                </span>
                            </div>
                        </div>

                        <p className="text-[13px] text-[#245CF5] font-medium mt-6">
                            The wider operational layer also includes platform administration, partner operations and financial workflows.
                        </p>
                    </div>

                    <div className="mt-3">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#171A22]">
                                Different roles, different responsibilities
                            </h3>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Each dashboard serves a different role, with its own responsibilities:
                        </p>
                    </div>

                    {/* 4 Roles Card Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-2">
                        <div className="p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <h4 className="text-[16px] font-semibold text-[#171A22]">Super Admin</h4>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                The central administration experience for overseeing the StayTransit platform and its participating businesses.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <h4 className="text-[16px] font-semibold text-[#171A22]">Merchant</h4>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                The property-facing workspace for managing property information, services, packages, pricing and the conditions attached to those offerings.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2">
                            <h4 className="text-[16px] font-semibold text-[#171A22]">Partner</h4>
                            <p className="text-[13px] text-[#596272] leading-relaxed">
                                A dedicated workspace for partners working within the StayTransit ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-2 max-w-[800px]">
                        <h4 className="text-[16px] font-semibold text-[#171A22]">Financial dashboard</h4>
                        <p className="text-[13px] text-[#596272] leading-relaxed">
                            A separate operational area for the financial workflows that support the marketplace.
                        </p>
                    </div>

                    <div className="mt-3">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#171A22]">
                                Connecting operational setup to the traveller experience
                            </h3>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            The merchant dashboard connects directly to time-based discovery. Property admins manage their packages, durations, prices and conditions; StayTransit decides which eligible packages appear based on the traveller’s selected times.
                        </p>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px] mt-3">
                            Property teams maintain their offerings while StayTransit applies the matching logic. Travellers don't need to understand each property's package setup before searching.
                        </p>
                    </div>

                    <div className="mt-3">
                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="w-1.5 h-4 rounded-full bg-[#245CF5]" />
                            <h3 className="text-xl sm:text-2xl font-semibold text-[#171A22]">
                                Showing the breadth without exposing every workflow
                            </h3>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Rather than documenting every internal workflow, this case study presents the dashboards at an ecosystem level. A few selected overview screens can demonstrate their scope without exposing sensitive operational details.
                        </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EE] border border-[#F4E1BD] text-[#7A5A2B] text-[13px] leading-relaxed my-2 flex items-start gap-3">
                        <span className="text-[#C4882B] text-lg leading-none" aria-hidden="true">ℹ</span>
                        <p>
                            <strong>Visuals to add from Figma:</strong> one overview screen for Super Admin, one Merchant dashboard screen showing property/package management, one Partner dashboard overview and one Financial dashboard overview. Keep each image large enough to read, but avoid exposing sensitive merchant, customer or financial data.
                        </p>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The result is a product designed for more than one audience: travellers who need to book airport services, properties that need to manage what they offer, partners who participate in the marketplace and the internal teams responsible for operating it.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 09 / PLATFORM ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>09 / PLATFORM</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Carrying the experience across web and mobile.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        StayTransit needed to work across the website and mobile apps, alongside dashboards designed for distinct operational roles.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        I also designed the iOS and Android apps, carrying the same core journey across mobile: search, discover properties, review packages, enter booking details and complete the reservation.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The goal was to preserve the same clarity across screen sizes, especially in search, property details, package selection and booking review.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        With no existing design system, I created reusable UI components and interface patterns as the product evolved.
                    </p>

                    <div className="p-4 sm:p-5 rounded-xl bg-[#FFF9EE] border border-[#F4E1BD] text-[#7A5A2B] text-[13px] leading-relaxed my-2 flex items-start gap-3">
                        <span className="text-[#C4882B] text-lg leading-none" aria-hidden="true">ℹ</span>
                        <p>
                            Mobile application screenshots and component-library visuals can be added here when selected from Figma.
                        </p>
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 10 / OUTCOME ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>10 / OUTCOME</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        Taking a multi-sided product from concept to launch.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        The work resulted in a launched product spanning the traveller booking experience and the operational interfaces behind it.
                    </p>

                    {/* Outcome Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
                        <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#245CF5]/10 text-[#245CF5] text-[11px] font-bold uppercase tracking-wider mb-3">
                                    Product Surface 01
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171A22] mb-2">
                                    Traveller-facing
                                </h3>
                                <p className="text-[15px] text-[#596272] leading-relaxed">
                                    Designed the web booking experience and the iOS and Android applications, covering discovery through to booking confirmation.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1E8B68]/10 text-[#1E8B68] text-[11px] font-bold uppercase tracking-wider mb-3">
                                    Product Surface 02
                                </span>
                                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171A22] mb-2">
                                    Operational
                                </h3>
                                <p className="text-[15px] text-[#596272] leading-relaxed">
                                    Designed the Super Admin, Merchant, Partner and Financial dashboards that support the wider platform.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        StayTransit reached launch, but adoption was not yet at a stage where meaningful usage or conversion claims could be made. Rather than presenting unverified numbers as impact, this case study focuses on the product decisions, flows and interfaces I designed and delivered.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 11 / REFLECTION ── */}
            <Reveal>
                <section className="flex flex-col gap-4 sm:gap-5">
                    {/* Section Header */}
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>11 / REFLECTION</FigmaHighlight>
                        </h3>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">
                        What I learned from designing StayTransit.
                    </h2>

                    <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                        The most important lesson was that the quality of a booking experience is often decided before a traveller reaches the booking form.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        StayTransit pushed me to think beyond individual screens. Search had to translate a traveller’s situation into relevant options; package matching had to account for different property offerings; and the property and checkout experiences had to make conditions, costs and booking steps clear.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        It also broadened my view of product design: the traveller experience is only one side of a marketplace that also needs tools for merchants, partners, administrators and finance teams.
                    </p>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The time-based search became the clearest expression of that approach: start with the traveller’s circumstances and let the product find the relevant options.
                    </p>
                </section>
            </Reveal>

            {/* ── FOOTER / COLOPHON ── */}
            <Reveal>
                <footer className="pt-6 pb-12 flex flex-col gap-3 text-[13px] text-[#717680] leading-relaxed">
                    <p className="font-semibold text-[#171A22] text-[14px]">StayTransit · Product design case study</p>
                    <p>Written from the project walkthrough and interface screenshots supplied. No unsupported research findings, usability-test results, adoption metrics or business impact figures have been added.</p>
                    <p>Before publishing: confirm whether flight details are optional or compulsory. The shared checkout screenshot labels the section “Optional”, while an earlier verbal walkthrough described it as compulsory. Also add the payment, confirmation and mobile screenshots if you want those stages visually represented.</p>
                </footer>
            </Reveal>

        </div>
    );
}
