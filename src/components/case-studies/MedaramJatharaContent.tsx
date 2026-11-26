import Reveal from "../reveal";
import FigmaHighlight from "../FigmaHighlight";
import { EditorialDivider } from "../EditorialGrid";

// ── Extracted 13 high-resolution assets from expanded case study ──
import img01AppHome from "../../assets/images/medaram/exp_01_guest_app_home_screen.png";
import img02AppServices from "../../assets/images/medaram/exp_02_guest_app_service_directory.png";
import img03AppSafetyHub from "../../assets/images/medaram/exp_03_safety_hub_in_guest_app.png";
import img04ServiceDirScreen from "../../assets/images/medaram/exp_04_service_directory_screen.png";
import img05MedicalAssistScreen from "../../assets/images/medaram/exp_05_medical_assistance_screen.png";
import img06AppSafetyScreen from "../../assets/images/medaram/exp_06_app_safety_screen.png";
import img07IncidentForm from "../../assets/images/medaram/exp_07_incident_report_form.png";
import img08MissingPersonForm from "../../assets/images/medaram/exp_08_missing_person_report_form.png";
import img09WebFestivalPage from "../../assets/images/medaram/exp_09_guest_web_festival_page.png";
import img10WebRoutesTravel from "../../assets/images/medaram/exp_10_guest_web_routes_and_travel_information.png";
import img11WebServiceDir from "../../assets/images/medaram/exp_11_guest_web_service_directory.png";
import img12WebSafetyInfo from "../../assets/images/medaram/exp_12_guest_web_safety_information.png";
import img13DarshanBooking from "../../assets/images/medaram/exp_13_darshan_booking_exploration.png";

interface ShowcaseFrameProps {
    title: string;
    caption?: string;
    narrow?: boolean;
    mediaUrl: string;
}

