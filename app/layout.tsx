import "./globals.css";
import Providers from "./providers";

export const metadata = {
    title: "Converted Next.js App",
    description: "Your React app mounted inside Next.js (App Router)",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className="bg-black text-[#EEE7D2]">
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
