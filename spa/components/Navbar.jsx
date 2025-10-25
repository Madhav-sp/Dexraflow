import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollFadeBrand from "./ScrollFadeBrand";

const links = [
  { href: "#features", label: "Features" },
  { href: "#use-cases", label: "Solutions" },
  { href: "#integrations", label: "Integrations" },
  { href: "#pricing", label: "Pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
      <header className="sticky top-0 z-50 bg-black/90 text-[#EEE7D2] backdrop-blur">
        <div className="container-x h-16 flex items-stretch justify-between">
          <a href="#" className="flex items-center">
            <ScrollFadeBrand
                text="DEXRAFLOW"
                anchorIndex={0}          // keep first letter solid; use text.length-1 to keep last
                base="#EEE7D2"
                accent="#EEE7D2"
                fadeDistance={260}
                className="h-7"
            />
            <span className="sr-only">Dexraflow</span>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {links.map((l) => (
                <a
                    key={l.href}
                    href={l.href}
                    className="text-[#EEE7D2]/90 hover:text-[#EEE7D2]"
                >
                  {l.label}
                </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <a
                href="#get-started"
                className="btn rounded-xl px-4 py-2 font-semibold"
                style={{ backgroundColor: "#EEE7D2", color: "#0b0b0b" }}
            >
              Get started
            </a>
          </div>

          <button
              className="md:hidden btn border border-neutral-700 text-[#EEE7D2]"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
              <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden border-t border-neutral-800 bg-black text-[#EEE7D2]"
              >
                <div className="container-x py-4 flex flex-col gap-3">
                  {links.map((l) => (
                      <a key={l.href} href={l.href} className="py-1 text-[#EEE7D2]/90 hover:text-[#EEE7D2]">
                        {l.label}
                      </a>
                  ))}
                  <a
                      href="#get-started"
                      className="mt-2 btn rounded-xl px-4 py-2 font-semibold"
                      style={{ backgroundColor: "#EEE7D2", color: "#0b0b0b" }}
                  >
                    Get started
                  </a>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </header>
  );
}