function ShowcaseFrame({
    title,
    caption,
    narrow = false,
    mediaUrl,
}: ShowcaseFrameProps) {
    return (
        <figure className={`w-full ${narrow ? "max-w-[420px] mx-auto" : ""} my-6 sm:my-8`}>
            {/* Clean Editorial Image Wrapper */}
            <div className="w-full rounded-xl md:rounded-2xl overflow-hidden border border-black/[0.08] bg-[#F7F6F1]">
                <img
                    src={mediaUrl}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block select-none"
                />
            </div>

            {/* Editorial Caption Bar */}
            {caption && (
                <figcaption className="mt-3 px-1 flex items-start gap-2.5 text-left">
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

function FlowArrow() {
    return (
        <span className="text-[#245CF5] font-bold text-sm select-none shrink-0" aria-hidden="true">
            →
        </span>
    );
}

export default function MedaramJatharaContent() {
    return (
        <div className="w-full flex flex-col gap-10 sm:gap-14 md:gap-18 font-roobert text-[#171A22]">

            {/* ── PROJECT HERO METADATA & OVERVIEW ── */}
            <Reveal>
                <div className="flex flex-col gap-6">
                    {/* Project Overview Spotlight Card */}
                    <div className="p-6 sm:p-8 rounded-2xl md:rounded-3xl bg-[#FBFBFB] border-0 shadow-none">
                        <div className="flex items-center gap-2.5">
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>Project overview</FigmaHighlight>
                            </h3>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-[#3F4856] text-[15px] sm:text-[16px] leading-relaxed">
                                Medaram Jathara is the biennial Sammakka–Saralamma Jathara held in Medaram, Telangana, drawing millions of devotees to one of India&apos;s largest tribal gatherings. The project brought together two connected digital products: a public-facing website designed for pre-visit planning and information discovery, and a mobile application built for fast, practical on-ground navigation, facility discovery, and visitor safety.
                            </p>
                        </div>
                    </div>

                    {/* Project Meta Bar */}
                    <div className="py-2">
                        <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">My role</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Product Designer</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Contribution</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">UX flows & UI design</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Surfaces</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">Guest Web + Guest App</dd>
                            </div>
                            <div>
                                <dt className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Reported Reach</dt>
                                <dd className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">5,000+ app downloads</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 01 / THE PROJECT ── */}
            <Reveal>
                <section id="project" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>01 / THE PROJECT</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            One festival. Two digital touchpoints.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            Medaram Jathara is the biennial Sammakka–Saralamma Jathara held in Medaram, Telangana. The project brought together a public-facing website and a mobile app, each designed around a different visitor context.
                        </p>
                    </div>

                    {/* Dual Products Panel — Important framing cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-semibold text-[#171A22] mb-1.5">Guest Web</h3>
                                <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                    Help people understand the festival, plan their journey, review schedules and explore available services before travelling.
                                </p>
                            </div>
                            <span className="text-[12px] font-medium text-[#717680] mt-4 pt-3 border-t border-black/[0.05] block">
                                Primary context · Before arrival
                            </span>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg sm:text-[19px] font-semibold text-[#171A22] mb-1.5">Guest App</h3>
                                <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                    Give visitors on-site access to service information, location details, help channels and safety-related actions.
                                </p>
                            </div>
                            <span className="text-[12px] font-medium text-[#717680] mt-4 pt-3 border-t border-black/[0.05] block">
                                Primary context · During the visit
                            </span>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/[0.06]">
                        <div className="flex flex-col">
                            <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">2</span>
                            <span className="text-[13px] text-[#596272] mt-1">Digital products designed</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">5,000+</span>
                            <span className="text-[13px] text-[#596272] mt-1">App downloads, as reported by the designer</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">2026</span>
                            <span className="text-[13px] text-[#596272] mt-1">Project edition</span>
                        </div>
                    </div>

                    <p className="text-[14px] sm:text-[15px] text-[#3F4856] leading-relaxed pt-2">
                        <strong className="text-[#171A22] font-semibold">My role: </strong>
                        I independently designed the Guest App and Guest Web, covering UX flows and UI design. The work included structuring the experiences, designing key journeys and translating the requirements into interface designs.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 02 / UNDERSTANDING THE CONTEXT ── */}
            <Reveal>
                <section id="context" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>02 / UNDERSTANDING THE CONTEXT</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            A high-footfall event creates very practical information needs.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            The design work began with conversations with stakeholders, organizers and people familiar with the festival. Three recurring areas of concern shaped the direction: visitors struggling to find essential facilities, missing-person situations and emergency assistance, and a lack of reliable information before reaching Medaram.
                        </p>
                    </div>

                    {/* Three Core Areas of Concern — Clean editorial text grid (no boxes) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div>
                            <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">Finding facilities</h3>
                            <p className="text-[13.5px] sm:text-[14px] text-[#596272] leading-relaxed">
                                Visitors need to locate practical services such as medical points, drinking water, toilets, parking and help desks.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">Getting assistance</h3>
                            <p className="text-[13.5px] sm:text-[14px] text-[#596272] leading-relaxed">
                                Families and visitors need clear pathways to report an incident or request help when something goes wrong.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-[17px] font-semibold text-[#171A22] mb-1.5">Preparing ahead</h3>
                            <p className="text-[13.5px] sm:text-[14px] text-[#596272] leading-relaxed">
                                People need information about routes, schedules and available services before setting out.
                            </p>
                        </div>
                    </div>

                    {/* Scale Matters Subsection */}
                    <div className="flex flex-col gap-4 pt-4 border-t border-black/[0.06]">
                        <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22] tracking-tight">
                            Why scale matters
                        </h3>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            The 2024 full-scale Jathara was held from 21–24 February. A ministerial briefing reported approximately 1.35 crore devotees by the afternoon of 24 February, along with 5,090 missing-child reports and 5,062 reunifications during the event. The briefing also referred to 20 government departments involved.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">1.35 crore</span>
                                <span className="text-[13px] text-[#596272] mt-1">Minister-reported attendance by afternoon of 24 Feb 2024</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">5,090</span>
                                <span className="text-[13px] text-[#596272] mt-1">Missing-child reports reported during 2024 event</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight">5,062</span>
                                <span className="text-[13px] text-[#596272] mt-1">Reunifications reported during 2024 event</span>
                            </div>
                        </div>

                        {/* Factual Disclaimer Card */}
                        <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                            <strong className="font-semibold text-[#171A22]">Historical context note: </strong>
                            These figures are historical context from the 2024 event. They are not outcomes of the 2026 digital products and should not be interpreted as product impact.
                        </div>
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 03 / THE CHALLENGE ── */}
            <Reveal>
                <section id="challenge" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>03 / THE CHALLENGE</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Help visitors feel informed before they arrive, and supported once they are there.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            The challenge was not simply to put festival information online. It was to make the right information reachable at the right moment, across two contexts with different needs and levels of urgency.
                        </p>
                    </div>

                    {/* Dual Moments — Key comparative cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none">
                            <span className="text-[11.5px] font-bold tracking-wider text-[#245CF5] uppercase block mb-1">Before arrival</span>
                            <h3 className="text-lg font-semibold text-[#171A22] mb-1.5">Plan with confidence</h3>
                            <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Understand the event, check schedules and routes, and know what services and support information are available.
                            </p>
                        </div>
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none">
                            <span className="text-[11.5px] font-bold tracking-wider text-[#245CF5] uppercase block mb-1">During the visit</span>
                            <h3 className="text-lg font-semibold text-[#171A22] mb-1.5">Act without unnecessary friction</h3>
                            <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Find nearby facilities, understand where to go and reach the appropriate help or reporting pathway.
                            </p>
                        </div>
                    </div>

                    {/* How Might We Callout */}
                    <blockquote className="border-l-2 border-[#245CF5] pl-5 sm:pl-6 py-2 my-2 text-[18px] sm:text-[20px] text-[#171A22] font-normal italic leading-relaxed max-w-[800px]">
                        &ldquo;How might we make essential festival information easy to discover before the visit, while giving on-ground visitors clear ways to find services and request assistance?&rdquo;
                    </blockquote>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The design response needed to balance everyday utility—such as finding water or parking—with more sensitive, time-critical situations such as incident and missing-person reporting.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 04 / PRODUCT STRATEGY ── */}
            <Reveal>
                <section id="strategy" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>04 / PRODUCT STRATEGY</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            The same visitor experience, designed for two different moments.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            Rather than treating the app and website as two versions of the same interface, I approached them as complementary products. Their roles were shaped by when and how visitors were likely to use them.
                        </p>
                    </div>

                    {/* Strategy Comparison Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 pt-2">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#171A22] mb-1.5">Guest Web — plan the visit</h3>
                                <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                    The web experience works as a public information layer. It brings together festival information, travel routes, schedules, service directories and safety resources in a format people can explore before travelling.
                                </p>
                            </div>
                            <p className="text-[13px] font-medium text-[#171A22] mt-4 pt-3 border-t border-black/[0.05]">
                                <strong>Core question: </strong>What should I know before I go?
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[#171A22] mb-1.5">Guest App — support the visit</h3>
                                <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                    The app is an on-ground companion. Its home and service areas provide access to quick actions, facilities, medical assistance and safety-related reporting pathways.
                                </p>
                            </div>
                            <p className="text-[13px] font-medium text-[#171A22] mt-4 pt-3 border-t border-black/[0.05]">
                                <strong>Core question: </strong>I’m here. Where do I go, and how do I get help?
                            </p>
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        This distinction informed the information hierarchy: broader exploration on the website, and more direct task access in the mobile app.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 05 / INFORMATION ARCHITECTURE ── */}
            <Reveal>
                <section id="architecture" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>05 / INFORMATION ARCHITECTURE</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Organizing a wide range of information without making every task compete for attention.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            The products cover several kinds of information: festival guidance, practical facilities, visitor support and safety. The architecture groups related tasks so that visitors can start from a clear category and move toward the detail they need.
                        </p>
                    </div>

                    {/* Flow Diagram Panels */}
                    <div className="flex flex-col gap-4">
                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none">
                            <h3 className="text-base font-semibold text-[#171A22] mb-2.5">Guest Web Structure</h3>
                            <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-1">
                                <span>Festival overview</span>
                                <FlowArrow />
                                <span>Routes &amp; travel</span>
                                <FlowArrow />
                                <span>Schedule</span>
                                <FlowArrow />
                                <span>Services &amp; safety</span>
                            </div>
                            <p className="text-[12.5px] text-[#717680] mt-3 pt-2.5 border-t border-black/[0.05]">
                                A public information structure for browsing and planning.
                            </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none">
                            <h3 className="text-base font-semibold text-[#171A22] mb-2.5">Guest App Structure</h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-0.5">
                                    <span>Home</span>
                                    <FlowArrow />
                                    <span>Services</span>
                                    <FlowArrow />
                                    <span>Service detail</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-0.5">
                                    <span>Home / Safety</span>
                                    <FlowArrow />
                                    <span>SOS / Report</span>
                                    <FlowArrow />
                                    <span>Provide details</span>
                                </div>
                            </div>
                            <p className="text-[12.5px] text-[#717680] mt-3 pt-2.5 border-t border-black/[0.05]">
                                A task-oriented structure for service discovery and assistance.
                            </p>
                        </div>
                    </div>

                    {/* Side-by-side Mobile Showcase Frames */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <ShowcaseFrame
                            title="Guest App home"
                            caption="The primary entry point brings together key actions and access to the wider service experience."
                            mediaUrl={img01AppHome}
                        />
                        <ShowcaseFrame
                            title="Service directory"
                            caption="Service categories give visitors a starting point before they move into specific facility details."
                            mediaUrl={img02AppServices}
                        />
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The web and app structures are intentionally not identical. The website supports broad information discovery; the app gives more weight to on-ground tasks and assistance.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 06 / VISITOR JOURNEYS ── */}
            <Reveal>
                <section id="journeys" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>06 / VISITOR JOURNEYS</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Three paths through the experience.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            These journeys summarize the designed paths across the two products. They describe the intended interaction flow, not measured user behavior.
                        </p>
                    </div>

                    {/* Three Visual Journeys — Clean editorial flows */}
                    <div className="flex flex-col gap-6 py-2">
                        <div className="flex flex-col gap-1.5">
                            <h3 className="text-base font-semibold text-[#171A22]">01 — Prepare before travelling</h3>
                            <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-1">
                                <span>Discover festival</span>
                                <FlowArrow />
                                <span>Check routes</span>
                                <FlowArrow />
                                <span>View schedule</span>
                                <FlowArrow />
                                <span>Explore services</span>
                            </div>
                            <span className="text-[12.5px] text-[#717680]">Guest Web · Before arrival</span>
                        </div>

                        <div className="flex flex-col gap-1.5 pt-4 border-t border-black/[0.06]">
                            <h3 className="text-base font-semibold text-[#171A22]">02 — Find an essential service</h3>
                            <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-1">
                                <span>Open app</span>
                                <FlowArrow />
                                <span>Choose category</span>
                                <FlowArrow />
                                <span>Review location</span>
                                <FlowArrow />
                                <span>Open directions</span>
                            </div>
                            <span className="text-[12.5px] text-[#717680]">
                                Guest App · During the visit. Directions open in an external map application; the product does not provide in-app turn-by-turn navigation.
                            </span>
                        </div>

                        <div className="flex flex-col gap-1.5 pt-4 border-t border-black/[0.06]">
                            <h3 className="text-base font-semibold text-[#171A22]">03 — Request assistance</h3>
                            <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#171A22] font-medium py-1">
                                <span>Open Safety</span>
                                <FlowArrow />
                                <span>Choose action</span>
                                <FlowArrow />
                                <span>Enter details</span>
                                <FlowArrow />
                                <span>Submit / share</span>
                            </div>
                            <span className="text-[12.5px] text-[#717680]">
                                Guest App · Assistance pathway. The exact action depends on whether the visitor is requesting emergency help, reporting an incident or reporting a missing person.
                            </span>
                        </div>
                    </div>

                    <ShowcaseFrame
                        title="Safety area"
                        caption="A dedicated destination groups safety-related actions rather than mixing them into the general service directory."
                        narrow={true}
                        mediaUrl={img03AppSafetyHub}
                    />
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 07 / DESIGNING FOR DISCOVERY ── */}
            <Reveal>
                <section id="discovery" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>07 / DESIGNING FOR DISCOVERY</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Move from a broad need to a useful place or next step.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            At a large event, knowing that a service exists is only the first part of the task. Visitors also need to understand where it is and what to do next.
                        </p>
                    </div>

                    {/* 3 Decision / Rationale Rows */}
                    <div className="flex flex-col divide-y divide-black/[0.06]">
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">The need</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Visitors may arrive looking for a specific facility—medical assistance, drinking water, toilets, parking or a help desk—without knowing its location or the terminology used in the directory.
                            </p>
                        </div>
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">The design response</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Group facilities into recognizable service categories, then provide dedicated detail views with location information and map previews where available.
                            </p>
                        </div>
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">The next action</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Allow visitors to continue to directions through an external map application. This keeps the interface focused on discovery while relying on a separate mapping service for navigation.
                            </p>
                        </div>
                    </div>

                    {/* Side-by-Side Mobile Screens */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                        <ShowcaseFrame
                            title="Service categories"
                            caption="A scannable directory gives visitors a clear starting point."
                            mediaUrl={img04ServiceDirScreen}
                        />
                        <ShowcaseFrame
                            title="Medical assistance"
                            caption="A focused service view makes a specific type of support easier to identify."
                            mediaUrl={img05MedicalAssistScreen}
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                        <strong className="font-semibold text-[#171A22]">Operational note: </strong>
                        The interface can present location information, but real-world service availability and accuracy depend on the information being maintained by the event operation.
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 08 / DESIGNING FOR ASSISTANCE ── */}
            <Reveal>
                <section id="assistance" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>08 / DESIGNING FOR ASSISTANCE</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Give different situations distinct pathways.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            Safety-related tasks should not feel like one generic contact form. Requesting emergency help, reporting an incident and reporting a missing person involve different information and different next steps.
                        </p>
                    </div>

                    {/* Three Assistance Pathways — Editorial sections */}
                    <div className="flex flex-col gap-10">
                        {/* Emergency SOS */}
                        <div className="flex flex-col gap-2">
                            <span className="text-[11.5px] font-bold tracking-wider text-[#245CF5] uppercase">Pathway 01</span>
                            <h3 className="text-lg font-semibold text-[#171A22]">Emergency SOS</h3>
                            <p className="text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed max-w-[800px]">
                                The app includes an Emergency SOS pathway that shares the visitor’s location with an emergency team. This is a designed sharing mechanism, not a guarantee of response or resolution.
                            </p>
                            <ShowcaseFrame
                                title="Safety hub"
                                caption="Emergency SOS is presented within the dedicated safety area."
                                narrow={true}
                                mediaUrl={img06AppSafetyScreen}
                            />
                        </div>

                        {/* Incident Reporting */}
                        <div className="flex flex-col gap-2 pt-6 border-t border-black/[0.06]">
                            <span className="text-[11.5px] font-bold tracking-wider text-[#245CF5] uppercase">Pathway 02</span>
                            <h3 className="text-lg font-semibold text-[#171A22]">Incident reporting</h3>
                            <p className="text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed max-w-[800px]">
                                The incident-reporting flow provides a structured way to submit details about an issue, rather than depending only on an open-ended message.
                            </p>
                            <ShowcaseFrame
                                title="Incident report"
                                caption="A form-based flow for submitting incident information."
                                narrow={true}
                                mediaUrl={img07IncidentForm}
                            />
                        </div>

                        {/* Missing Person Reporting */}
                        <div className="flex flex-col gap-2 pt-6 border-t border-black/[0.06]">
                            <span className="text-[11.5px] font-bold tracking-wider text-[#245CF5] uppercase">Pathway 03</span>
                            <h3 className="text-lg font-semibold text-[#171A22]">Missing-person reporting</h3>
                            <p className="text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed max-w-[800px]">
                                The missing-person flow is designed to collect identifying details, a recent photo and the last known location. Reports are intended for authorized officials or event staff—not as a public directory of personal information.
                            </p>
                            <ShowcaseFrame
                                title="Missing-person report"
                                caption="Structured information intended to support staff handling a report."
                                narrow={true}
                                mediaUrl={img08MissingPersonForm}
                            />
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FBFBFB] border-0 shadow-none text-[13px] sm:text-[13.5px] text-[#596272] leading-relaxed">
                        <strong className="font-semibold text-[#171A22]">Verification disclaimer: </strong>
                        The screens demonstrate designed reporting pathways. They do not establish that reports were successfully handled, that reunifications occurred through the app, or that emergency response times improved.
                    </div>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 09 / THE GUEST WEB ── */}
            <Reveal>
                <section id="web" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>09 / THE GUEST WEB</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            A public information resource, not just a festival landing page.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            The website brings together the information a visitor may need before travelling: what the festival is, how to reach Medaram, when key events take place and what services or safety resources are available.
                        </p>
                    </div>

                    {/* Wide Web Frames */}
                    <div className="flex flex-col gap-6">
                        <ShowcaseFrame
                            title="Festival information"
                            caption="An entry point to the event and its supporting information."
                            mediaUrl={img09WebFestivalPage}
                        />

                        <ShowcaseFrame
                            title="Routes and travel"
                            caption="Travel guidance helps visitors understand how to reach the festival location."
                            mediaUrl={img10WebRoutesTravel}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ShowcaseFrame
                                title="Service information"
                                caption="A web directory extends service discovery to people planning their visit."
                                mediaUrl={img11WebServiceDir}
                            />
                            <ShowcaseFrame
                                title="Safety resources"
                                caption="Safety information and support pathways are also accessible through the public website."
                                mediaUrl={img12WebSafetyInfo}
                            />
                        </div>
                    </div>

                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        The web experience complements the app rather than duplicating it. It supports a slower, exploratory planning context, while the app is designed for more immediate use during the event.
                    </p>
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 10 / DESIGN DECISIONS & CONSTRAINTS ── */}
            <Reveal>
                <section id="decisions" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>10 / DESIGN DECISIONS & CONSTRAINTS</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Designing useful pathways while being clear about what the product can—and cannot—control.
                        </h2>
                    </div>

                    {/* 4 Decision Rows */}
                    <div className="flex flex-col divide-y divide-black/[0.06]">
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">Separate by context</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Web for pre-visit discovery; app for on-ground utility. This gives each product a clearer job and prevents the two surfaces from becoming identical feature lists.
                            </p>
                        </div>
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">Prioritize safety access</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Safety-related actions have a dedicated area, distinct from everyday facility discovery. This helps separate urgent and sensitive tasks from routine browsing.
                            </p>
                        </div>
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">Use external navigation</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Location previews help orient visitors, while directions continue in an external map application. The product does not claim to provide in-app navigation.
                            </p>
                        </div>
                        <div className="py-4 sm:py-5 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-6">
                            <span className="text-[12px] font-bold uppercase tracking-wider text-[#245CF5]">Keep reports structured</span>
                            <p className="md:col-span-3 text-[14.5px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Incident and missing-person reporting use dedicated forms because the information required for each situation differs.
                            </p>
                        </div>
                    </div>

                    {/* Important Boundaries Spotlight Box */}
                    <div className="p-6 rounded-2xl bg-[#FBFBFB] border-0 shadow-none flex flex-col gap-3 my-2">
                        <h3 className="text-base font-semibold text-[#171A22]">Important implementation boundaries</h3>
                        <ul className="list-disc pl-5 text-[14px] sm:text-[15px] text-[#596272] leading-relaxed space-y-2 max-w-[800px]">
                            <li>Service locations and operational availability need accurate, maintained event information.</li>
                            <li>Emergency SOS shares location with an emergency team; the interface cannot guarantee that help will arrive.</li>
                            <li>Missing-person reports are intended for authorized officials or event staff.</li>
                            <li>Darshan and Prasadam booking flows were designed as explorations but were not implemented.</li>
                        </ul>
                    </div>

                    <ShowcaseFrame
                        title="Booking exploration"
                        caption="Darshan and Prasadam booking concepts were part of the design work, but were not implemented in the launched product."
                        narrow={true}
                        mediaUrl={img13DarshanBooking}
                    />
                </section>
            </Reveal>

            <EditorialDivider />

            {/* ── 11 / LAUNCH & REFLECTION ── */}
            <Reveal>
                <section id="outcome" className="flex flex-col gap-6 sm:gap-8">
                    <div className="flex flex-col gap-3">
                        <div>
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>11 / LAUNCH & REFLECTION</FigmaHighlight>
                            </h3>
                        </div>

                        <h2 className="text-xl sm:text-2xl md:text-[26px] font-semibold text-[#171A22] tracking-tight leading-tight">
                            Two products launched. A foundation for a more connected visitor experience.
                        </h2>

                        <p className="text-[17px] sm:text-[19px] text-[#3F4856] font-normal leading-relaxed max-w-[800px]">
                            The Guest Web and Guest App were launched. The app recorded more than 5,000 downloads, according to the figure provided by the designer.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/[0.06]">
                        <div className="flex flex-col">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171A22]">5,000+</span>
                            <span className="text-[13px] text-[#596272] mt-1">
                                App downloads · Designer-provided figure; no independent analytics evidence supplied here.
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#171A22]">2</span>
                            <span className="text-[13px] text-[#596272] mt-1">
                                Launched digital touchpoints: Guest Web and Guest App.
                            </span>
                        </div>
                    </div>

                    {/* What I would investigate next */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-black/[0.06]">
                        <h3 className="text-lg sm:text-xl md:text-[20px] font-semibold text-[#171A22] tracking-tight">
                            What I would investigate next
                        </h3>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            The next stage would be to validate the experience in the conditions it is designed for—not just review the screens in isolation.
                        </p>
                        <ul className="list-disc pl-5 text-[14px] sm:text-[15px] text-[#596272] leading-relaxed space-y-2 max-w-[800px]">
                            <li><strong className="text-[#171A22]">Service information: </strong>How are facility locations, opening status and availability maintained during the event?</li>
                            <li><strong className="text-[#171A22]">Connectivity: </strong>How do core tasks behave when visitors have weak or unreliable network access?</li>
                            <li><strong className="text-[#171A22]">Reporting clarity: </strong>Can visitors understand what happens after submitting an incident or missing-person report?</li>
                            <li><strong className="text-[#171A22]">Accessibility and language: </strong>Can people with different language preferences, ages and levels of digital confidence use the experience comfortably?</li>
                        </ul>
                    </div>

                    <blockquote className="border-l-2 border-[#245CF5] pl-5 sm:pl-6 py-2 my-2 text-[18px] sm:text-[20px] text-[#171A22] font-normal italic leading-relaxed max-w-[800px]">
                        &ldquo;The biggest learning was that designing for a large public event means designing for a network of information, services and people—not just a collection of screens.&rdquo;
                    </blockquote>

                    {/* Sources & References */}
                    <div className="flex flex-col gap-3 pt-6 border-t border-black/[0.06]">
                        <h3 className="text-base font-semibold text-[#171A22]">Sources and evidence</h3>
                        <div className="flex flex-col gap-2.5 text-[13.5px] text-[#596272]">
                            <p>
                                <a
                                    href="https://www.newindianexpress.com/amp/story/states/telangana/2024/Feb/25/135-crore-devotees-visited-medaram-jatara-over-5000-missing-kids-reunited"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#245CF5] font-medium underline underline-offset-2 hover:text-[#1746C7]"
                                >
                                    The New Indian Express · 25 February 2024
                                </a>{" "}
                                — reports the minister-attributed attendance and missing-child figures from the 2024 event.
                            </p>
                            <p>
                                <a
                                    href="https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2008538&lang=2&reg=48"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#245CF5] font-medium underline underline-offset-2 hover:text-[#1746C7]"
                                >
                                    Press Information Bureau · Ministry of Tribal Affairs · 23 February 2024
                                </a>{" "}
                                — background on the festival and its 2024 dates.
                            </p>
                            <p>
                                <a
                                    href="https://www.figma.com/design/4ZupRX6Q5RkJxJECog45tp/StayTransit--Medaram-Jathara--Sannidhanam?node-id=0-1"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[#245CF5] font-medium underline underline-offset-2 hover:text-[#1746C7]"
                                >
                                    Medaram Jathara 2026 — project design file
                                </a>
                            </p>
                        </div>
                        <p className="text-[12.5px] text-[#717680] mt-1 pt-2">
                            The 2024 event figures are used only to explain context. The 5,000+ download figure was supplied by the designer. No user-testing results, operational response metrics or verified safety outcomes were supplied for this case study.
                        </p>
                    </div>
                </section>
            </Reveal>

        </div>
    );
}
