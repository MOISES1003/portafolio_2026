import { useMutation } from "react-query";
import { insertProject } from "../api";
import { showConfirm } from "@/utils/alerts";
import { alertMessages } from "@/utils/alertMessages";
import { Dispatch, SetStateAction } from "react";
import { IProject, ProjectFormData } from "../project.types";
import { useProjectStore } from "@/store";
import { toast } from "sonner";

interface IInsertProjectResult {
    handleInsertProject: (project: ProjectFormData) => void;
    isLoadingInsert: boolean;
    error: unknown;
}

interface IInsertProjectProps {
    setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export const useInsertProject = ({ setOpenModal }: IInsertProjectProps): IInsertProjectResult => {
    const { addProject } = useProjectStore();

    const { msAll, msProjects } = alertMessages;

    const {
        mutate,
        isLoading,
        error,
    } = useMutation<IProject, unknown, ProjectFormData>(
        (newProject) => insertProject(newProject),
        {
            onSuccess: async (data) => {
                addProject(data);
                setOpenModal(false);
                toast.success(msProjects.success);
            },
            onError: (err) => {
                toast.error(msProjects.error);
                console.error(msProjects.error, err);
            },
        }
    );

    const handleInsertProject = async (newProject: ProjectFormData) => {
        const isConfirmed = await showConfirm({
            title: msAll.insert,
            text: msProjects.insert
        })

        if (!isConfirmed) return;

        mutate(newProject);
    }

    return {
        handleInsertProject: handleInsertProject,
        isLoadingInsert: isLoading,
        error
    };
};
