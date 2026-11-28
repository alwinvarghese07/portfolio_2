import moodboard from "../../assets/images/moodboard.webp";
import userFlow from "../../assets/images/userflows.webp";
import lowFidelity from "../../assets/images/lowfidelity.webp";
import wireframes from "../../assets/images/wireframes.webp";
import highFidelity from "../../assets/images/highfidelity.webp";
import emptystate from "../../assets/images/emptystate.webp";
import keyScreens from "../../assets/images/keyscreens.webp";
import persona1 from "../../assets/images/persona1.webp";
import persona2 from "../../assets/images/persona2.webp";
import alltrails from "../../assets/images/trails_logo.webp";
import gaiagps from "../../assets/images/gaia_logo.webp";
import figma from "../../assets/images/figma_logo.webp";
import miro from "../../assets/images/miro_logo.webp";
import wanderLogo from "../../assets/images/wander_logo.webp";
import reddit from "../../assets/images/reddit.webp";
import Reveal from "../reveal";
import FigmaHighlight from "../FigmaHighlight";
import { EditorialDivider } from "../EditorialGrid";

export default function WanderContent() {
    return (
        <div className="w-full flex flex-col gap-10 sm:gap-14 md:gap-18 font-roobert text-[#171A22]">
            {/* ── 1. OVERVIEW ── */}
            <Reveal>
                <div className="flex flex-col gap-8 md:gap-10">
                    <div>
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>01 / OVERVIEW</FigmaHighlight>
                        </h3>
                    </div>

                    <div className="flex flex-col gap-6 md:gap-8">
                        {/* Role, Responsibilities, Tools */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-5 border-b border-black/[0.06] divide-y md:divide-y-0 md:divide-x divide-black/[0.06]">
                            <div className="flex flex-col gap-1 pt-2 md:pt-0">
                                <h4 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Role</h4>
                                <p className="text-[15px] sm:text-[16px] font-semibold text-[#171A22]">UI/UX Designer</p>
                            </div>
                            <div className="flex flex-col gap-1 pt-5 md:pt-0 md:pl-8">
                                <h4 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Responsibilities</h4>
                                <ul className="flex flex-col gap-2 text-[14px] text-[#424B59] leading-relaxed">
                                    <li>UX Research</li>
                                    <li>User Flows & Sketching</li>
                                    <li>UI Design</li>
                                    <li>Interactive Prototyping</li>
                                </ul>
                            </div>
                            <div className="flex flex-col gap-1 pt-5 md:pt-0 md:pl-8">
                                <h4 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold mb-1">Tools</h4>
                                <ul className="flex flex-col gap-3 text-[14px] text-[#424B59] leading-relaxed">
                                    <div className="flex items-center gap-3">
                                        <img src={figma} alt="Figma" className="w-5 h-5 object-contain" />
                                        <li className="list-none font-semibold text-[#171A22]">Figma</li>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <img src={miro} alt="Miro" className="w-5 h-5 object-contain" />
                                        <li className="list-none font-semibold text-[#171A22]">Miro</li>
                                    </div>
                                </ul>
                            </div>
                        </div>

                        {/* Project Background & Goal */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-2">
                            <div className="flex flex-col gap-2">
                                <h4 className="text-[16px] font-semibold text-[#171A22]">Project Background</h4>
                                <p className="text-[15px] text-[#596272] leading-relaxed">
                                    Outdoor enthusiasts frequently face disjointed planning: fragmented trail information, uncertain route conditions, and difficulty coordinating group trips across multiple tools. Wander was conceived to bring trail discovery, route planning, and trip coordination into a unified interface.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="text-[16px] font-semibold text-[#171A22]">Design Objective</h4>
                                <p className="text-[15px] text-[#596272] leading-relaxed">
                                    Design an end-to-end mobile experience that makes route discovery straightforward, simplifies itinerary organization, and helps adventurers share verified trail insights with their groups.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What is Wander */}
                    <div className="flex flex-col items-center gap-3 py-6 max-w-[720px] mx-auto w-full text-center">
                        <div className="flex justify-center items-center gap-3 flex-wrap">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-[#171A22] tracking-tight">What is</h2>
                            <div className="w-36 sm:w-40">
                                <img src={wanderLogo} alt="Wander Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] text-center leading-relaxed">
                            Wander is a concept mobile application designed to simplify trail discovery, route navigation, and trip coordination for outdoor hikers and campers.
                        </p>
                    </div>
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 2. RESEARCH ── */}
            <Reveal>
                <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>Research</FigmaHighlight>
                        </h3>
                        <div className="h-px bg-black/[0.08] grow"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">Observing the demand</h4>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            Across online forums, social media groups, and adventure communities, people frequently asked for an app that helps them discover new outdoor activities, plan trips effortlessly, and connect with fellow adventurers. Many shared frustrations about scattered information, lack of reliable recommendations, and difficulty coordinating trips with friends.
                        </p>
                    </div>

                    <img src={reddit} alt="Reddit" loading="lazy" className="w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 3. MARKET ANALYSIS ── */}
            <Reveal>
                <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>Market Analysis</FigmaHighlight>
                        </h3>
                        <div className="h-px bg-black/[0.08] grow"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">Competitive Landscape</h4>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            To better understand the landscape, we analyzed existing apps that cater to outdoor adventurers. Here's how they compare.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* AllTrails */}
                        <div className="flex flex-col md:flex-row border-0 rounded-3xl overflow-hidden bg-[#FBFBFB] shadow-none transition-shadow">
                            <div className="md:w-1/4 p-6 sm:p-8 flex items-center justify-start md:justify-center bg-[#FBFBFB] border-0">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12">
                                        <img src={alltrails} alt="AllTrails" loading="lazy" className="w-full h-full rounded-lg object-contain" />
                                    </div>
                                    <span className="font-semibold text-[17px] sm:text-[18px] text-[#171A22] tracking-wide">AllTrails</span>
                                </div>
                            </div>
                            <div className="md:w-3/4 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="flex flex-col gap-2.5">
                                    <h5 className="font-semibold text-[15px] sm:text-[16px] text-[#171A22]">Key Features</h5>
                                    <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#168BEB]">
                                        <li>Huge trail database with reviews.</li>
                                        <li>GPS tracking & offline maps.</li>
                                        <li>Filters for difficulty, length, elevation.</li>
                                        <li>User-uploaded trail photos & reviews.</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <h5 className="font-semibold text-[15px] sm:text-[16px] text-[#171A22]">Drawbacks</h5>
                                    <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#888]">
                                        <li>Lacks collaborative trip-planning features.</li>
                                        <li>Limited personalization for adventure recommendations.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Gaia GPS */}
                        <div className="flex flex-col md:flex-row border-0 rounded-3xl overflow-hidden bg-[#FBFBFB] shadow-none transition-shadow">
                            <div className="md:w-1/4 p-6 sm:p-8 flex items-center justify-start md:justify-center bg-[#FBFBFB] border-0">
                                <div className="flex justify-center items-center gap-3">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12">
                                        <img src={gaiagps} alt="Gaia GPS" loading="lazy" className="w-full h-full object-contain rounded-lg" />
                                    </div>
                                    <span className="font-semibold text-[17px] sm:text-[18px] text-[#171A22] tracking-wide">Gaia GPS</span>
                                </div>
                            </div>
                            <div className="md:w-3/4 p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                <div className="flex flex-col gap-2.5">
                                    <h5 className="font-semibold text-[15px] sm:text-[16px] text-[#171A22]">Key Features</h5>
                                    <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#168BEB]">
                                        <li>Detailed topo & satellite maps.</li>
                                        <li>Custom route planning.</li>
                                        <li>Offline maps for remote trips.</li>
                                        <li>Works with CarPlay & Android Auto.</li>
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                    <h5 className="font-semibold text-[15px] sm:text-[16px] text-[#171A22]">Drawbacks</h5>
                                    <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#888]">
                                        <li>Steep learning curve for new users.</li>
                                        <li>Interface feels cluttered with advanced tools.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 4. INSIGHTS / USER PERSONA ── */}
            <Reveal>
                <div className="flex flex-col gap-8 md:gap-10">
                    <div className="flex items-center gap-4">
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>Insights</FigmaHighlight>
                        </h3>
                        <div className="h-px bg-black/[0.08] grow"></div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">User Persona</h4>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            To ground design decisions in user workflows, I synthesized research findings into two core archetypes reflecting distinct experience levels, planning habits, and on-trail requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:gap-10 mt-2">
                        {/* Persona 1 */}
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start bg-[#FBFBFB] p-7 sm:p-9 md:p-10 rounded-3xl md:rounded-4xl border-0 shadow-none">
                            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] shrink-0 rounded-full bg-white overflow-hidden shadow-none border-0">
                                <img src={persona1} alt="Emily Carter" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-[#171A22]">Emily Carter, 27</h4>
                                    <div className="flex flex-col gap-1.5 mt-2 text-[13.5px] sm:text-[14px] text-[#596272]">
                                        <p className="flex items-center gap-2 flex-wrap">
                                            <span>💼</span> <span className="font-medium text-[#171A22]">Marketing Specialist</span>
                                            <span className="text-black/20 mx-1">|</span>
                                            <span>📍</span> <span className="font-medium text-[#171A22]">Denver, CO</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span>🤍</span> <span className="font-medium text-[#171A22]">Interests: Hiking, backpacking, solo adventures</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[14px] sm:text-[15px] text-[#3F4856] leading-relaxed italic bg-white p-4 rounded-2xl border-0 shadow-none">
                                    "A 27-year-old marketing professional who loves weekend hikes but struggles with trip planning and finding companions. She needs a simple way to organize adventures and meet fellow explorers."
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold">Needs</h5>
                                        <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#168BEB]">
                                            <li>Find nearby spots</li>
                                            <li>Discover new getaways</li>
                                            <li>Plan trips easily</li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold">Challenges</h5>
                                        <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#888]">
                                            <li>Hard to find good hiking spots</li>
                                            <li>Trip planning feels complicated</li>
                                            <li>Wants to meet fellow adventurers</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Persona 2 */}
                        <div className="flex flex-col md:flex-row-reverse gap-8 items-center md:items-start bg-[#FBFBFB] p-7 sm:p-9 md:p-10 rounded-3xl md:rounded-4xl border-0 shadow-none">
                            <div className="w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] shrink-0 rounded-full bg-white overflow-hidden shadow-none border-0">
                                <img src={persona2} alt="Jake Miller" loading="lazy" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col gap-4 w-full">
                                <div>
                                    <h4 className="text-2xl sm:text-3xl font-semibold text-[#171A22]">Jake Miller, 34</h4>
                                    <div className="flex flex-col gap-1.5 mt-2 text-[13.5px] sm:text-[14px] text-[#596272]">
                                        <p className="flex items-center gap-2 flex-wrap">
                                            <span>💼</span> <span className="font-medium text-[#171A22]">Software Engineer</span>
                                            <span className="text-black/20 mx-1">|</span>
                                            <span>📍</span> <span className="font-medium text-[#171A22]">Seattle, WA</span>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span>🤍</span> <span className="font-medium text-[#171A22]">Interests: Group camping, road trips, kayaking</span>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-[14px] sm:text-[15px] text-[#3F4856] leading-relaxed italic bg-white p-4 rounded-2xl border-0 shadow-none">
                                    "A 34-year-old software engineer who enjoys group trips but struggles with planning. He needs an easy way to organize and track adventures."
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold">Needs</h5>
                                        <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#168BEB]">
                                            <li>Plan trips effortlessly with friends</li>
                                            <li>Keep all trip details organized</li>
                                            <li>Find adventure spots for your group</li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h5 className="text-[11.5px] uppercase tracking-wider text-[#717680] font-semibold">Challenges</h5>
                                        <ul className="list-disc pl-5 text-[13.5px] sm:text-[14px] text-[#596272] space-y-1.5 marker:text-[#888]">
                                            <li>Planning with friends is messy</li>
                                            <li>Hard to find spots for all skill levels</li>
                                            <li>No way to track past trips</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 5. IDEATION & DESIGN ── */}
            <div className="flex flex-col gap-14 sm:gap-18 md:gap-24">
                <Reveal>
                    <div className="flex flex-col gap-6 md:gap-8">
                        <div className="flex items-center gap-4">
                            <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                                <FigmaHighlight>Ideation & Design</FigmaHighlight>
                            </h3>
                            <div className="h-px bg-black/[0.08] grow"></div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">Moodboard</h4>
                            <img src={moodboard} alt="Moodboard" loading="lazy" className="w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                        </div>
                    </div>
                </Reveal>

                {/* USER FLOW */}
                <Reveal>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">User Flow</h4>
                        <img src={userFlow} alt="User Flow" loading="lazy" className="w-full h-auto rounded-2xl md:rounded-3xl object-contain" />
                    </div>
                </Reveal>

                {/* LOW-FIDELITY */}
                <Reveal>
                    <div className="flex flex-col gap-4">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">Low-Fidelity</h4>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            These low-fidelity sketches helped explore initial ideas and layouts, allowing for quick iterations before moving to higher fidelity designs. They served as a foundation for refining the user flow and interface.
                        </p>
                        <div className="flex flex-col items-start md:flex-row md:items-center gap-4 md:gap-10 mt-3">
                            <h4 className="md:w-1/3 text-2xl sm:text-3xl font-semibold text-[#171A22] leading-tight">Sketches</h4>
                            <img src={lowFidelity} alt="Sketches" loading="lazy" className="md:w-2/3 w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                        </div>
                    </div>
                </Reveal>

                {/* WIREFRAMES */}
                <Reveal>
                    <div className="flex flex-col-reverse items-start md:flex-row md:items-center gap-4 md:gap-10 mt-2">
                        <img src={wireframes} alt="Wireframes" loading="lazy" className="md:w-3/4 w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                        <div className="md:w-1/4 flex justify-start">
                            <h4 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#171A22]">Wireframes</h4>
                        </div>
                    </div>
                </Reveal>

                {/* HIGH-FIDELITY */}
                <Reveal>
                    <div className="flex flex-col gap-6 md:gap-8">
                        <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">High-Fidelity</h4>
                        <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                            As the design took shape, I focused on crafting a seamless and engaging experience that balances aesthetics with functionality. Taking subtle inspiration from apps like AllTrails and Gaia GPS, I refined the interface to enhance navigation and trip planning, ensuring it meets the needs of outdoor adventurers.
                        </p>
                        <img src={highFidelity} alt="High Fidelity" loading="lazy" className="w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                    </div>
                </Reveal>

                {/* EMPTY STATE */}
                <Reveal>
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="md:w-1/2 flex flex-col gap-4">
                            <h4 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#171A22] tracking-tight leading-tight">Empty State</h4>
                            <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                                Empty states play a crucial role in guiding users when there's no data to display. I designed them to be informative yet visually engaging, ensuring users understand what to do next.
                            </p>
                        </div>
                        <img src={emptystate} alt="Empty State" loading="lazy" className="md:w-1/2 w-full h-auto rounded-3xl md:rounded-4xl object-cover" />
                    </div>
                </Reveal>
            </div>

            <EditorialDivider />

            {/* ── 6. KEY SCREENS ── */}
            <Reveal>
                <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>Key Screens</FigmaHighlight>
                        </h3>
                        <div className="h-px bg-black/[0.08] grow"></div>
                    </div>
                    <p className="text-[15px] sm:text-[16px] text-[#596272] leading-relaxed max-w-[800px]">
                        Here are some of the most essential screens from the app, showcasing the core user experience and design choices. Each screen is crafted to ensure a seamless and intuitive journey for adventure seekers.
                    </p>
                    <img src={keyScreens} alt="Key Screens" loading="lazy" className="w-full h-auto rounded-2xl md:rounded-3xl object-cover" />
                </div>
            </Reveal>

            <EditorialDivider />

            {/* ── 7. CONCLUSION ── */}
            <Reveal>
                <div className="flex flex-col gap-6 md:gap-8">
                    <div className="flex items-center gap-4">
                        <h3 className="type-metadata font-semibold tracking-wider text-[#777] uppercase">
                            <FigmaHighlight>Conclusion</FigmaHighlight>
                        </h3>
                        <div className="h-px bg-black/[0.08] grow"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 py-4">
                        <div className="flex flex-col gap-2.5">
                            <h4 className="text-xl sm:text-2xl font-semibold text-[#171A22]">Key Reflection</h4>
                            <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Designing Wander highlighted the importance of balancing rich trail data with clarity on the go. When people are navigating unfamiliar outdoor environments, interfaces must prioritize rapid orientation, offline accessibility, and uncluttered wayfinding over unnecessary feature density.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2.5">
                            <h4 className="text-xl sm:text-2xl font-semibold text-[#171A22]">Future Directions</h4>
                            <p className="text-[14px] sm:text-[15px] text-[#596272] leading-relaxed">
                                Further iterations would focus on rigorous field testing in low-connectivity areas, optimizing emergency trail beaconing, and refining community verification systems for real-time trail hazards.
                            </p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
