import { useQuery } from "react-query";
import { fetchCompanies } from "../api/api";
import { ICompanies } from "../companies.type";
import { useCompaniesStore } from "@/store";
import { useEffect } from "react";

interface useQueryCompaniesResult {
    isLoading: boolean;
}


export const useQueryCompanies = (): useQueryCompaniesResult => {

    const { setCompanies, setIsLoading } = useCompaniesStore();

    const { isLoading } = useQuery<ICompanies[], unknown>(
        ["queryCompanies"],
        () => fetchCompanies(),
        {
            staleTime: 1000 * 60 * 5,
            onSuccess: (data) => {
                setCompanies(data);
            },
            onError: (err) => {
                console.error("Error al obtener las empresas:", err);
            },
        }
    );

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);

    return {
        isLoading
    }
};