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
                    <div className="flex flex-col min-h-screen"> 
                        <Header theme={theme} toggleTheme={toggleTheme} />
                        <main>
                            {children}
                        </main>
                    </div>
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