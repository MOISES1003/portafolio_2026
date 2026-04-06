"use client";

import { useEffect, useRef, useState } from "react";

const eras = [
    {
        id: "v2",
        year: "2026",
        tag: "Era Actual",
        title: "La Era Actual",
        period: "2026 — Presente",
        tech: ["Next.js", "TypeScript", "Tailwind", "Supabase","Prisma"],
        url: null,
        isCurrent: true,
    },
    {
        id: "v1",
        year: "2025",
        tag: "El Origen",
        title: "El Origen",
        period: "2025 — El comienzo",
        tech: ["React","java script", "Firebase", "Style Component"],
        url: "https://msa-cod117.vercel.app/",
        isCurrent: false,
    },
];

function useOrbCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    isCurrent: boolean,
    active: boolean
) {
    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const S = 110;
        canvas.width = S;
        canvas.height = S;
        const ctx = canvas.getContext("2d")!;
        const cx = S / 2, cy = S / 2, R = S / 2 - 1;
        let t = 0;
        let rafId: number;

        const orbStars = Array.from({ length: 35 }, () => ({
            angle: Math.random() * Math.PI * 2,
            dist: 10 + Math.random() * 26,
            r: Math.random() * 1 + 0.4,
            speed: (Math.random() * 0.004 + 0.002) * (Math.random() < 0.5 ? 1 : -1),
            a: Math.random() * 0.5 + 0.2,
        }));

        function draw() {
            ctx.clearRect(0, 0, S, S);
            ctx.fillStyle = "#02020a";
            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

            orbStars.forEach((s) => {
                s.angle += s.speed;
                const x = cx + Math.cos(s.angle) * s.dist;
                const y = cy + Math.sin(s.angle) * s.dist;
                const twinkle = s.a + Math.sin(t * 0.05 + s.angle) * 0.15;
                ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(210,200,255,${twinkle})`; ctx.fill();
            });

            for (let i = 4; i >= 1; i--) {
                const r = 22 + (i / 4) * 22;
                const hue = isCurrent ? 160 : 255;
                const alpha = (1 - i / 4) * 0.45;
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(${hue},45%,55%,${alpha})`;
                ctx.lineWidth = 1; ctx.stroke();
            }

            ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
            ctx.fillStyle = "#02020a"; ctx.fill();
            ctx.beginPath(); ctx.arc(cx, cy, 10, 0, Math.PI * 2);
            ctx.strokeStyle = isCurrent ? "rgba(93,202,165,0.3)" : "rgba(139,122,204,0.3)";
            ctx.lineWidth = 0.8; ctx.stroke();

            ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.strokeStyle = isCurrent ? "rgba(93,202,165,0.2)" : "rgba(139,122,204,0.18)";
            ctx.lineWidth = 0.8; ctx.stroke();

            t++;
            rafId = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(rafId);
    }, [active, isCurrent, canvasRef]);
}

