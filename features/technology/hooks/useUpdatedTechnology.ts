import { Dispatch, SetStateAction } from "react";
import { ITechnology, UpdateTechnologyPayload } from "../technology.type";
import { alertMessages } from "@/utils/alertMessages";
import { updateTechnology } from "../api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "react-query";
import { showConfirm } from "@/utils/alerts";

interface IUpdatedTechnologyResult {
    handleUpdatedTechnology: (payload: UpdateTechnologyPayload) => void;
    isLoadingUpdated: boolean;
    error: unknown;
}
interface IUpdatedTechnologyProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useUpdatedTechnology = ({ setOpenModal }: IUpdatedTechnologyProps): IUpdatedTechnologyResult => {
    const client = useQueryClient();
    const { msAll, msTechnology } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<ITechnology, unknown, UpdateTechnologyPayload>(
        ({ id, data }) => updateTechnology(id, data),
        {
            onSuccess: async (data) => {
                console.log("Tecnología actualizada:", data);
                // Refresca automáticamente la lista
                setOpenModal(false);
                toast.success(msTechnology.successUpdated)
                client.invalidateQueries("queryTechnologies");
            },
            onError: (err) => {
                toast.error(msTechnology.errorUpdated)
                console.error("Error al actualizar la tecnología:", err);
            },
        }
    );

    const handleUpdatedTechnology = async (updatedTechnology: UpdateTechnologyPayload) => {
        const isConfirmed = await showConfirm({
            title: msAll.update,
            text: msTechnology.updated
        })

        if (!isConfirmed) return;

        mutate(updatedTechnology);
    }


    return {
        handleUpdatedTechnology,
        isLoadingUpdated: isLoading,
        error,
    };

}