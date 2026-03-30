import { useState } from "react";
import { LoginData } from "../../login/login.types";
import { loginSchema } from "../../login/schemas";
import { loginUseCase } from "@/features/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { IUser } from "../auth.type";

interface useLoginResponse {
    login: (data: LoginData) => Promise<void>;
    loading: boolean;
}

export const useLogin = (): useLoginResponse => {
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);
    const [loading, setLoading] = useState(false);

    const login = async (data: LoginData) => {
        try {
            loginSchema.parse(data);
            setLoading(true);

            const result = await loginUseCase(data);

            const userData: IUser = {
                id: result.user.id,
                email: result.user.email || "", // si es undefined, ponemos ""
                role: result.user.role || "",
            };

            setUser(userData, result.session.access_token || "");
            
            router.push("/admin/");

        } catch (err) {

            throw err;

        } finally {
            setLoading(false);
        }
    };

    return { login, loading };

}