function OrbItem({
    era,
    active,
    openId,
    onToggle,
    onTravel,
}: {
    era: typeof eras[0];
    active: boolean;
    openId: string | null;
    onToggle: (id: string) => void;
    onTravel: (url: string, year: string) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useOrbCanvas(canvasRef, era.isCurrent, active);
    const isOpen = openId === era.id;

    return (
        <div className="flex flex-col items-center relative">
            <div
                className="relative w-20 h-20 md:w-27.5 md:h-27.5 rounded-full cursor-pointer transition-transform duration-300 hover:scale-[1.08] flex items-center justify-center mx-auto md:mx-0"
                onClick={(e) => { e.stopPropagation(); onToggle(era.id); }}
            >
                <canvas ref={canvasRef} className="absolute inset-0 rounded-full w-full h-full" />
                <div className="relative z-10 text-center pointer-events-none px-1">
                    <span
                        className="block font-['Cinzel',serif] text-[10px] md:text-[12px] tracking-[0.06em] leading-tight"
                        style={{ color: era.isCurrent ? "rgba(160,235,205,0.95)" : "rgba(220,210,255,0.92)" }}
                    >
                        {era.year}
                    </span>
                    <span
                        className="block font-['Cinzel',serif] text-[8px] md:text-[9px] tracking-[0.08em] mt-0.5 leading-tight"
                        style={{ color: era.isCurrent ? "rgba(93,202,165,0.65)" : "rgba(139,122,204,0.65)" }}
                    >
                        {era.tag}
                    </span>
                </div>

                <div
                    className={`
                        absolute z-20 transition-all duration-200 w-full max-w-xs md:w-50
                        ${isOpen
                            ? "opacity-100 md:translate-x-0 translate-y-0 pointer-events-auto"
                            : "opacity-0 md:-translate-x-2 -translate-y-1 pointer-events-none"
                        }
                        md:left-[calc(100%+18px)] md:top-1/2 md:-translate-y-1/2
                        left-1/2 -translate-x-1/2 top-full mt-3
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div
                        className="rounded-xl p-3 md:p-4 relative w-full shadow-2xl"
                        style={{
                            background: "rgba(8,7,20,0.97)",
                            border: "0.5px solid rgba(139,122,204,0.22)",
                        }}
                    >
                       
                        <div
                            className="absolute block md:hidden -top-2 left-1/2 -translate-x-1/2"
                            style={{
                                width: 0, height: 0,
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderBottom: "6px solid rgba(139,122,204,0.22)",
                            }}
                        />
                        {/* Desktop: flecha izquierda (ORIGINAL) */}
                        <div
                            className="absolute hidden md:block right-full top-1/2 -translate-y-1/2"
                            style={{
                                width: 0, height: 0,
                                borderTop: "6px solid transparent",
                                borderBottom: "6px solid transparent",
                                borderRight: "6px solid rgba(139,122,204,0.22)",
                            }}
                        />

                        <p className="font-['Cinzel',serif] text-[12px] md:text-[13px] font-medium text-[#cec0f4] mb-1 leading-tight">
                            {era.title}
                        </p>
                        <p className="text-[9px] md:text-[10px] font-['Cinzel',serif] tracking-[0.12em] text-[#3a2f60] mb-2 md:mb-3">
                            {era.period}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                            {era.tech.map((t) => (
                                <span
                                    key={t}
                                    className="text-[9px] md:text-[10px] font-mono px-1.5 md:px-1.75 py-0.5 rounded text-xs"
                                    style={{
                                        background: "rgba(8,8,18,0.9)",
                                        color: "#4a4070",
                                        border: "0.5px solid rgba(255,255,255,0.05)",
                                    }}
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        {era.isCurrent ? (
                            <button
                                className="w-full rounded-lg py-1.5 md:py-1.75 text-[10px] md:text-[11px] font-['Cinzel',serif] tracking-widest opacity-25 cursor-default"
                                style={{ border: "0.5px solid rgba(46,37,79,0.9)", color: "#8b7acc" }}
                            >
                                Estás aquí
                            </button>
                        ) : (
                            <button
                                className="w-full rounded-lg py-1.5 md:py-1.75 text-[10px] md:text-[11px] font-['Cinzel',serif] tracking-widest transition-all duration-200 hover:bg-[rgba(19,16,42,0.9)] hover:text-[#cec0f4]"
                                style={{ border: "0.5px solid rgba(46,37,79,0.9)", color: "#8b7acc" }}
                                onClick={() => onTravel(era.url!, era.year)}
                            >
                                ⟵ Viajar al Origen
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
function useSpaceCanvas(
    canvasRef: React.RefObject<HTMLCanvasElement>,
    modalRef: React.RefObject<HTMLDivElement>,
    active: boolean
) {
    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        const modal = modalRef.current;
        if (!canvas || !modal) return;
        const W = modal.offsetWidth, H = modal.offsetHeight;
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext("2d")!;

        const stars = Array.from({ length: 200 }, () => ({
            x: Math.random() * W, y: Math.random() * H,
            r: Math.random() * 1.3 + 0.2,
            a: Math.random() * 0.5 + 0.1,
            da: (Math.random() * 0.003 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
        }));
        const nebulae = [
            { x: W * 0.25, y: H * 0.3, r: 150, hue: 255, a: 0.03 },
            { x: W * 0.75, y: H * 0.7, r: 130, hue: 220, a: 0.025 },
            { x: W * 0.6, y: H * 0.2, r: 100, hue: 270, a: 0.02 },
        ];

        let rafId: number;
        function draw() {
            ctx.fillStyle = "#02020a"; ctx.fillRect(0, 0, W, H);
            nebulae.forEach((n) => {
                const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
                g.addColorStop(0, `hsla(${n.hue},55%,25%,${n.a})`);
                g.addColorStop(1, "transparent");
                ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
            });
            stars.forEach((s) => {
                s.a += s.da;
                if (s.a > 0.75 || s.a < 0.06) s.da *= -1;
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(210,200,255,${s.a})`; ctx.fill();
            });
            rafId = requestAnimationFrame(draw);
        }
        draw();
        return () => cancelAnimationFrame(rafId);
    }, [active, canvasRef, modalRef]);
}

