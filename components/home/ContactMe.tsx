"use client";

import { ContentSection } from "../ContentSection";

export function ContactMe() {
    return (
        <ContentSection className="flex">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Columna izquierda */}
                <div className="flex flex-col gap-6">

                    <h2 className="text-5xl font-headline leading-tight text-textbase animate-fade-slide delay-200">
                        ¿Tienes un{" "}
                        <span className="block">
                            <span className="text-primary text-4xl">
                                proyecto en mente?
                            </span>
                        </span>
                    </h2>

                    <p className="text-secondary/70 text-sm leading-relaxed max-w-md animate-fade-slide delay-300">
                        Me enfoco en construir soluciones digitales que realmente aporten valor.
                        Si tienes una idea, necesitas mejorar un sistema o quieres lanzar un producto,
                        podemos hacerlo realidad juntos.
                    </p>

                    {/* Mini stats / confianza */}
                    <div className="flex gap-6 mt-2 text-xs font-mono text-secondary/60 tracking-widest animate-fade-slide delay-400">
                        <span>+2 AÑOS EXP</span>
                        <span>FULL STACK</span>
                        <span>REMOTE READY</span>
                    </div>
                </div>

                {/* Columna derecha */}
                <div className="flex flex-col gap-8 text-secondary font-body animate-fade-slide delay-300">

                    <p className="text-base leading-relaxed">
                        Estoy disponible para proyectos freelance, colaboraciones y
                        oportunidades laborales. Me adapto rápidamente a nuevos entornos
                        y siempre busco aportar soluciones eficientes y escalables.
                    </p>

                    {/* Botón principal */}
                    <a
                        href="/contacto"
                        className="relative w-fit px-6 py-3 border border-primary/30 text-primary font-mono tracking-widest text-sm overflow-hidden group transition-all duration-300 hover:border-primary hover:shadow-[0_0_20px_rgba(34,210,236,0.25)]"
                    >
                        <span className="relative z-10">Escríbeme</span>

                        {/* efecto hover */}
                        <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </a>

                    {/* Alternativa contacto rápido */}
                    <div className="flex flex-col gap-2 text-base text-secondary/60 font-mono">
                        <span>O contáctame directamente:</span>
                        <span className="text-primary">Moiseswtf123@gmail.com</span>
                    </div>
                </div>

            </div>
        </ContentSection>
    );
}