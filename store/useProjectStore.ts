import { IProject } from "@/features/projects/project.types";
import { create } from "zustand";

interface ProjectState {
    projects: IProject[];
    setProjects: (projects: IProject[]) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    addProject: (project: IProject) => void;
    updateProjectInStore: (project: IProject) => void;
    removeProject: (projectId: number) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
    projects: [],
    isLoading: false,
    setProjects: (projects) => set({ projects }),
    setIsLoading: (loading) => set({ isLoading: loading }),
    addProject: (project) => {
        set((state) => ({ projects: [...state.projects, project] }));
    },
    updateProjectInStore: (project) => {
        set((state) => ({
            projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        }));
    },
    removeProject: (projectId) => {
        set((state) => ({
            projects: state.projects.filter((p) => p.id !== projectId),
        }));
    },
}));