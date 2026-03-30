

interface useLoginResponse {
    logoutSession: () => Promise<void>;
}

export const useLogout = (): useLoginResponse => {

    const logoutSession = async () => {
        try {

            await fetch("/api/logout", { method: "POST" });
            window.location.href = "/login";

        } catch (err) {

            throw err;

        }
    };

    return { logoutSession };

}