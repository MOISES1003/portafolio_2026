"use client";

import Image from "next/image";
import logo from "@/public/logo.webp";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "INICIO", href: "/" },
    { label: "EXPERIENCIA", href: "/experience" },
    { label: "CONTACTO", href: "/contact" },
  ];

  return (
    <header className="bg-header shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <h1 className="flex items-center gap-2 text-lg sm:text-xl font-bold tracking-widest text-primary font-mono">
          <Image src={logo} alt="Logo" width={30} height={30} />
          MSA COD 117
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-xs sm:text-sm tracking-widest transition-colors ${
                  isActive
                    ? "text-primary border-b-2 border-primary pb-0.5"
                    : "text-secondary hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-primary text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-header px-4 pb-4">
          <nav className="flex flex-col gap-4">
            {links.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`text-sm tracking-widest transition-colors ${
                    isActive
                      ? "text-primary border-b-2 border-primary pb-0.5"
                      : "text-secondary hover:text-primary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}