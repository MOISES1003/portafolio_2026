"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import { useQueryCompanies } from "@/features/companies/hooks";
import { useQueryProjects } from "@/features/projects/hooks";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "sonner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Crear un QueryClient
const queryClient = new QueryClient();

export default function ClientRootLayout({ children }: { children: React.ReactNode }) {
    // Ejecutar queries dentro del QueryClientProvider
    return (
        <QueryClientProvider client={queryClient}>
            <html lang="en">
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    <Providers>
                        <InnerQueries>{children}</InnerQueries>
                        <Toaster richColors position="top-right" />
                    </Providers>
                </body>
            </html>
        </QueryClientProvider>
    );
}

// Componente interno para usar tus hooks
function InnerQueries({ children }: { children: React.ReactNode }) {
    useQueryProjects();
    useQueryCompanies();
    return <>{children}</>;
}