"use client";

import Image from "next/image";
import logo from "@/public/logo.webp";
import Link from "next/link";
import { usePathname } from "next/navigation"; // <-- importante

export default function Header() {
  const pathname = usePathname(); // nos da la ruta actual

  const links = [
    { label: "INICIO", href: "/" },
    { label: "EXPERIENCIA", href: "/experience" },
    { label: "CONTACTO", href: "/contact" },
  ];

  return (
    <header className="bg-header shadow-md fixed w-full z-10 h-16">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="flex items-center justify-center gap-2 text-lg font-bold tracking-widest text-primary font-mono">
          <Image src={logo} alt="Logo" width={30} height={30} />
          MSA COD 117
        </h1>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          {links.map(({ label, href }) => {
            const isActive = pathname === href; // comprobamos si es la ruta actual
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs tracking-widest transition-colors ${
                  isActive
                    ? "text-primary border-b border-primary pb-0.5"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}