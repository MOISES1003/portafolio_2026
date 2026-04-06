"use client";

import "./globals.css";
import Providers from "../components/Providers";
import { useQueryCompanies } from "@/features/companies/hooks";
import { useQueryProjects } from "@/features/projects/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import { GridBackground } from "@/components";
import { TimeMachineButton } from "@/components/TimeMachineButton";
import SplashLoader from "./SplashLoader";

// Crear un QueryClient
const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {

    return (
        <QueryClientProvider client={queryClient}>
            <Providers>
                <InnerQueries>
                    <div className="flex flex-col min-h-screen">
                        <GridBackground />
                        <Header />
                        <main>
                            {children}
                        </main>
                        <TimeMachineButton />
                    </div>
                </InnerQueries>
                <Toaster richColors position="top-right" />
            </Providers>
        </QueryClientProvider>
    );
}

// Componente interno para usar tus hooks
function InnerQueries({ children }: { children: React.ReactNode }) {
    const { isLoading } = useQueryProjects();
    const { isLoading: isLoadingCompany } = useQueryCompanies();
    const loading = isLoading || isLoadingCompany;

    return (
        <>
            <SplashLoader
                logoSrc="/logo.webp"
                logoAlt="MSA Cod 117"
                isLoading={loading}
            />
            {!loading && children}
        </>
    );
}