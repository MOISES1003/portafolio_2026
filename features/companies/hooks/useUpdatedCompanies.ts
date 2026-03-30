import { useMutation } from "react-query";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { Dispatch, SetStateAction } from "react";
import { ICompanies, UpdateCompanyPayload } from "../companies.type";
import { updateCompany } from "../api/api";
import { useCompaniesStore } from "@/store";
import { toast } from "sonner";

interface IInsertProjectResult {
    handleUpdatedCompany: (payload: UpdateCompanyPayload) => void;
    isLoadingUpdated: boolean;
    error: unknown;
}
interface IInsertProjectResultProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useUpdatedProject = ({ setOpenModal }: IInsertProjectResultProps): IInsertProjectResult => {
    const { updateCompanyInStore } = useCompaniesStore();
    const { msAll, msCompanies } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<ICompanies, unknown, UpdateCompanyPayload>(
        ({ id, data }) => updateCompany(id, data),
        {
            onSuccess: async (data) => {
                // Refresca automáticamente la lista
                updateCompanyInStore(data);
                setOpenModal(false);
                toast.success(msCompanies.successUpdated)
            },
            onError: (err) => {
                toast.error(msCompanies.errorUpdated)
                console.error("Error al actualizar la empresa:", err);
            },
        }
    );

    const handleUpdatedCompany = async (updatedCompany: UpdateCompanyPayload) => {
        const isConfirmed = await showConfirm({
            title: msAll.update,
            text: msCompanies.updated
        })

        if (!isConfirmed) return;

        mutate(updatedCompany);
    }

    return {
        handleUpdatedCompany,
        isLoadingUpdated: isLoading,
        error,
    };
};
