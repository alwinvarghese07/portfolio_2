interface ProjectCardProps {
    title: string;
    category?: string;
    description: string;
    tags?: string[];
    mediaUrl?: string;
    isVideo?: boolean;
    id?: string;
}

import { Link } from "react-router-dom";

export default function ProjectCard({
    title,
    category,
    description,
    mediaUrl,
    isVideo = false,
    id
}: ProjectCardProps) {
    const CardContent = (
        <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto border-0 outline-none">
            {/* 1. Media Container — 800 x 500, surface card bg #FAFAFA, borderless & shadowless */}
            <div className="w-full max-w-[800px] aspect-[16/10] h-[260px] sm:h-[380px] md:h-[500px] mx-auto bg-[#FAFAFA] rounded-[22px] md:rounded-[26px] overflow-hidden relative border-0 outline-none ring-0 shadow-none">
                {mediaUrl ? (
                    isVideo ? (
                        <video
                            src={mediaUrl}
                            width={800}
                            height={500}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover rounded-[22px] md:rounded-[26px] border-0 outline-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                        />
                    ) : (
                        <img
                            src={mediaUrl}
                            alt={title}
                            width={800}
                            height={500}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover rounded-[22px] md:rounded-[26px] border-0 outline-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                        />
                    )
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#FAFAFA] rounded-[22px] md:rounded-[26px] text-zinc-400">
                        <span className="type-caption uppercase tracking-widest">Preview Coming Soon</span>
                    </div>
                )}
            </div>

            {/* 2. Content Container: Title -> Category -> Description */}
            <div className="flex flex-col gap-1.5 px-1 w-full max-w-[800px] mx-auto border-0 outline-none">
                {/* 1. Project Title — Card Heading */}
                <div className="flex items-center gap-2">
                    <h3 className="type-card-heading text-[#1A1A1A] group-hover:text-black transition-colors">
                        {title}
                    </h3>
                    <span className="text-[#999] group-hover:text-[#1A1A1A] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[18px]" aria-hidden="true">
                        ↗
                    </span>
                </div>

                {/* 2. Category / Year — Metadata */}
                {category && (
                    <span className="type-metadata text-[#888]">
                        {category}
                    </span>
                )}

                {/* 3. Short Project Description — Body */}
                <p className="type-body text-[#555] max-w-[700px] mt-0.5">
                    {description}
                </p>
            </div>
        </div>
    );

    if (id) {
        return (
            <Link to={`/case-study/${id}`} className="group cursor-pointer block w-full border-0 outline-none focus:outline-none focus:ring-0 active:scale-[0.995] transition-transform duration-200">
                {CardContent}
            </Link>
        );
    }

    return (
        <div className="group block w-full border-0 outline-none">
            {CardContent}
        </div>
    );
}
