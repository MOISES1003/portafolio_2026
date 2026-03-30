import { LoginData } from "@/features/login";
import { AuthRepository } from "../repositories/auth.repository";

const repository = new AuthRepository();

export const loginUseCase = ({email,password}:LoginData) =>
  repository.login({email, password});

export const logoutUseCae = ()=> repository.logout