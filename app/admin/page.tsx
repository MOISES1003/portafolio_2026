import { requireSession } from "@/lib/auth/requireSession";

export default async function HomeAdmin() {
    const { user } = await requireSession();

    const name =
        user.user_metadata?.name ||
        user.email;


    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
           <h1 className="text-gray-300">Bien venido {name}</h1> 
        </div>
    );
}
