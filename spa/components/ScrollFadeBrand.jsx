import React, { useMemo, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ScrollFadeBrand({
                                            text = "DEXRAFLOW",
                                            anchorIndex = 0,          // which character never fades
                                            base = "#0f172a",         // base text color (slate-900)
                                            accent = "#4f46e5",       // hover accent color (brand)
                                            fadeDistance = 240,       // px of scroll needed to finish the fade
                                            className = "",
                                        }) {
    const letters = useMemo(() => text.split(""), [text]);
    const [p, setP] = useState(0); // 0 → 1 over fadeDistance

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY || document.documentElement.scrollTop || 0;
            const prog = Math.max(0, Math.min(1, y / fadeDistance));
            setP(prog);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [fadeDistance]);

    const fadeOrder = useMemo(() => {
        // fade end → start, skip the anchor
        return letters
            .map((ch, i) => ({ ch, i }))
            .filter(({ ch, i }) => ch !== " " && i !== anchorIndex)
            .map(o => o.i)
            .sort((a, b) => b - a);
    }, [letters, anchorIndex]);

    const segments = Math.max(1, fadeOrder.length);
    const segSize = 1 / segments;

    function opacityFor(i) {
        // spaces and anchor never fade
        if (letters[i] === " " || i === anchorIndex) return 1;
        const k = fadeOrder.indexOf(i);
        if (k === -1) return 1;
        const start = k * segSize;
        const end = (k + 1) * segSize;
        if (p <= start) return 1;
        if (p >= end) return 0;
        const t = (p - start) / (end - start);
        return 1 - t;
    }

    return (
        <div className={`inline-flex items-center ${className}`} aria-label={text}>
            {letters.map((ch, i) => {
                const isSpace = ch === " ";
                return (
                    <motion.span
                        key={`${i}-${ch}`}
                        style={{ opacity: opacityFor(i), color: base }}
                        className={isSpace ? "px-[0.2ch]" : "tracking-tight"}
                        whileHover={!isSpace ? { y: -1.5, scale: 1.03, color: accent } : undefined}
                        transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.25 }}
                    >
                        <span className="text-lg sm:text-xl font-extrabold leading-none">{ch}</span>
                    </motion.span>
                );
            })}
        </div>
    );
}
