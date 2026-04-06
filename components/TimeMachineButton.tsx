"use client";

import { useState } from "react";
import { TimeMachineModal } from "./TimeMachineModal";

export function TimeMachineButton() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <TimeMachineModal open={open} onClose={() => setOpen(false)} />

            <button
                onClick={() => setOpen(true)}
                className="fixed bottom-8 right-8 z-9998 group cursor-pointer"
                aria-label="Máquina del tiempo"
            >
                <style>{`
                    @keyframes orbRing {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    @keyframes orbPulse {
                        0%, 100% { opacity: 0.4; transform: scale(1); }
                        50% { opacity: 0.8; transform: scale(1.08); }
                    }
                `}</style>

                {/* Anillo giratorio exterior */}
                <div
                    className="absolute inset-0 rounded-full"
                    style={{
                        border: "0.5px dashed rgba(139,122,204,0.35)",
                        animation: "orbRing 8s linear infinite",
                        borderRadius: "50%",
                    }}
                />
                {/* Anillo pulsante */}
                <div
                    className="absolute -inset-2 rounded-full"
                    style={{
                        border: "0.5px solid rgba(139,122,204,0.15)",
                        animation: "orbPulse 2.5s ease-in-out infinite",
                    }}
                />

                {/* Cuerpo del botón */}
                <div
                    className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: "#02020a",
                        border: "0.5px solid rgba(139,122,204,0.3)",
                    }}
                >
                    {/* Icono SVG reloj / portal */}
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                        <circle cx="13" cy="13" r="10" stroke="rgba(139,122,204,0.7)" strokeWidth="0.8" />
                        <circle cx="13" cy="13" r="6" stroke="rgba(139,122,204,0.4)" strokeWidth="0.5" />
                        <circle cx="13" cy="13" r="2" fill="rgba(139,122,204,0.6)" />
                        {/* manecillas del reloj */}
                        <line x1="13" y1="13" x2="13" y2="7" stroke="rgba(210,200,255,0.8)" strokeWidth="0.8" strokeLinecap="round" />
                        <line x1="13" y1="13" x2="17" y2="15" stroke="rgba(139,122,204,0.7)" strokeWidth="0.8" strokeLinecap="round" />
                        {/* destellos */}
                        <circle cx="13" cy="3.5" r="0.8" fill="rgba(139,122,204,0.5)" />
                        <circle cx="22.5" cy="13" r="0.8" fill="rgba(139,122,204,0.5)" />
                        <circle cx="13" cy="22.5" r="0.8" fill="rgba(139,122,204,0.5)" />
                        <circle cx="3.5" cy="13" r="0.8" fill="rgba(139,122,204,0.5)" />
                    </svg>
                </div>

                {/* Tooltip */}
                <div
                    className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0 pointer-events-none whitespace-nowrap"
                    style={{
                        background: "rgba(8,7,20,0.95)",
                        border: "0.5px solid rgba(139,122,204,0.2)",
                        borderRadius: 8,
                        padding: "5px 12px",
                        fontFamily: "'Cinzel',serif",
                        fontSize: 10,
                        letterSpacing: "0.12em",
                        color: "#8b7acc",
                    }}
                >
                    Vórtice del Tiempo
                </div>
            </button>
        </>
    );
}