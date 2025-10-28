"use client";
import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * CTAInteractive.jsx
 * Eye‑catching CTA with Dexraflow theme (bg black, text #EEE7D2),
 * micro‑interactions, and subtle parallax. Pure JSX.
 */
export default function CTAInteractive() {
    // scroll reactive glow
    const { scrollYProgress } = useScroll();
    const glow = useTransform(scrollYProgress, [0, 1], [0.15, 0.45]);
    const yFloat = useTransform(scrollYProgress, [0, 1], [0, -8]);

    return (
        <section className="relative isolate overflow-hidden rounded-3xl border border-[#262626] bg-black px-6 py-12 sm:px-10 sm:py-16">
            {/* radial highlight behind content */}
            <motion.div
                aria-hidden
                style={{ opacity: glow }}
                className="pointer-events-none absolute inset-0"
            >
                <div className="absolute left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EEE7D2]/10 blur-3xl" />
                <div className="absolute bottom-0 left-1/2 h-[280px] w-[520px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#EEE7D2]/5 blur-3xl" />
            </motion.div>

            {/* header chip */}
            <motion.div
                style={{ y: yFloat }}
                className="mx-auto mb-6 w-fit select-none"
            >
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-black/60 px-3 py-1 text-xs tracking-widest text-[#EEE7D2]/80">
          <Sparkles className="h-3.5 w-3.5" />
          POWERED BY DEXRAFLOW AI
        </span>
            </motion.div>

            {/* copy */}
            <div className="mx-auto max-w-3xl text-center">
                <motion.h3
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-balance text-3xl font-extrabold leading-tight text-[#EEE7D2] sm:text-4xl"
                >
                    Ready to accelerate with AI?
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 text-pretty text-sm leading-relaxed text-[#EEE7D2]/70 sm:text-base"
                >
                    Spin up a workspace in minutes. Connect your docs, code, and chats —
                    then search, automate, and ship with confidence.
                </motion.p>

                {/* buttons */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Magnetic>
                        <motion.a
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href="#"
                            className="group inline-flex items-center gap-2 rounded-2xl bg-[#EEE7D2] px-5 py-2.5 font-semibold text-black shadow-[0_8px_24px_rgba(238,231,210,0.15)] transition"
                        >
                            Start free
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </motion.a>
                    </Magnetic>

                    <Magnetic strength={0.25}>
                        <motion.a
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href="#"
                            className="inline-flex items-center gap-2 rounded-2xl border border-[#2b2b2b] bg-transparent px-5 py-2.5 text-[#EEE7D2] hover:bg-white/5"
                        >
                            Book a demo
                        </motion.a>
                    </Magnetic>
                </div>
            </div>

            {/* floating orbs */}
            <div className="pointer-events-none absolute inset-0">
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 0.6, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute -right-8 -top-6 h-24 w-24 rounded-full bg-[#EEE7D2]/10 blur-xl"
                />
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 0.5, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                    className="absolute -bottom-8 -left-6 h-28 w-28 rounded-full bg-[#EEE7D2]/10 blur-xl"
                />
            </div>
        </section>
    );
}

/** Magnetic wrapper for subtle pointer pull on hover */
function Magnetic({ children, strength = 0.45 }) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let frame = 0;
        const state = { x: 0, y: 0, tx: 0, ty: 0 };

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            state.tx = (e.clientX - (r.left + r.width / 2)) * strength * 0.08;
            state.ty = (e.clientY - (r.top + r.height / 2)) * strength * 0.08;
            if (!frame) tick();
        };

        const onLeave = () => {
            state.tx = 0; state.ty = 0; if (!frame) tick();
        };

        const tick = () => {
            frame = requestAnimationFrame(() => {
                state.x += (state.tx - state.x) * 0.18;
                state.y += (state.ty - state.y) * 0.18;
                el.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
                if (Math.abs(state.x - state.tx) > 0.2 || Math.abs(state.y - state.ty) > 0.2) tick();
                else { cancelAnimationFrame(frame); frame = 0; }
            });
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, [strength]);

    return (
        <span ref={ref} className="inline-flex will-change-transform">{children}</span>
    );
}
