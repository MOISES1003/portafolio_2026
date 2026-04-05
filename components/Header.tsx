"use client";

import { Moon, Sun } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.webp"


interface HeaderProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Header({ theme, toggleTheme }: HeaderProps) {
  return (
    <header className="bg-header shadow-md fixed w-full z-10 h-16">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="flex items-center justify-center gap-2 text-lg font-bold tracking-widest text-primary font-mono">
          <Image
          src={logo}
          alt="Logo"
          width={30}
          height={30}
          />
          MSA COD 117
        </h1>

        {/* Nav */}
        <nav className="flex items-center gap-8">
          {[
            { label: "INICIO", href: "#home", active: true },
            { label: "SISTEMAS", href: "#projects" },
            { label: "ARCHIVO", href: "#archive" },
            { label: "CONTACTO", href: "#contact" },
          ].map(({ label, href, active }) => (
            <a
              key={href}
              href={href}
              className={`text-xs tracking-widest transition-colors ${active
                ? "text-primary border-b border-primary pb-0.5"
                : "text-secondary hover:text-primary"
                }`}
            >
              {label}
            </a>
          ))}

          {/* Botón conectar / tema */}
          <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded-md transition-colors hover:bg-primary/10"
          >
            {theme === "dark" ? <Sun color="#F7BC0F" fill="#F7BC0F"/> : <Moon fill="#2E3041" color="#2E3041"/>}
          </button>
        </nav>

      </div>
    </header>
  );
}