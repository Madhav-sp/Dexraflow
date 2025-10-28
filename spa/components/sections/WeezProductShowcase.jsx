"use client";
import React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, MessageSquare, Search, Workflow, ShieldCheck, Rocket, BookOpenText, Timer, FolderSearch, ArrowRight } from "lucide-react";

/**
 * WeezProductShowcase.jsx
 * Highly-animated product section for Weez AI
 * Theme: black background + #EEE7D2 text
 * Pure JSX, Tailwind + framer-motion + lucide-react only
 */
export default function WeezProductShowcase() {
    const words = ["Search", "Automate", "Summarize"];
    const [w, setW] = React.useState(0);
    React.useEffect(() => {
        const id = setInterval(() => setW((i) => (i + 1) % words.length), 1800);
        return () => clearInterval(id);
    }, []);

    const tabs = [
        { key: "chat", label: "Chat", icon: MessageSquare },
        { key: "search", label: "Search", icon: Search },
        { key: "automate", label: "Automate", icon: Workflow },
    ];
    const [active, setActive] = React.useState("chat");

    return (
        <section className="relative isolate overflow-hidden bg-black text-[#EEE7D2]">
            {/* soft radial wash */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-0 h-[560px] w-[960px] -translate-x-1/2 -translate-y-1/3 rounded-[999px] bg-[#EEE7D2]/10 blur-3xl" />
            </div>

            <div className="mx-auto max-w-[80rem] px-4 py-20 sm:py-28">
                {/* Eyebrow chip */}
                <motion.div
                    initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-4 w-fit select-none"
                >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2b2b2b] bg-black/60 px-3 py-1 text-xs tracking-widest text-[#EEE7D2]/80">
            <Sparkles className="h-3.5 w-3.5" /> INTRODUCING WEEZ AI
          </span>
                </motion.div>

                {/* Heading with rotating word */}
                <div className="text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                    Meet Weez AI —
                    <span className="ml-2 inline-flex h-[1.1em] items-baseline overflow-y-hidden align-baseline">
            <AnimatePresence mode="wait">
              <motion.span
                  key={words[w]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[#EEE7D2]/85"
              >
                {words[w]}
              </motion.span>
            </AnimatePresence>
          </span>
                    your work in seconds.
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-3 max-w-2xl text-sm leading-relaxed text-[#EEE7D2]/70 sm:text-base"
                >
                    Weez AI connects your docs, code, and conversations to deliver cited answers, smart automations, and zero‑friction teamwork — in one place.
                </motion.p>

                {/* Tabs + Preview */}
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                    {/* Left: tab nav + animated preview panel */}
                    <div>
                        <div className="flex w-full items-center gap-2 rounded-2xl border border-[#2b2b2b] bg-black/60 p-1">
                            {tabs.map((t) => (
                                <TabPill key={t.key} active={active === t.key} onClick={() => setActive(t.key)} icon={t.icon}>
                                    {t.label}
                                </TabPill>
                            ))}
                        </div>

                        <div className="relative mt-4">
                            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-3xl bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(238,231,210,0.12),transparent)]" />
                            <div className="overflow-hidden rounded-3xl border border-[#2b2b2b] bg-black/70 shadow-[0_12px_48px_rgba(238,231,210,0.06)]">
                                <div className="relative">
                                    <AnimatePresence mode="wait">
                                        {active === "chat" && <ChatPreview key="chat" />}
                                        {active === "search" && <SearchPreview key="search" />}
                                        {active === "automate" && <AutomatePreview key="automate" />}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: feature stack with 3D tilt cards */}
                    <div className="grid content-start gap-4 sm:grid-cols-2">
                        <TiltCard>
                            <CardIcon Icon={FolderSearch} />
                            <CardTitle>Unified knowledge</CardTitle>
                            <CardText>Index Drive, Notion, GitHub, mail & more. Ask once — get cited answers.</CardText>
                        </TiltCard>
                        <TiltCard>
                            <CardIcon Icon={Workflow} />
                            <CardTitle>Automations</CardTitle>
                            <CardText>Triggers from commits, forms or messages; route approvals; push updates.</CardText>
                        </TiltCard>
                        <TiltCard>
                            <CardIcon Icon={ShieldCheck} />
                            <CardTitle>Secure by default</CardTitle>
                            <CardText>Granular permissions, auditability, and least‑privilege access.</CardText>
                        </TiltCard>
                        <TiltCard>
                            <CardIcon Icon={Timer} />
                            <CardTitle>Lightning fast</CardTitle>
                            <CardText>Low‑latency answers and near‑realtime summaries for your team.</CardText>
                        </TiltCard>
                    </div>
                </div>

                {/* Stats + CTA */}
                <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#2b2b2b] pt-8 sm:flex-row">
                    <div className="flex flex-wrap items-center gap-6">
                        <Stat num={0.9} suffix="s" label="Avg. answer time" />
                        <Dot />
                        <Stat num={10} suffix="k+" label="Sources indexed" />
                        <Dot />
                        <Stat num={120} suffix="/day" label="Automations run" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Magnetic>
                            <motion.a
                                whileHover={{ scale: 1.04, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                href="#get-weez"
                                className="group inline-flex items-center gap-2 rounded-2xl bg-[#EEE7D2] px-5 py-2.5 font-semibold text-black shadow-[0_8px_24px_rgba(238,231,210,0.15)] transition"
                            >
                                Get Weez AI
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
                </div>
            </div>
        </section>
    );
}

/* -------------------- Subcomponents -------------------- */
function TabPill({ active, onClick, icon: Icon, children }) {
    return (
        <button
            onClick={onClick}
            className={`relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition ${
                active ? "bg-[#EEE7D2] text-black" : "text-[#EEE7D2]/80 hover:bg-white/5"
            }`}
        >
            <Icon className="h-4 w-4" />
            {children}
        </button>
    );
}

function ChatPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative p-4 sm:p-6"
        >
            <div className="space-y-3">
                <ChatBubble who="you">Summarize this doc with citations and action items.</ChatBubble>
                <ChatBubble who="weez">
                    • The doc proposes a phased rollout (Q1–Q3). <Badge>[PDF §2]</Badge>
                    <br />• Success depends on data refresh SLOs. <Badge>[Drive]</Badge>
                    <br />• Action: assign owners for ingestion pipeline. <Badge>[GitHub PR]</Badge>
                </ChatBubble>
                <ChatBubble who="you">Create a follow‑up email draft to the team.</ChatBubble>
                <ChatBubble who="weez">Draft ready. Want me to send via Gmail or Slack?</ChatBubble>
            </div>
        </motion.div>
    );
}

function SearchPreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative p-4 sm:p-6"
        >
            <div className="grid gap-3 sm:grid-cols-2">
                <ResultCard icon={BookOpenText} title="Strategy.pdf" meta="Found in /Drive/OKRs" />
                <ResultCard icon={FolderSearch} title="Onboarding Notion" meta="Workspace › Docs" />
                <ResultCard icon={Search} title="Cited answer" meta="3 sources · 97% confidence" highlight />
                <ResultCard icon={MessageSquare} title="Team thread" meta="Slack › #ops" />
            </div>
        </motion.div>
    );
}

