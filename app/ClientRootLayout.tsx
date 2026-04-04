"use client";

import "./globals.css";
import Providers from "../components/Providers";
import { useQueryCompanies } from "@/features/companies/hooks";
import { useQueryProjects } from "@/features/projects/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";


// Crear un QueryClient
const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {

    const { theme, toggleTheme } = useTheme();
    return (
        <QueryClientProvider client={queryClient}>
            <Providers>
                <InnerQueries>
                    <Header theme={theme} toggleTheme={toggleTheme} />
                    <main className="min-h-screen">
                        {children}
                    </main>
                </InnerQueries>
                <Toaster richColors position="top-right" />
            </Providers>
        </QueryClientProvider>
    );
}

// Componente interno para usar tus hooks
function InnerQueries({ children }: { children: React.ReactNode }) {
    useQueryProjects();
    useQueryCompanies();
    return <>{children}</>;
}