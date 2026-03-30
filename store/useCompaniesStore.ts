import { ICompanies } from "@/features/companies/companies.type";
import { create } from "zustand";

interface CompaniesState {
  companies: ICompanies[];
  setCompanies: (companies: ICompanies[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  addCompany: (company: ICompanies) => void;
  updateCompanyInStore: (company: ICompanies) => void;
}

export const useCompaniesStore = create<CompaniesState>((set) => ({
  companies: [],
  isLoading: false,
  setCompanies: (companies) => set({ companies }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  addCompany: (company) =>
    set((state) => ({ companies: [...state.companies, company] })),
  updateCompanyInStore: (company) =>
    set((state) => ({
      companies: state.companies.map((c) =>
        c.id === company.id ? company : c
      ),
    })),
}));