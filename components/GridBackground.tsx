"use client";

import { useEffect, useRef } from "react";

export function GridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Leer color primario del CSS
        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--primaryColorText")
            .trim() || "#22d2ec";

        // Hex → RGB
        const hexToRgb = (hex: string) => {
            const clean = hex.replace("#", "");
            const num = parseInt(clean, 16);
            return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
        };
        const rgb = hexToRgb(primaryColor);

        const CELL = 60;
        const mouse = { x: -9999, y: -9999 };
        let animFrame: number;
        let offset = 0; // drift diagonal

        // Grilla de puntos de onda
        interface WavePoint {
            x: number; y: number;
            phase: number;
            amp: number;
            decay: number;
        }
        const waves: WavePoint[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            // Crear onda en posición del mouse
            waves.push({ x: e.clientX, y: e.clientY, phase: 0, amp: 18, decay: 0.92 });
            if (waves.length > 12) waves.splice(0, waves.length - 12);
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            offset = (offset + 0.3) % CELL;

            // Actualizar ondas
            for (const w of waves) {
                w.phase += 0.18;
                w.amp *= w.decay;
            }

            // Calcular desplazamiento Z (profundidad) de cada intersección
            const cols = Math.ceil(canvas.width / CELL) + 2;
            const rows = Math.ceil(canvas.height / CELL) + 2;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    // Posición base con drift diagonal
                    const bx = col * CELL + offset;
                    const by = row * CELL + offset;

                    // Sumar contribución de todas las ondas activas
                    let dz = 0;
                    for (const w of waves) {
                        const dist = Math.hypot(bx - w.x, by - w.y);
                        const reach = 180;
                        if (dist < reach) {
                            const falloff = 1 - dist / reach;
                            dz += Math.sin(dist * 0.04 - w.phase) * w.amp * falloff * falloff;
                        }
                    }

                    // Perspectiva 3D simple: desplazar x/y según dz
                    const perspective = 600;
                    const px = bx + (bx - canvas.width / 2) * dz / perspective;
                    const py = by + (by - canvas.height / 2) * dz / perspective;

                    // Opacidad según distancia al mouse
                    const dmouse = Math.hypot(bx - mouse.x, by - mouse.y);
                    const baseAlpha = 0.07;
                    const glowAlpha = Math.max(0, 0.35 - dmouse / 300);
                    const alpha = baseAlpha + glowAlpha;

                    // Dibujar punto de intersección
                    ctx.beginPath();
                    ctx.arc(px, py, 1, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                    ctx.fill();
                }
            }

            // Dibujar líneas horizontales y verticales con deformación
            ctx.lineWidth = 0.5;

            for (let row = -1; row < rows; row++) {
                ctx.beginPath();
                for (let col = -1; col < cols + 1; col++) {
                    const bx = col * CELL + offset;
                    const by = row * CELL + offset;

                    let dz = 0;
                    for (const w of waves) {
                        const dist = Math.hypot(bx - w.x, by - w.y);
                        const reach = 200;
                        if (dist < reach) {
                            const falloff = 1 - dist / reach;
                            dz += Math.sin(dist * 0.04 - w.phase) * w.amp * falloff * falloff;
                        }
                    }

                    const perspective = 600;
                    const px = bx + (bx - canvas.width / 2) * dz / perspective;
                    const py = by + (by - canvas.height / 2) * dz / perspective;

                    const dmouse = Math.hypot(bx - mouse.x, by - mouse.y);
                    const alpha = 0.05 + Math.max(0, 0.2 - dmouse / 350);

                    if (col === -1) {
                        ctx.moveTo(px, py);
                        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }

            for (let col = -1; col < cols; col++) {
                ctx.beginPath();
                for (let row = -1; row < rows + 1; row++) {
                    const bx = col * CELL + offset;
                    const by = row * CELL + offset;

                    let dz = 0;
                    for (const w of waves) {
                        const dist = Math.hypot(bx - w.x, by - w.y);
                        const reach = 200;
                        if (dist < reach) {
                            const falloff = 1 - dist / reach;
                            dz += Math.sin(dist * 0.04 - w.phase) * w.amp * falloff * falloff;
                        }
                    }

                    const perspective = 600;
                    const px = bx + (bx - canvas.width / 2) * dz / perspective;
                    const py = by + (by - canvas.height / 2) * dz / perspective;

                    const dmouse = Math.hypot(bx - mouse.x, by - mouse.y);
                    const alpha = 0.05 + Math.max(0, 0.2 - dmouse / 350);

                    if (row === -1) {
                        ctx.moveTo(px, py);
                        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
                ctx.stroke();
            }

            animFrame = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animFrame);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
        />
    );
}