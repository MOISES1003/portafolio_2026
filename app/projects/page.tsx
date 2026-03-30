"use client";

import { useProjectStore } from "@/store";

export default function PageProjects() {
  const { projects, isLoading } = useProjectStore();
    if (isLoading) return <p className="text-white">Cargando...</p>;
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black text-white">
            {projects && projects.length > 0 ? (
                projects.map((p) => (
                    <div key={p.id}>{p.title}</div>
                ))
            ) : (
                <p className="text-white">No hay proyectos</p>
            )}
        </div>

    )
}