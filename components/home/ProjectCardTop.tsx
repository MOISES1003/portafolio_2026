import { IProject } from "@/features/projects/project.types";
import Image from "next/image";
interface ProjectCardProps {
    project: IProject;

}

export function ProjectCardTop({ project }: ProjectCardProps) {

    return (
        <div className="relative group border border-white/10 hover:bg-white/5 p-6 flex flex-col gap-6 hover:border-primary/40 transition-all duration-300 ease-in-out cursor-pointer opacity-70 hover:opacity-100">

            {/* Esquinas decorativas */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/60" />

            {/* Header */}
            <div className="flex justify-between items-center h-10">
                <Image
                    height={70}
                    width={70}
                    src={project.company?.imgUrl || ""}
                    alt={project.company?.title || "Company Logo"}
                />

                <p className="text-xs tracking-widest text-secondary font-mono">
                    {project.company?.title}
                </p>
            </div>

            {/* Contenido */}
            <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-2xl font-headline ">
                    {project.title}
                </h3>
                <p className="text-sm leading-relaxed text-third font-body">
                    {project.description}
                </p>
            </div>

            {/* Footer */}
            <div className="border-t border-white/10">
                <span className="text-xs tracking-widest text-third/60 font-mono">
                    {project.technologies?.map((tech) => tech.name).join(" | ") || "No technologies specified"}
                </span>
            </div>
        </div>
    );
}