function AutomatePreview() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="relative p-4 sm:p-6"
        >
            <div className="grid grid-cols-3 items-center gap-2 sm:gap-3">
                <FlowNode icon={Search} label="Trigger: PR merged" />
                <FlowConnector />
                <FlowNode icon={Rocket} label="Action: announce" />
                <FlowConnector vertical />
                <FlowNode icon={Workflow} label="Action: run job" />
                <FlowConnector vertical />
                <FlowNode icon={ShieldCheck} label="Gate: approval" />
            </div>
        </motion.div>
    );
}

function ChatBubble({ who, children }) {
    const isWeez = who === "weez";
    return (
        <div
            className={`max-w-[36rem] rounded-2xl border px-3 py-2 text-sm sm:px-4 sm:py-3 ${
                isWeez ? "ml-0 border-[#334]/70 bg-white/5" : "ml-auto border-[#2b2b2b] bg-black/50 text-[#EEE7D2]"
            }`}
        >
            <div className="mb-1 text-[11px] uppercase tracking-widest text-[#EEE7D2]/60">
                {isWeez ? "Weez AI" : "You"}
            </div>
            <div className="leading-relaxed text-[#EEE7D2]">{children}</div>
        </div>
    );
}

function Badge({ children }) {
    return (
        <span className="ml-1 rounded-md border border-[#444] bg-black/40 px-1.5 py-0.5 text-[10px] text-[#EEE7D2]/80">
      {children}
    </span>
    );
}

