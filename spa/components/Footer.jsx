"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, Square as FrameIcon } from "lucide-react";


const footerLinks = [
  {
    label: "Product",
    links: [
      { title: "Features", href: "#features" },
      { title: "Pricing", href: "#pricing" },
      { title: "Testimonials", href: "#testimonials" },
      { title: "Integration", href: "/" },
    ],
  },
  {
    label: "Company",
    links: [
      { title: "FAQs", href: "/faqs" },
      { title: "About Us", href: "/about" },
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Services", href: "/terms" },
    ],
  },
  {
    label: "Resources",
    links: [
      { title: "Blog", href: "/blog" },
      { title: "Changelog", href: "/changelog" },
      { title: "Brand", href: "/brand" },
      { title: "Help", href: "/help" },
    ],
  },
  {
    label: "Social Links",
    links: [
      { title: "Facebook", href: "#", icon: Facebook },
      { title: "Instagram", href: "https://www.instagram.com/dexraflow/", icon: Instagram },
      { title: "Youtube", href: "https://www.youtube.com/@dexraofficial", icon: Youtube },
      { title: "LinkedIn", href: "https://www.linkedin.com/company/dexraflow", icon: Linkedin },
    ],
  },
];

export default function Footer() {
  return (
      <footer className="relative w-full border-t border-[#262626] bg-black text-[#EEE7D2] px-6 py-12 lg:py-16">
        {/* thin glow at top */}
        <div className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EEE7D2]/20 blur" />

        <div className="mx-auto grid w-full max-w-6xl gap-8 xl:grid-cols-3 xl:gap-10">
          <AnimatedContainer className="space-y-4">
            <div className="inline-flex items-center gap-2">
              {/*<FrameIcon className="h-7 w-7 text-[#EEE7D2]" />*/}
              <img src={"/favicon.svg"} className="h-7 w-7 text-[#EEE7D2]"  alt={"Logo"}/>
              <span className="text-lg font-semibold tracking-wide">DEXRAFLOW</span>
            </div>
            <p className="mt-2 text-sm text-[#EEE7D2]/70">
              © {new Date().getFullYear()} Dexraflow. All rights reserved.
            </p>
          </AnimatedContainer>

          <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
            {footerLinks.map((section, index) => (
                <AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
                  <div className="mb-6 md:mb-0">
                    <h3 className="text-xs uppercase tracking-widest text-[#EEE7D2]/80">
                      {section.label}
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm">
                      {section.links.map((link) => (
                          <li key={link.title}>
                            <a
                                href={link.href}
                                className="inline-flex items-center gap-2 text-[#EEE7D2]/70 transition-colors hover:text-[#EEE7D2]"
                            >
                              {link.icon && <link.icon className="h-4 w-4" />}
                              {link.title}
                            </a>
                          </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
            ))}
          </div>
        </div>

        {/* bottom bar */}
        <div className="mx-auto mt-10 flex w-full max-w-6xl flex-col items-center justify-between gap-4 border-t border-[#262626] pt-6 sm:flex-row">
          <div className="flex items-center gap-4">
            {footerLinks[3].links.map((s) => {
              const Icon = s.icon;
              return (
                  <a
                      key={s.title}
                      href={s.href}
                      aria-label={s.title}
                      className="rounded-full border border-[#262626] p-2 text-[#EEE7D2]/80 transition hover:border-[#EEE7D2]/40 hover:text-[#EEE7D2]"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                  </a>
              );
            })}
          </div>
        </div>
      </footer>
  );
}

function AnimatedContainer({ className = "", delay = 0.1, children }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;

  return (
      <motion.div
          initial={{ filter: "blur(4px)", y: -8, opacity: 0 }}
          whileInView={{ filter: "blur(0px)", y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.8 }}
          className={className}
      >
        {children}
      </motion.div>
  );
}
