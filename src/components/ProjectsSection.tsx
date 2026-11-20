import ProjectCard from "./ProjectCard";
import FigmaHighlight from "./FigmaHighlight";
import ShowreelVideo from "../assets/videos/Showreel-Grid-Mobile-[remix] (1).mp4";
import DribbbleShot from "../assets/videos/Dribbble-shot.mp4";

const PROJECTS = [
    {
        id: "staytransit",
        title: "StayTransit",
        category: "Product Design · Marketplace & Web / Mobile Apps",
        description: "Designing airport services around a traveller’s time. Making airport experiences easier to discover and book across lounges, stays, spas and transit services.",
        mediaUrl: undefined,
        isVideo: false,
    },
    {
        id: "tumbledry",
        title: "Tumbledry",
        category: "Product Design · Mobile App",
        description: "Redesigning the laundry pickup experience with transparent service selection, upfront pricing and order tracking.",
        mediaUrl: ShowreelVideo,
        isVideo: true,
    },
    {
        id: "wander",
        title: "Wander",
        category: "Product Design · Mobile App",
        description: "An outdoor adventure app helping enthusiasts discover trails, plan custom itineraries and coordinate trips.",
        mediaUrl: DribbbleShot,
        isVideo: true,
    },
];

export default function ProjectsSection() {
    return (
        <div className="w-full max-w-[800px] mx-auto">
            {/* ── Section Heading ── */}
            <div className="mb-5 md:mb-6">
                <h2 className="type-primary-section-heading">
                    <FigmaHighlight>Selected Works</FigmaHighlight>
                </h2>
            </div>

            {/* ── 1 Work per Row (800 x 500 Cards) ── */}
            <div className="flex flex-col gap-16 md:gap-24 w-full">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={index} {...project} />
                ))}
            </div>
        </div>
    );
}
