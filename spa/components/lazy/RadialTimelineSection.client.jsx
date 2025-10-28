"use client";
import dynamic from "next/dynamic";

const RadialTimelineSection = dynamic(
    () => import("../../spa/components/sections/RadialTimelineSection"),
    {
        ssr: false,
        loading: () => (
            <div className="h-[480px] w-full bg-black/20 rounded-2xl border border-[#2b2b2b]" />
        ),
    }
);

export default RadialTimelineSection;
