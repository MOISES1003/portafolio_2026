"use client";

import { useEffect, useState } from "react";
import { ITechnology } from "@/features/technology/technology.type";
import { createProjectTechnologyApi } from "@/features/projectTechnology/api";
import { showInfo } from "@/utils/alerts";
import { toast } from "sonner";
import { useQueryClient } from "react-query";


interface ProjectTechnologiesFormProps {
    projectId: number;
    tecnologiesByProject: number[];
    technologies: ITechnology[];
    onClose: () => void; // opcional, para cerrar modal o refrescar tabla
}

export default function ProjectTechnologiesForm({
    projectId,
    technologies,
    onClose,
    tecnologiesByProject
}: ProjectTechnologiesFormProps) {
    const [selectedTechIds, setSelectedTechIds] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const client = useQueryClient();

    const handleToggle = (techId: number) => {
        setSelectedTechIds((prev) =>
            prev.includes(techId) ? prev.filter((id) => id !== techId) : [...prev, techId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedTechIds.length === 0) return showInfo("Seleccione al menos una tecnología");

        setLoading(true);
        try {
            await createProjectTechnologyApi({
                projectId,
                technologies: selectedTechIds,
            });
            await client.invalidateQueries("queryProjects");
            toast.success("Tecnologías asignadas correctamente");
            onClose();
        } catch (error) {
            console.error(error);
            toast.error("Error al asignar tecnologías");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setSelectedTechIds(tecnologiesByProject);
    }, [tecnologiesByProject]);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <label className="font-semibold">Selecciona Tecnologías</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto border rounded p-2">
                {technologies.map((tech) => (
                    <label key={tech.id} className="flex items-center gap-2 p-1 hover:bg-gray-100 rounded">
                        <input
                            type="checkbox"
                            value={tech.id}
                            checked={selectedTechIds.includes(tech.id)}
                            onChange={() => handleToggle(tech.id)}
                        />
                        <span>{tech.name}</span>
                    </label>
                ))}
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors ${loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
            >
                {loading ? "Guardando..." : "Asignar Tecnologías"}
            </button>
        </form>
    );
}