function VortexOverlay({ active, year, onDone }: { active: boolean; year: string; onDone: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!active) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const W = window.innerWidth, H = window.innerHeight;
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext("2d")!;
        const cx = W / 2, cy = H / 2;
        let t = 0;

        const bgStars = Array.from({ length: 300 }, () => ({
            angle: Math.random() * Math.PI * 2,
            dist: 80 + Math.random() * Math.max(W, H) * 0.65,
            r: Math.random() * 1.3 + 0.3,
            a: Math.random() * 0.6 + 0.2,
            speed: Math.random() * 0.001,
        }));

        let rafId: number;
        function frame() {
            ctx.fillStyle = "rgba(0,0,0,0.2)"; ctx.fillRect(0, 0, W, H);
            const prog = Math.min(1, t / 75);
            const maxR = Math.min(W, H) * 0.42;
            const diskR = maxR * prog;
            const spin = t * 0.03;

            bgStars.forEach((s) => {
                const pull = prog * 0.015 * (maxR / Math.max(s.dist, 50));
                s.dist = Math.max(diskR * 1.1, s.dist - s.dist * pull);
                s.angle += s.speed;
                const x = cx + Math.cos(s.angle) * s.dist;
                const y = cy + Math.sin(s.angle) * s.dist;
                const alpha = s.a * (0.3 + prog * 0.7) * Math.min(1, (s.dist - diskR) / 60);
                if (alpha > 0.02) {
                    ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(210,200,255,${alpha})`; ctx.fill();
                }
            });

            for (let i = 0; i < 140; i++) {
                const a = (i / 140) * Math.PI * 2 + spin + Math.sin(t * 0.018 + i * 0.14) * 0.07;
                const curl = 0.22 + Math.cos(i * 0.31) * 0.08;
                const outerR = diskR * 1.08 + Math.random() * maxR * 0.95;
                const sx = cx + Math.cos(a) * diskR * 1.01;
                const sy = cy + Math.sin(a) * diskR * 1.01;
                const ex = cx + Math.cos(a + curl) * outerR;
                const ey = cy + Math.sin(a + curl) * outerR;
                const hue = 245 + Math.sin(i * 0.22 + t * 0.012) * 25;
                const g = ctx.createLinearGradient(ex, ey, sx, sy);
                g.addColorStop(0, "rgba(0,0,0,0)");
                g.addColorStop(0.45, `hsla(${hue},45%,38%,0.035)`);
                g.addColorStop(1, `hsla(${hue},50%,58%,${0.16 * prog})`);
                ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(sx, sy);
                ctx.strokeStyle = g; ctx.lineWidth = 0.65; ctx.stroke();
            }

            for (let i = 28; i >= 1; i--) {
                const frac = i / 28;
                const r = frac * diskR;
                const hue = 238 + frac * 20;
                const alpha = (1 - frac * 0.6) * 0.85 * prog;
                ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = `hsla(${hue},50%,${12 + frac * 22}%,${alpha})`;
                ctx.lineWidth = (diskR / 28) * 1.05; ctx.stroke();
            }

            const eyeR = diskR * 0.24;
            ctx.beginPath(); ctx.arc(cx, cy, eyeR, 0, Math.PI * 2);
            ctx.fillStyle = "#000"; ctx.fill();
            ctx.beginPath(); ctx.arc(cx, cy, eyeR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(160,130,255,${0.15 * prog})`; ctx.lineWidth = 1.5; ctx.stroke();

            for (let i = 0; i < 5; i++) {
                const fa = (i / 5) * Math.PI * 2 + spin * 0.5;
                ctx.beginPath();
                ctx.arc(cx + Math.cos(fa) * eyeR * 0.48, cy + Math.sin(fa) * eyeR * 0.48, 1, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,185,255,${0.35 * prog})`; ctx.fill();
            }

            t++;
            if (t < 180) rafId = requestAnimationFrame(frame);
            else onDone();
        }
        frame();
        return () => cancelAnimationFrame(rafId);
    }, [active, onDone]);

    if (!active) return null;

    return (
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black animate-[vortexIn_3s_ease_forwards]">
            <style>{`
                @keyframes vortexIn { 0%{opacity:0} 6%{opacity:1} 84%{opacity:1} 100%{opacity:0} }
                @keyframes vortexLabel { 0%{opacity:0;transform:scale(0.88)} 12%{opacity:1;transform:scale(1)} 78%{opacity:1} 100%{opacity:0} }
            `}</style>
            <canvas ref={canvasRef} className="absolute inset-0" />
            <p
                className="relative z-10 text-center"
                style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 13,
                    letterSpacing: "0.22em",
                    color: "rgba(190,170,255,0.85)",
                    animation: "vortexLabel 3s ease forwards",
                }}
            >
                Viajando hacia {year}...
            </p>
        </div>
    );
}

export function TimeMachineModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [openPopupId, setOpenPopupId] = useState<string | null>(null);
    const [vortex, setVortex] = useState<{ active: boolean; url: string; year: string }>({
        active: false, url: "", year: "",
    });
    const modalRef = useRef<HTMLDivElement>(null);
    const spaceCanvasRef = useRef<HTMLCanvasElement>(null);

    useSpaceCanvas(spaceCanvasRef, modalRef, open);

    function handleTravel(url: string, year: string) {
        setVortex({ active: true, url, year });
        setTimeout(() => window.open(url, "_blank"), 1500);
    }

    return (
        <>
            <VortexOverlay
                active={vortex.active}
                year={vortex.year}
                onDone={() => setVortex((v) => ({ ...v, active: false }))}
            />

            {/* Overlay */}
            <div
                className={`fixed inset-0 z-9999 flex items-center justify-center transition-opacity duration-300 p-4 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                style={{ background: "rgba(0,0,0,0.96)" }}
                onClick={() => { onClose(); setOpenPopupId(null); }}
            >
                {/* Modal */}
                <div
                    ref={modalRef}
                    className={`
                        relative overflow-hidden transition-all duration-500 max-w-[95vw] max-h-[95vh]
                        w-full h-full sm:w-[min(680px,95vw)] sm:h-auto sm:max-h-[88vh]
                        rounded-none sm:rounded-2xl
                        ${open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-6 opacity-0"}
                    `}
                    style={{
                        border: "0.5px solid rgba(139,122,204,0.15)",
                        maxWidth: "min(95vw, 680px)",
                        maxHeight: "min(95vh, 88vh)",
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Fondo estrellas */}
                    <canvas
                        ref={spaceCanvasRef}
                        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                        style={{
                            mixBlendMode: 'screen',
                            pointerEvents: 'none'
                        }}
                    />

                    {/* Contenido */}
                    <div className="relative z-10 h-full flex flex-col">
                        {/* Header */}
                        <div
                            className="flex items-center justify-between px-4 sm:px-8 pt-4 sm:pt-6 pb-4 sm:pb-5 shrink-0 bg-[#0d0918ab]"
                            style={{
                                borderBottom: "0.5px solid rgba(139,122,204,0.08)",
                            }}
                        >
                            <div className="min-w-0">
                                <p
                                    className="text-[8px] sm:text-[9px] font-['Cinzel',serif] tracking-[0.28em] uppercase mb-0.5 sm:mb-1 truncate"
                                    style={{ color: "#3a2f60" }}
                                >
                                    Archivos del cosmos
                                </p>
                                <h2
                                    className="text-[16px] sm:text-[19px] font-['Cinzel',serif] font-medium tracking-[0.05em] sm:tracking-[0.06em] truncate"
                                    style={{ color: "#d0c4f8" }}
                                >
                                    Crónicas del Portafolio
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="transition-all duration-200 shrink-0 ml-2 sm:ml-0"
                                style={{
                                    background: "none",
                                    border: "0.5px solid rgba(139,122,204,0.18)",
                                    borderRadius: 6,
                                    padding: "4px 10px 3px",
                                    color: "#4a3f6a",
                                    fontSize: "10px",
                                    fontFamily: "'Cinzel',serif",
                                    letterSpacing: "0.08em",
                                    cursor: "pointer",
                                    whiteSpace: "nowrap",
                                    minWidth: "60px",
                                }}
                            >
                                Cerrar
                            </button>
                        </div>

                        {/* Timeline */}
                        <div
                            className="flex-1 flex flex-col items-center py-6 sm:py-15 gap-0 overflow-y-auto overscroll-contain"
                            style={{
                                background: "rgba(2,2,10,0.2)",
                            }}
                            onClick={() => setOpenPopupId(null)}
                        >
                            <div className="w-full max-w-xs sm:max-w-sm flex flex-col items-center space-y-2 sm:space-y-0 sm:gap-0">
                                {eras.map((era, i) => (
                                    <div key={era.id} className="flex flex-col items-center w-full">
                                        <OrbItem
                                            era={era}
                                            active={open}
                                            openId={openPopupId}
                                            onToggle={(id) => setOpenPopupId((prev) => (prev === id ? null : id))}
                                            onTravel={handleTravel}
                                        />
                                        {i < eras.length - 1 && (
                                            <div
                                                className="w-px h-8 sm:h-11 self-center"
                                                style={{ background: "linear-gradient(to bottom, rgba(139,122,204,0.2), rgba(139,122,204,0.06))" }}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}