import { useQuery } from "react-query";
import { fecthTechnologies } from "../api";
import { ITechnology } from "../technology.type";
import { toast } from "sonner";

export interface useQueryTechnologyResult {
    technologyData: ITechnology[];
    isLoading: boolean;
    error: string;
}

export const useQueryTechnology = () => {
    const { data, error, isLoading } = useQuery<ITechnology[], unknown>(
        ["queryTechnologies"],
        () => fecthTechnologies(),
        {
            staleTime: 1000 * 60 * 5,
            onError: (err) => {
                console.error("Error al obtener las tecnologías:", err);
                toast.error("Error al obtener las tecnologías")
            },
        }
    );
    return {
        technologyData: data || [],
        isLoading,
        error: error,
    }

}