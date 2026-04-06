"use client";

import { ContentSection } from "@/components";
import { ITechnology } from "@/features/technology/technology.type";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import { IProject } from "@/features/projects/project.types";

type CompanyGroup = {
    company: IProject["company"];
    projects: IProject[];
};

type GroupedProjects = Record<string, CompanyGroup>;

interface ExperienceSectionProps {
    projects: IProject[];
}

function CompanyBlock({ group }: { group: CompanyGroup }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">

            {/* IZQUIERDA → EMPRESA */}
            <div className="flex flex-col gap-4">

                {/* Logo */}
                {group.company?.imgUrl ? (
                    <div className="flex w-full items-center justify-between">
                        <Image
                            src={group.company.imgUrl}
                            alt={group.company.title}
                            width={60}
                            height={60}
                        />
                        <span className="text-[0.7rem] text-secondary tracking-widest uppercase">
                            {group.projects.length} proyecto(s)
                        </span>
                    </div>

                ) : (
                    <div className="w-14 h-14 flex items-center justify-center border border-secondary text-primary text-sm">
                        {group.company?.title?.slice(0, 2).toUpperCase()}
                    </div>
                )}

                {/* Nombre */}
                <h3 className="font-cinzel text-xl italic">
                    {group.company?.title || "Experiencia independiente"}
                </h3>

                {/* Rol (puedes hacerlo dinámico luego) */}
                <span className="text-xs text-primary tracking-widest uppercase">
                    Full Stack Developer
                </span>

                {/* Descripción empresa */}
                {group.company?.description && (
                    <p className="text-secondary text-[12px] leading-relaxed">
                        {group.company.description}
                    </p>
                )}
            </div>

            <div className="flex flex-col gap-6">
                {group.projects
                    .sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    )
                    .map((project) => (
                        <div
                            key={project.id}
                            className="relative p-6 rounded-md 
             bg-linear-to-b from-background/80 to-background/40
             border border-secondary/30
             hover:border-primary/50
             transition-all duration-300
             group overflow-hidden"
                        >

                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
                  bg-linear-to-r from-primary/5 via-transparent to-primary/5 pointer-events-none" />

                            <div className="flex items-center gap-2 mb-3 opacity-60">
                                <div className="flex-1 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
                                <div className="w-2 h-2 rotate-45 bg-primary" />
                                <div className="flex-1 h-px bg-linear-to-r from-transparent via-secondary to-transparent" />
                            </div>

                            {/* Header */}
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-cinzel text-lg">
                                    {project.title}
                                </h4>

                                {project.featured && (
                                    <span className="text-[0.6rem] text-primary border border-primary px-2 py-0.5 uppercase">
                                        Destacado
                                    </span>
                                )}
                            </div>

                            {/* Descripción */}
                            <p className="text-secondary text-sm mb-3">
                                {project.description}
                            </p>

                            {/* Tecnologías */}
                            {(project.technologies && project.technologies?.length > 0) && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {project.technologies.map((tech: ITechnology) => (
                                        <span
                                            key={tech.id}
                                            className="text-[0.6rem] border border-secondary px-2 py-0.5 text-secondary uppercase"
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Links */}
                            <div className="flex gap-4">
                                {project.repoUrl && (
                                    <a
                                        href={project.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-secondary hover:text-primary flex items-center gap-1"
                                    >
                                        <FaGithub size={12} />
                                        Repo
                                    </a>
                                )}

                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-secondary hover:text-primary flex items-center gap-1"
                                    >
                                        <FaExternalLinkAlt size={10} />
                                        Live
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export function ExperienceSection({ projects }: ExperienceSectionProps) {

    const grouped = projects.reduce<GroupedProjects>((acc, project) => {
        const key = project.company?.title || "Otros";

        if (!acc[key]) {
            acc[key] = {
                company: project.company,
                projects: [],
            };
        }

        acc[key].projects.push(project);
        return acc;
    }, {});

    const sortedGroups = Object.values(grouped).sort((a, b) => {
        const idA = a.company?.id ?? 0;
        const idB = b.company?.id ?? 0;

        return idB - idA;
    });

    return (
        <ContentSection className="flex flex-col gap-12">
            {/* EMPRESAS */}
            <div className="flex flex-col gap-16">
                {sortedGroups.map((group, idx) => (
                    <CompanyBlock key={idx} group={group} />
                ))}
            </div>

        </ContentSection>
    );
}