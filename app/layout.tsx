import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";
import GlobalHeroCursor from "../spa/components/GlobalHeroCursor";
const inter = Inter({ subsets: ["latin"], display: "swap" });
export const metadata = {
    title: "DexraFlow",
    description: "Where AI meets effortless flow",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.ico",
        apple: "/apple-touch-icon.png",
        other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#111111" }],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>
        <Providers>{children}</Providers>
        <GlobalHeroCursor color="#EEE7D2" size={16} blend={true} glow={true} />
        </body>
        </html>
    );
}