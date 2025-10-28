"use client";
import React from "react";

// tiny cn helper so we don't depend on "@/lib/utils"
function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

// === FeatureCard (pure JSX) ===
function FeatureCard({ feature, className = "", ...props }) {
    const p = genRandomPattern();
    const Icon = feature.icon;
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl p-6 border border-[#262626] bg-black text-[#EEE7D2]",
                className
            )}
            {...props}
        >
            {/* subtle grid glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#EEE7D2]/5 to-transparent [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                    <GridPattern
                        width={20}
                        height={20}
                        x="-12"
                        y="4"
                        squares={p}
                        className="absolute inset-0 h-full w-full mix-blend-overlay fill-[#EEE7D2]/5 stroke-[#EEE7D2]/25"
                    />
                </div>
            </div>

            {Icon ? <Icon className="h-6 w-6 text-[#EEE7D2]/80" strokeWidth={1} aria-hidden /> : null}

            <h3 className="mt-6 text-sm md:text-base font-semibold tracking-tight">{feature.title}</h3>
            <p className="relative z-20 mt-2 text-xs md:text-sm font-light text-[#EEE7D2]/70">
                {feature.description}
            </p>
        </div>
    );
}

function GridPattern({ width, height, x, y, squares, ...props }) {
    const patternId = React.useId();
    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse" x={x} y={y}>
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([sx, sy], index) => (
                        <rect key={index} width={width + 1} height={height + 1} x={sx * width} y={sy * height} />
                    ))}
                </svg>
            )}
        </svg>
    );
}

function genRandomPattern(length) {
    const L = typeof length === "number" ? length : 5;
    return Array.from({ length: L }, () => [
        Math.floor(Math.random() * 4) + 7, // x: 7..10
        Math.floor(Math.random() * 6) + 1, // y: 1..6
    ]);
}

// === Integrations (drop-in replacement) ===
export default function Integrations() {
    const features = [
        {
            title: "Slack",
            icon: (props) => (
                <svg viewBox="0 0 24 24" {...props}>
                    <circle cx="6" cy="12" r="2" />
                    <circle cx="12" cy="6" r="2" />
                    <circle cx="12" cy="18" r="2" />
                    <circle cx="18" cy="12" r="2" />
                </svg>
            ),
            description: "Send alerts, summaries, and approvals directly into your channels.",
        },
        {
            title: "Google Drive",
            icon: (props) => (
                <svg viewBox="0 0 24 24" {...props}>
                    <path d="M6 18h12l-6-10z" />
                    <path d="M6 18l4-7" />
                    <path d="M18 18l-4-7" />
                </svg>
            ),
            description: "Index docs & decks; answer with citations you can trust.",
        },
        {
            title: "Notion",
            icon: (props) => <svg viewBox="0 0 24 24" {...props}><rect x="5" y="5" width="14" height="14" rx="2" /></svg>,
            description: "Sync your workspace pages and automate recurring updates.",
        },
        {
            title: "GitHub",
            icon: (props) => (
                <svg viewBox="0 0 24 24" {...props}>
                    <path d="M12 2C7 2 3 6 3 11c0 4 3 7 6 8v-3c-2 0-2-1-3-2 2 0 2 1 4 1v-2c-2 0-3-1-3-3 0-1 0-2 1-3 0 0 2 0 4 2 2-2 4-2 4-2 1 1 1 2 1 3 0 2-1 3-3 3v2c2 0 2-1 4-1-1 1-1 2-3 2v3c3-1 6-4 6-8 0-5-4-9-9-9z" />
                </svg>
            ),
            description: "Trigger flows from PR events and ship faster with AI code notes.",
        },
        {
            title: "Gmail",
            icon: (props) => (
                <svg viewBox="0 0 24 24" {...props}>
                    <path d="M3 8l9 6 9-6v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <path d="M3 8l9 6 9-6L12 2 3 8z" />
                </svg>
            ),
            description: "Summarize threads and route approvals to the right owners.",
        },
        {
            title: "Jira",
            icon: (props) => <svg viewBox="0 0 24 24" {...props}><path d="M4 12l8-8 8 8-8 8-8-8z" /></svg>,
            description: "Sync issues, labels, and SLAs into a single command center.",
        },
    ];

    return (
        <section className="relative border-amber-400 ">
            <div className="max-w-[80rem] mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#EEE7D2]">Works with your stack</h2>
                <p className="mt-2 max-w-2xl text-sm md:text-base text-[#EEE7D2]/70">
                    Connect Dexraflow to the tools your team already uses.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {features.map((f) => (
                        <FeatureCard className={"border-4 border-amber-200"} key={f.title} feature={f} />
                    ))}
                </div>

                <div className="mt-6 text-xs md:text-sm text-[#EEE7D2]/60">
                    More coming soon: Jira, Confluence, Zendesk, Asana.
                </div>
            </div>
        </section>
    );
}
