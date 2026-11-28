export default function ExperienceHistory() {
    const experiences = [
        { role: "UI/UX Designer", company: "ITProfound Inc.", period: "June 2025 - Present" },
        { role: "UI/UX Design Intern", company: "Binoric Inc.", period: "Aug 2024 - Dec 2024" },
        { role: "UI/UX Design Intern", company: "Malayala Manorama", period: "July 2024 - Aug 2024" },
    ];

    return (
        <div className="w-full flex flex-col mt-14 md:mt-18">
            {/* ── Section Heading ── */}
            <div className="mb-5 md:mb-6">
                <h3 className="type-card-heading text-[#1A1A1A]">
                    Work Experience
                </h3>
            </div>

            <div className="flex flex-col w-full divide-y divide-[#EAEAEA]">
                {experiences.map((exp, index) => (
                    <div
                        key={index}
                        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center ${index === 0 ? "pb-4 md:pb-5" : "py-4 md:py-5"
                            } gap-1 sm:gap-0 group`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                            <span className="type-card-heading text-[18px] md:text-[19px] font-regular text-[#1A1A1A] group-hover:text-black transition-colors">
                                {exp.company}
                            </span>
                            <span className="type-metadata text-[#596272]">
                                {exp.role}
                            </span>
                        </div>

                        <span className="text-[15px] sm:text-[16px] font-medium text-[#596272]">
                            {exp.period}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
