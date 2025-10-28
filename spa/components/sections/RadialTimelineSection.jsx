"use client";
import React from "react";
import { Brain, CalendarDays, Cog, Rocket, Sparkles, Workflow, ShieldCheck } from "lucide-react";
import RadialOrbitalTimeline from "../RadialOrbitalTimeline";

export default function RadialTimelineSection() {
    const data = [
        {
            id: 1,
            title: "Weez AI Alpha",
            date: "2024-11-10",
            content: "Vision, problem–solution fit, and initial ICP for an AI workspace assistant.",
            category: "phase",
            icon: Sparkles,
            relatedIds: [2, 3],
            status: "completed",
            energy: 88,
        },
        {
            id: 2,
            title: "Index & Search",
            date: "2024-12-01",
            content: "Connect Drive/Notion/GitHub; embeddings + cited answers with confidence.",
            category: "capability",
            icon: Brain,
            relatedIds: [1, 4, 5],
            status: "completed",
            energy: 84,
        },
        {
            id: 3,
            title: "Chat Assist",
            date: "2025-01-05",
            content: "Actionable chat: summaries, follow-ups, and source trails across tools.",
            category: "capability",
            icon: Cog,
            relatedIds: [1, 5],
            status: "in-progress",
            energy: 72,
        },
        {
            id: 4,
            title: "Automations",
            date: "2025-02-02",
            content: "Triggers from PRs/emails/forms; approvals, routing, and updates.",
            category: "engine",
            icon: Workflow,
            relatedIds: [2, 6],
            status: "in-progress",
            energy: 65,
        },
        {
            id: 5,
            title: "Security & Controls",
            date: "2025-02-20",
            content: "Granular permissions, audit logs, least-privilege access.",
            category: "security",
            icon: ShieldCheck,
            relatedIds: [2, 3, 6],
            status: "in-progress",
            energy: 61,
        },
        {
            id: 6,
            title: "Launch — Weez AI",
            date: "2025-03-25",
            content: "Docs, onboarding flows, demo content, and early-access cohort.",
            category: "launch",
            icon: Rocket,
            relatedIds: [4, 5],
            status: "pending",
            energy: 54,
        },
    ];

    return (
        <section className="relative bg-black text-[#EEE7D2]">
            <div className="mx-auto max-w-[80rem] px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold">What Weez AI does best</h2>
                <p className="mt-2 text-[#EEE7D2]/70">
                    Turn scattered files and tools into a single source of truth you can ask and automate.
                </p>
            </div>
            <RadialOrbitalTimeline timelineData={data} />
        </section>
    );
}
