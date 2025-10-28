"use client";
import dynamic from "next/dynamic";

const SPA = dynamic(() => import("../spa/App.jsx"), { ssr: false });

export default function SPAApp() {
    return <SPA />;
}
