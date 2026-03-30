import { CompanyFormData } from "../companies.type";
import { CompaniesRepository } from "../repositories/companies.repository";

const repository = new CompaniesRepository();

export async function getCompanies() {
    const companies = await repository.findCompanies();
    return companies;
}

export async function createCompany(data: CompanyFormData) {
    return repository.createCompany(data);
}

export async function updatedCompany(id: number, data: CompanyFormData) {
    return repository.updateCompany(id, data);
}
