import { useQuery } from "react-query";
import { IProject } from "../project.types";
import { fetchProjects } from "../api";
import { useProjectStore } from "@/store";
import { useEffect } from "react";
import { toast } from "sonner";


export const useQueryProjects = () => {

    const { setProjects, setIsLoading } = useProjectStore();

    const { isLoading } = useQuery<IProject[], unknown>(
        ["queryProjects"],
        () => fetchProjects(),
        {
            staleTime: 1000 * 60 * 5,
            onSuccess: (data) => {
                setProjects(data);
            },
            onError: (err) => {
                toast.error("Error al obtener los proyectos");
                console.error("Error al obtener los proyectos:", err);
            },
        }
    );
    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);
};