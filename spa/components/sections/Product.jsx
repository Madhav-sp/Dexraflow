"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ShowcaseSection() {
    return (
        <section className="relative isolate overflow-hidden bg-black text-[#EEE7D2]">
            {/* soft vignette */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_-10%,rgba(238,231,210,0.12),transparent_60%)]" />
            </div>

            <div className="mx-auto flex max-w-[80rem] flex-col items-center px-4 py-20 sm:py-28">
                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-5 select-none"
                >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-black/60 px-3 py-1 text-xs tracking-widest text-[#EEE7D2]/75">
            <Sparkles className="h-3.5 w-3.5" /> LIVE IN MINUTES
          </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                    initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="text-center text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
                >
                    Automate your flow. <span className="text-[#EEE7D2]/80">Search, connect, ship.</span>
                </motion.h2>

                {/* Subcopy */}
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-[#EEE7D2]/70 sm:text-base"
                >
                    Plug in your docs, code, and chats. Dexraflow answers with citations, automates your pipeline, and keeps your team in sync.
                </motion.p>

                {/* Feature chips */}
                <div className="mt-8 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3">
                    {[
                        "Cited answers",
                        "Workflow triggers",
                        "Drive / GitHub / Notion",
                        "Approvals & routing",
                        "Realtime summaries",
                        "Secure by default",
                    ].map((t, i) => (
                        <motion.div
                            key={t}
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-15%" }}
                            transition={{ duration: 0.45, delay: 0.05 * i }}
                            className="rounded-full border border-[#2b2b2b] bg-black/40 px-3 py-1.5 text-center text-xs text-[#EEE7D2]/80"
                        >
                            {t}
                        </motion.div>
                    ))}
                </div>

                {/* CTA row */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <Magnetic>
                        <motion.a
                            whileHover={{ scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href="#get-started"
                            className="group inline-flex items-center gap-2 rounded-2xl bg-[#EEE7D2] px-5 py-2.5 font-semibold text-black shadow-[0_8px_24px_rgba(238,231,210,0.15)] transition"
                        >
                            Get started
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </motion.a>
                    </Magnetic>

                    <Magnetic strength={0.25}>
                        <motion.a
                            whileHover={{ scale: 1.02, y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href="#demo"
                            className="inline-flex items-center gap-2 rounded-2xl border border-[#2b2b2b] bg-transparent px-5 py-2.5 text-[#EEE7D2] hover:bg-white/5"
                        >
                            Book a demo
                        </motion.a>
                    </Magnetic>
                </div>

                {/* Decorative orbs */}
                <div className="pointer-events-none relative mt-12 h-20 w-full max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 0.6, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute -right-2 top-0 h-16 w-16 rounded-full bg-[#EEE7D2]/10 blur-xl"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 0.5, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
                        className="absolute -left-2 bottom-0 h-16 w-16 rounded-full bg-[#EEE7D2]/10 blur-xl"
                    />
                </div>
            </div>
        </section>
    );
}

function Magnetic({ children, strength = 0.45 }) {
    const ref = React.useRef(null);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let frame = 0;
        const s = { x: 0, y: 0, tx: 0, ty: 0 };

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            s.tx = (e.clientX - (r.left + r.width / 2)) * strength * 0.08;
            s.ty = (e.clientY - (r.top + r.height / 2)) * strength * 0.08;
            if (!frame) tick();
        };
        const onLeave = () => {
            s.tx = 0; s.ty = 0; if (!frame) tick();
        };

        const tick = () => {
            frame = requestAnimationFrame(() => {
                s.x += (s.tx - s.x) * 0.18;
                s.y += (s.ty - s.y) * 0.18;
                el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
                if (Math.abs(s.x - s.tx) > 0.2 || Math.abs(s.y - s.ty) > 0.2) tick();
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

    return <span ref={ref} className="inline-flex will-change-transform">{children}</span>;
}
