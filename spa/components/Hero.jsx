import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


export default function GraffioHero({
                                        slides,
                                        kicker = "Dexraflow — Where AI meets effortless flow",
                                    }) {
    // --- rotating content setup ---
    const defaultSlides = [
        {
            line1: "Automate,",
            line2: "Beautifully",
            blurb:
                "Ship cleaner workflows, faster. Dexraflow connects your files and tools so you can search, automate, and answer with confidence.",
        },
        { line1: "Search,", line2: "Precisely", blurb: "Answers with citations you can trust." },
        { line1: "Collaborate,", line2: "Seamlessly", blurb: "Bring docs, decks, and chats into one place." },
    ];
    const data = slides && slides.length ? slides : defaultSlides;
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setIdx((i) => (i + 1) % data.length), 3000);
        return () => clearInterval(id);
    }, [data.length]);

    // --- cursor spotlight ---
    const dotRef = useRef(null);
    const rafRef = useRef(0);
    const pos = useRef({ x: 0, y: 0 });
    const target = useRef({ x: 0, y: 0 });

    useEffect(() => {
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

    // --- motion variants for enter/exit on each slide ---
    const h1Variants = {
        initial: { opacity: 0, y: 40, filter: "blur(6px)" },
        animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: "easeOut" } },
        exit: { opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.35, ease: "easeIn" } },
    };
    const h2Variants = {
        initial: { opacity: 0, y: 40, filter: "blur(6px)" },
        animate: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.75, ease: "easeOut", delay: 0.25 },
        },
        exit: { opacity: 0, y: -24, filter: "blur(6px)", transition: { duration: 0.35, ease: "easeIn" } },
    };
    const blurbVariants = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.25 } },
        exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
    };

    return (
        <section
            className="relative isolate flex items-start overflow-hidden bg-[#0B0B0B] text-[#EFE7D1] selection:bg-white/10"
            style={{minHeight: "calc(100vh - 4rem)"}}  // 4rem = h-16 navbar
        >
            {/* Cursor spotlight dot */}
            <div
                ref={dotRef}
                aria-hidden
                className="pointer-events-none fixed left-0 top-0 z-30 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFE7D1] mix-blend-difference shadow-[0_0_24px_8px_rgba(239,231,209,.25)]"
            />

            <div className="container-x w-full">
                {/* Top-right CTA row */}
                <div className="flex justify-end pt-8">
                    <a
                        href="#get-started"
                        className="inline-flex items-center gap-2 rounded-full border border-[#EFE7D1]/30 px-4 py-2 text-sm text-[#EFE7D1] hover:bg-[#EFE7D1] hover:text-[#0B0B0B] transition"
                    >
                        Let's Talk
                    </a>
                </div>

                <div className="mt-10 sm:mt-16">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="mb-4 text-sm/none tracking-widest text-[#EFE7D1]/70"
                    >
                        {kicker}
                    </motion.p>

                    {/* Giant rotating headline */}
                    <AnimatePresence mode="wait">
                        <motion.div key={idx} className="leading-[0.85]">
                            <motion.h1
                                variants={h1Variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="font-extrabold tracking-tight text-[clamp(48px,14vw,220px)]"
                            >
                                {data[idx].line1}
                            </motion.h1>

                            <motion.h1
                                variants={h2Variants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="font-extrabold tracking-tight text-[clamp(48px,14vw,220px)]"
                            >
                                {data[idx].line2}
                            </motion.h1>
                        </motion.div>
                    </AnimatePresence>

                    {/* Rotating subcopy + CTA */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`blurb-${idx}`}
                            variants={blurbVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="mt-6 max-w-xl text-[#EFE7D1]/80"
                        >
                            {/* <p>{data[idx].blurb}</p> */}
                            <div className="mt-6 flex flex-wrap items-center gap-3">

                            </div>
                        </motion.div>
                        {/* <a href="#get-started"
                           className="rounded-full bg-[#EFE7D1] px-5 py-2.5 text-[#0B0B0B] font-semibold">
                            Get Started
                        </a>
                        <a href="#features"
                           className="rounded-full border border-[#EFE7D1]/30 px-5 py-2.5 text-[#EFE7D1] hover:bg-white/5">
                            Explore Features
                        </a> */}
                    </AnimatePresence>
                </div>
            </div>

            {/* Centered chevron to hint scroll */}
            <motion.div
                initial={{opacity: 0, y: -6}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 1.1, duration: 0.5}}
                className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[#EFE7D1]/70"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </motion.div>

            {/* Gradient fade to white to blend into the rest of the page */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-amber-300" />
        </section>
    );
}
