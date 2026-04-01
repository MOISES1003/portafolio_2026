import { Dispatch, SetStateAction } from "react";
import { ITechnology, TechnologyFormData } from "../technology.type";
import { useMutation, useQueryClient } from "react-query";
import { alertMessages } from "@/utils/alertMessages";
import { showConfirm } from "@/utils/alerts";
import { insertTechnology } from "../api";
import { toast } from "sonner";

interface IInsertTechnologyResult {
    handleInsertTechnology: (technology: TechnologyFormData) => void;
    isLoadingInsert: boolean;
    error: unknown;
}

interface IInsertTechnologyProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useInsertTechnology = ({ setOpenModal }: IInsertTechnologyProps): IInsertTechnologyResult => {
    const client = useQueryClient();
    const { msAll, msTechnology } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<ITechnology, unknown, TechnologyFormData>(
        (newTechnology) => insertTechnology(newTechnology),
        {
            onSuccess: async (data) => {
                console.log("Tecnología creada:", data);
                setOpenModal(false);
                toast.success(msTechnology.success)
                client.invalidateQueries("queryTechnologies");
            },
            onError: (err) => {
                toast.error(msTechnology.error)
                console.error(msTechnology.error, err);
            },
        }
    );

    const handleInsertTechnology = async (newCompany: TechnologyFormData) => {
        const isConfirmed = await showConfirm({
            title: msAll.insert,
            text: msTechnology.insert
        })

        if (!isConfirmed) return;

        mutate(newCompany);
    }

    return {
        handleInsertTechnology: handleInsertTechnology,
        isLoadingInsert: isLoading,
        error
    };

}