function ResultCard({ icon: Icon, title, meta, highlight }) {
    return (
        <div
            className={`rounded-xl border p-3 ${
                highlight
                    ? "border-[#EEE7D2]/40 bg-[#EEE7D2]/10 shadow-[0_8px_24px_rgba(238,231,210,0.08)]"
                    : "border-[#2b2b2b] bg-black/50"
            }`}
        >
            <div className="flex items-center gap-2">
                <div className="rounded-lg border border-[#2b2b2b] bg-black/60 p-2 text-[#EEE7D2]/80">
                    <Icon className="h-4 w-4" />
                </div>
                <div>
                    <div className="text-sm font-medium text-[#EEE7D2]">{title}</div>
                    <div className="text-xs text-[#EEE7D2]/60">{meta}</div>
                </div>
            </div>
        </div>
    );
}

function FlowNode({ icon: Icon, label }) {
    return (
        <div className="rounded-2xl border border-[#2b2b2b] bg-black/60 p-3 text-center">
            <div className="mx-auto mb-2 w-fit rounded-lg border border-[#2b2b2b] bg-black/60 p-2 text-[#EEE7D2]/80">
                <Icon className="h-4 w-4" />
            </div>
            <div className="text-xs text-[#EEE7D2]/80">{label}</div>
        </div>
    );
}

function FlowConnector({ vertical = false }) {
    return (
        <div
            className={`mx-auto h-0.5 w-8 rounded-full bg-[#2b2b2b] sm:w-10 ${vertical ? "col-span-3 h-8 w-0.5 sm:h-10" : ""}`}
        />
    );
}

function TiltCard({ children }) {
    const ref = React.useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rx = useTransform(y, [-40, 40], [8, -8]);
    const ry = useTransform(x, [-40, 40], [-8, 8]);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const onMove = (e) => {
            const r = el.getBoundingClientRect();
            x.set(e.clientX - (r.left + r.width / 2));
            y.set(e.clientY - (r.top + r.height / 2));
        };
        const onLeave = () => {
            x.set(0); y.set(0);
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        return () => {
            el.removeEventListener("mousemove", onMove);
            el.removeEventListener("mouseleave", onLeave);
        };
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            className="rounded-2xl border border-[#2b2b2b] bg-black/60 p-5 shadow-[0_12px_48px_rgba(238,231,210,0.06)]"
        >
            {children}
        </motion.div>
    );
}

function CardIcon({ Icon }) {
    return (
        <div className="mb-3 w-fit rounded-xl border border-[#2b2b2b] bg-black/60 p-2 text-[#EEE7D2]/80">
            <Icon className="h-4 w-4" />
        </div>
    );
}
function CardTitle({ children }) { return <div className="text-sm font-semibold text-[#EEE7D2]">{children}</div>; }
function CardText({ children }) { return <div className="mt-1 text-xs text-[#EEE7D2]/70">{children}</div>; }

function Dot() { return <span className="h-1 w-1 rounded-full bg-[#EEE7D2]/50" />; }

function Stat({ num, suffix, label }) {
    const [val, setVal] = React.useState(0);
    const target = num;
    React.useEffect(() => {
        let raf; let start;
        const dur = 900;
        const tick = (t) => {
            if (!start) start = t;
            const p = Math.min(1, (t - start) / dur);
            setVal(target * (0.5 - Math.cos(Math.PI * p) / 2));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target]);
    return (
        <div className="flex items-baseline gap-1">
            <div className="text-2xl font-bold tabular-nums">{val.toFixed(target < 10 ? 1 : 0)}{suffix}</div>
            <div className="text-xs text-[#EEE7D2]/60">{label}</div>
        </div>
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
        const onLeave = () => { s.tx = 0; s.ty = 0; if (!frame) tick(); };

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
