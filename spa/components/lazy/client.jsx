"use client";
import dynamic from "next/dynamic";

const WeezProductShowcase = dynamic(() => import("../WeezProductShowcase"), {
    ssr: false,
    loading: () => (
        <div className="h-[520px] w-full bg-black/30 rounded-3xl border border-[#2b2b2b]" />
    ),
});

export default WeezProductShowcase;