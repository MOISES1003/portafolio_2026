import { useMutation } from "react-query";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { Dispatch, SetStateAction } from "react";
import { CompanyFormData, ICompanies } from "../companies.type";
import { insertCompany } from "../api/api";
import { useCompaniesStore } from "@/store";
import { toast } from "sonner";

interface IInsertProjectResult {
    handleInsertCompany: (project: CompanyFormData) => void;
    isLoadingInsert: boolean;
    error: unknown;
}

interface IInsertProjectProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useInsertCompanies = ({ setOpenModal }: IInsertProjectProps): IInsertProjectResult => {
    const { addCompany } = useCompaniesStore();

    const { msAll, msCompanies } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<ICompanies, unknown, CompanyFormData>(
        (newCompany) => insertCompany(newCompany),
        {
            onSuccess: async (data) => {
                console.log("Empresa creada:", data);
                addCompany(data);
                setOpenModal(false);
                toast.success(msCompanies.success)
            },
            onError: (err) => {
                toast.error(msCompanies.error)
                console.error(msCompanies.error, err);
            },
        }
    );

    const handleInsertCompany = async (newCompany: CompanyFormData) => {
        const isConfirmed = await showConfirm({
            title: msAll.insert,
            text: msCompanies.insert
        })

        if (!isConfirmed) return;

        mutate(newCompany);
    }

    return {
        handleInsertCompany: handleInsertCompany,
        isLoadingInsert: isLoading,
        error
    };
};
