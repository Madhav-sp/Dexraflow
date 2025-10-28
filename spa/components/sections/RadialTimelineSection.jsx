"use client";
import React from "react";
import { Brain, CalendarDays, Cog, Rocket, Sparkles, Workflow } from "lucide-react";
import RadialOrbitalTimeline from "../RadialOrbitalTimeline";

export default function RadialTimelineSection() {
    const data = [
        { id: 1, title: "Discovery", date: "2025-01-12", content: "Initial research and scoping of Dexraflow's workflow model.", category: "phase", icon: Sparkles, relatedIds: [2, 3], status: "completed", energy: 82 },
        { id: 2, title: "Design System", date: "2025-02-04", content: "Tokens, components, motion, dark theme (#EEE7D2).", category: "design", icon: Cog, relatedIds: [1, 4], status: "in-progress", energy: 64 },
        { id: 3, title: "AI Core", date: "2025-02-22", content: "Indexing, embeddings, retrieval, and guardrails.", category: "ai", icon: Brain, relatedIds: [1, 5], status: "in-progress", energy: 72 },
        { id: 4, title: "Workflow Engine", date: "2025-03-10", content: "Pipelines, triggers, and automations.", category: "engine", icon: Workflow, relatedIds: [2, 6], status: "pending", energy: 45 },
        { id: 5, title: "Launch Prep", date: "2025-03-30", content: "Docs, onboarding, and demo content.", category: "ops", icon: Rocket, relatedIds: [3, 6], status: "pending", energy: 38 },
        { id: 6, title: "Roadmap 2.0", date: "2025-04-15", content: "Feedback loop and next milestones.", category: "planning", icon: CalendarDays, relatedIds: [2, 5], status: "pending", energy: 50 },
    ];

    return (
        <section className="relative bg-black text-[#EEE7D2]">
            <div className="mx-auto max-w-[80rem] px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-bold">What Dexraflow does best</h2>
                <p className="mt-2 text-[#EEE7D2]/70">Turn scattered files and tools into a single source of truth you can ask and automate.</p>
            </div>
            <RadialOrbitalTimeline timelineData={data} />
        </section>
    );
}
