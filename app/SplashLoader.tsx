"use client";

import Image from "next/image";
import { SiNextdotjs, SiSupabase, SiPrisma } from "react-icons/si";
import { useEffect, useState } from "react";

interface SplashLoaderProps {
    logoSrc: string;
    logoAlt?: string;
    isLoading?: boolean;
}

const TECH_STACK = [
    { icon: SiNextdotjs, label: "Next.js", color: "text-white" },
    { icon: SiSupabase, label: "Supabase", color: "text-emerald-400" },
    { icon: SiPrisma, label: "Prisma", color: "text-indigo-400" },
];

// Duración mínima que el splash se muestra aunque los datos ya carguen
const MIN_VISIBLE_MS = 800;

export default function SplashLoader({
    logoSrc,
    logoAlt = "Logo",
    isLoading = true,
}: SplashLoaderProps) {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [minTimePassed, setMinTimePassed] = useState(false);

    // Timer mínimo de visibilidad
    useEffect(() => {
        const timer = setTimeout(() => setMinTimePassed(true), MIN_VISIBLE_MS);
        return () => clearTimeout(timer);
    }, []);

    // Fade out solo cuando ambas condiciones se cumplen:
    // datos listos + tiempo mínimo transcurrido
    useEffect(() => {
        if (!isLoading && minTimePassed) {
            const fadeTimer = setTimeout(() => setFadeOut(true), 0);
            const hideTimer = setTimeout(() => setVisible(false), 600);
            return () => {
                clearTimeout(fadeTimer);
                clearTimeout(hideTimer);
            };
        }
    }, [isLoading, minTimePassed]);
    if (!visible) return null;

    return (
        <div
            className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        bg-[#0a0a0a]
        transition-opacity duration-600
        ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}
      `}
        >
            {/* Grid de fondo sutil */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative flex flex-col items-center gap-10 px-8">
                {/* Logo */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute w-28 h-28 rounded-full bg-white/5 animate-ping" />
                    <div className="absolute w-24 h-24 rounded-full bg-white/5 animate-ping [animation-delay:400ms]" />
                    <Image
                        src={logoSrc}
                        alt={logoAlt}
                        width={88}
                        height={88}
                        className="relative object-contain"
                        priority
                    />
                </div>

                {/* Nombre */}
                <div className="text-center">
                    <h1 className="text-white text-xl font-mono font-bold tracking-[0.3em]">
                        MSA COD 117
                    </h1>
                    <p className="text-white/30 text-[10px] font-mono mt-1 tracking-[0.2em]">
                        SISTEMA DE GESTIÓN
                    </p>
                </div>

                {/* Iconos animados */}
                <div className="flex gap-10">
                    {TECH_STACK.map(({ icon: Icon, label, color }, i) => (
                        <div key={label} className="flex flex-col items-center gap-2">
                            <Icon
                                className={`text-3xl ${color}`}
                                style={{
                                    animation: "iconPulse 1.6s ease-in-out infinite",
                                    animationDelay: `${i * 220}ms`,
                                }}
                            />
                            <span className="text-white/20 text-[9px] font-mono tracking-widest">
                                {label.toUpperCase()}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Keyframes inline para el pulso escalonado */}
            <style>{`
        @keyframes iconPulse {
          0%, 100% { opacity: 0.25; transform: scale(0.9);  }
          50%       { opacity: 1;    transform: scale(1.15); }
        }
      `}</style>
        </div>
    );
}