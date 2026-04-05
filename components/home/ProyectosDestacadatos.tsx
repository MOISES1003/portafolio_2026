"use client";
import { useProjectStore } from "@/store";
import { ProjectCardTop } from "./ProjectCardTop";
import { HeaderSection } from "../HeaderSection";
import { ContentSection } from "../ContentSection";

export function ProyectosDestacadatos() {
    const { projects } = useProjectStore();

    return (
        <ContentSection className="flex flex-col gap-10">
            <HeaderSection label="Proyectos Destacados" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    projects
                        .filter((p) => p.featured)
                        .map((p) => (
                            <ProjectCardTop key={p.id} project={p} />
                        ))
                }
            </div>
        </ContentSection>
    )
}