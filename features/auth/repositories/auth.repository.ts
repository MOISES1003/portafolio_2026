import { LoginData } from "@/features/login";
import { supabase } from "@/lib/supabase/browser";

export class AuthRepository {
    async login({ email, password }: LoginData) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;
        return data;
    }

    async logout() {
        await supabase.auth.signOut({ scope: "global" });
    }
}