"use client";

import { ITechnology } from "@/features/technology/technology.type";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
interface TechBubblesProps { techs: ITechnology[]; }
interface BubbleState { x: number; y: number; size: number; depth: number; }
interface Particle { from: number; to: number; progress: number; speed: number; }
interface Glow { nodeIndex: number; intensity: number; }

export function TechBubbles({ techs }: TechBubblesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animRef = useRef<number>(0);
    const particlesRef = useRef<Particle[]>([]);
    const connectionsRef = useRef<{ i: number; j: number }[]>([]);
    const glowsRef = useRef<Glow[]>([]);
    const [bubbles, setBubbles] = useState<BubbleState[]>([]);


    useEffect(() => {
        if (!containerRef.current) return;
        const W = containerRef.current.offsetWidth;
        const H = 540;
        const PADDING = 30;
        const GAP = 16;
        const placed: { x: number; y: number; r: number }[] = [];
        const areaX1 = W * 0.15, areaX2 = W * 0.85;
        const areaY1 = H * 0.08, areaY2 = H * 0.92;

        const result: BubbleState[] = techs.map(() => {
            const depth = Math.random();
            const size = 65 + depth * 30;
            const r = size / 2;
            let x = 0, y = 0, tries = 0, valid = false;

            while (tries < 300) {
                x = areaX1 + Math.random() * (areaX2 - areaX1);
                y = areaY1 + Math.random() * (areaY2 - areaY1);
                x = Math.max(r + PADDING, Math.min(W - r - PADDING, x));
                y = Math.max(r + PADDING, Math.min(H - r - PADDING, y));
                const overlaps = placed.some((p) => Math.hypot(x - p.x, y - p.y) < r + p.r + GAP);
                if (!overlaps) { valid = true; break; }
                tries++;
            }
            if (!valid) {
                x = W * 0.5 + (Math.random() - 0.5) * W * 0.4;
                y = H * 0.5 + (Math.random() - 0.5) * H * 0.6;
            }
            placed.push({ x, y, r });
            return { x, y, size, depth };
        });

        setBubbles(result);
    }, [techs.length]);

    useEffect(() => {
        if (!bubbles.length) return;
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const W = container.offsetWidth;
        const H = 540;
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext('2d')!;
        const MIN_CONNECTIONS = 2;

        const connections: { i: number; j: number }[] = [];
        const connected = new Set<string>();

        bubbles.forEach((b, i) => {
            const distances = bubbles
                .map((b2, j) => ({ j, dist: Math.hypot(b.x - b2.x, b.y - b2.y) }))
                .filter(({ j }) => j !== i)
                .sort((a, b) => a.dist - b.dist);

            distances.slice(0, MIN_CONNECTIONS).forEach(({ j }) => {
                const key = i < j ? `${i}-${j}` : `${j}-${i}`;
                if (!connected.has(key)) {
                    connected.add(key);
                    connections.push({ i, j });
                }
            });
        });

        connectionsRef.current = connections;
        glowsRef.current = [];

        particlesRef.current = connections.flatMap(({ i, j }) => [
            {
                from: i, to: j,
                progress: Math.random(),
                speed: 0.0012 + Math.random() * 0.002, // un poco más rápido que el original
            },
            {
                from: j, to: i,
                progress: Math.random(),
                speed: 0.001 + Math.random() * 0.002, // un poco más rápido que el original
            },
        ]);

        const loop = () => {
            ctx.clearRect(0, 0, W, H);

            connections.forEach(({ i, j }) => {
                const bi = bubbles[i], bj = bubbles[j];
                const dist = Math.hypot(bi.x - bj.x, bi.y - bj.y);
                const opacity = Math.max(0.08, (1 - dist / Math.hypot(W, H)) * 0.35);
                ctx.beginPath();
                ctx.moveTo(bi.x, bi.y);
                ctx.lineTo(bj.x, bj.y);
                ctx.strokeStyle = `rgba(34,210,236,${opacity.toFixed(2)})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            glowsRef.current = glowsRef.current.filter(g => g.intensity > 0.02);
            glowsRef.current.forEach((g) => {
                const b = bubbles[g.nodeIndex];
                if (!b) return;
                const r = b.size / 2;
                const pulse = ctx.createRadialGradient(b.x, b.y, r * 0.5, b.x, b.y, r * 1.8);
                pulse.addColorStop(0, `rgba(34,210,236,${(g.intensity * 0.45).toFixed(2)})`);
                pulse.addColorStop(0.5, `rgba(34,210,236,${(g.intensity * 0.12).toFixed(2)})`);
                pulse.addColorStop(1, 'rgba(34,210,236,0)');
                ctx.beginPath();
                ctx.arc(b.x, b.y, r * 1.8, 0, Math.PI * 2);
                ctx.fillStyle = pulse;
                ctx.fill();
                g.intensity *= 0.92;
            });

            particlesRef.current.forEach((p) => {
                p.progress += p.speed;

                if (p.progress >= 1) {
                    p.progress = 0;

                    if (Math.random() < 0.5) {
                        const existing = glowsRef.current.find(g => g.nodeIndex === p.to);
                        if (existing) {
                            existing.intensity = 1;
                        } else {
                            glowsRef.current.push({ nodeIndex: p.to, intensity: 1 });
                        }
                    }

                    const tmp = p.from;
                    p.from = p.to;
                    p.to = tmp;
                }

                const bf = bubbles[p.from];
                const bt = bubbles[p.to];
                if (!bf || !bt) return;

                const px = bf.x + (bt.x - bf.x) * p.progress;
                const py = bf.y + (bt.y - bf.y) * p.progress;

                const glow = ctx.createRadialGradient(px, py, 0, px, py, 5);
                glow.addColorStop(0, 'rgba(34,210,236,0.5)');
                glow.addColorStop(1, 'rgba(34,210,236,0)');
                ctx.beginPath();
                ctx.arc(px, py, 5, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(px, py, 1.8, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255,255,255,0.9)';
                ctx.fill();
            });

            animRef.current = requestAnimationFrame(loop);
        };

        animRef.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(animRef.current);
    }, [bubbles]);

    return (
        <div ref={containerRef} className="relative w-full h-full min-h-127.5 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />

            {techs.map((tech, i) => {
                const b = bubbles[i];
                if (!b) return null;
                const { x, y, size, depth } = b;
                const imgSize = Math.round(size * 0.5);
                const fontSize = Math.round(8 + depth * 1);
                const alpha = 0.08 + depth * 0.22;
                const borderAlpha = 0.1 + depth * 0.5;

                return (
                    <div
                        key={tech.name}
                        className="absolute rounded-full flex flex-col items-center justify-center cursor-pointer hover:brightness-125 transition-all duration-300"
                        style={{
                            width: size, height: size,
                            left: x - size / 2, top: y - size / 2,
                            background: `radial-gradient(circle at 35% 35%, rgba(34,210,236,${(alpha * 1.8).toFixed(2)}), rgba(12,12,12,0.85) 70%)`,
                            border: `1px solid rgba(34,210,236,${borderAlpha.toFixed(2)})`,
                            boxShadow: `inset 0 0 ${Math.round(size * 0.3)}px rgba(34,210,236,${(alpha * 0.5).toFixed(2)}), 0 0 ${Math.round(depth * 20)}px rgba(34,210,236,${(depth * 0.15).toFixed(2)})`,
                            gap: 4, zIndex: 1,
                        } as React.CSSProperties}
                    >
                        <div style={{ width: imgSize, height: imgSize, position: 'relative', flexShrink: 0 }}>
                            <Image src={tech.logoUrl ?? ""} alt={tech.name} fill className="object-contain" />
                        </div>
                        <span style={{
                            fontSize,
                            color: `rgba(34,210,236,${(0.4 + depth * 0.6).toFixed(1)})`,
                            fontFamily: 'monospace', letterSpacing: '1.5px',
                            textTransform: 'uppercase', lineHeight: 1,
                        }}>
                            {tech.name}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}