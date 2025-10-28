"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function HeroOptimized({ kicker = "Dexraflow — Where AI meets effortless flow" }) {
    const dotRef = React.useRef(null);
    const rafRef = React.useRef(0);
    const pos = React.useRef({ x: 0, y: 0 });
    const target = React.useRef({ x: 0, y: 0 });
    const prefersReduced = useReducedMotion();
    const [isFinePointer, setIsFinePointer] = React.useState(false);

    React.useEffect(() => {
        if (typeof window !== "undefined" && window.matchMedia) {
            setIsFinePointer(window.matchMedia("(pointer:fine)").matches);
        }
    }, []);

    React.useEffect(() => {
        if (!isFinePointer || prefersReduced) return;

        const onMove = (e) => {
            target.current.x = e.clientX;
            target.current.y = e.clientY;
        };
        window.addEventListener("mousemove", onMove, { passive: true });

        const animate = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.18;
            pos.current.y += (target.current.y - pos.current.y) * 0.18;
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isFinePointer, prefersReduced]);

    return (
        <section className="relative isolate min-h-[80vh] flex items-center overflow-hidden bg-[#0B0B0B] text-[#EFE7D1] selection:bg-white/10">
            <div
                ref={dotRef}
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-30 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFE7D1] mix-blend-difference shadow-[0_0_24px_8px_rgba(239,231,209,.25)]"
                style={{ opacity: isFinePointer && !prefersReduced ? 1 : 0 }}
            />
        </section>
    );
}
