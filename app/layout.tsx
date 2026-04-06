import type { Metadata } from "next";
import ClientRootLayout from "./ClientRootLayout";
import { Newsreader, Space_Grotesk } from "next/font/google";

export const metadata: Metadata = {
  title: "MSACod117",
  description: "Portafolio de Moisés Saucedo con proyectos, experiencias y habilidades en desarrollo web.",
  icons: "/favicon.png",
};

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${newsreader.variable} ${spaceGrotesk.variable}`}>
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );

}