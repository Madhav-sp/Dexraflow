"use client";
import React from "react";

export default function GlobalHeroCursor({
                                             color = "#EEE7D2", // match your site theme
                                             size = 16,         // same as h-4 w-4
                                             blend = true,      // same "mix-blend-difference" as Hero
                                             glow = true,       // same soft shadow
                                         }) {
    const dotRef = React.useRef(null);
    const rafRef = React.useRef(0);
    const pos = React.useRef({ x: 0, y: 0 });
    const target = React.useRef({ x: 0, y: 0 });

    React.useEffect(() => {
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
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // tiny helper to turn hex into rgba for glow
    const hexToRgba = (hex, a = 0.25) => {
        const c = hex.replace("#", "");
        const bigint = parseInt(c.length === 3 ? c.split("").map(x => x + x).join("") : c, 16);
        const r = (bigint >> 16) & 255, g = (bigint >> 8) & 255, b = bigint & 255;
        return `rgba(${r},${g},${b},${a})`;
    };

    return (
        <div
            ref={dotRef}
            aria-hidden
            className={[
                "pointer-events-none fixed left-0 top-0 z-[10000] -translate-x-1/2 -translate-y-1/2 rounded-full",
                blend ? "mix-blend-difference" : ""
            ].join(" ")}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                boxShadow: glow ? `0 0 24px 8px ${hexToRgba(color, 0.25)}` : "none",
            }}
        />
    );
}
