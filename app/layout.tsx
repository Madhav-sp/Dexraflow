import "./globals.css";
import Providers from "./providers";
export const metadata = {
  title: "Converted Next.js App",
  description: "Your React app mounted inside Next.js (App Router)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      import Providers from "./providers";
<body>
      <Providers>{children}      </Providers>
    </body>
    </html>
  );
}