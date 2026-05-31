"use client";

import Link from "next/link";
import TechLogo from "./logo";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    magazine: [
      { name: "Features", href: "/features" },
      { name: "Latest Issues", href: "/issues" },
      { name: "Culture & Arts", href: "/culture" },
      { name: "Nairobi Life", href: "/life" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contributors", href: "/contributors" },
      { name: "Advertise", href: "/advertise" },
      { name: "Contact", href: "/contact" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Copyright", href: "/copyright" },
    ],
  };

  return (
    <footer className="w-full bg-black text-white border-t border-zinc-900 pt-16 pb-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
        {/* UPPER GRID SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-8 pb-12 border-b border-zinc-900">
          {/* Brand Identity Column */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="text-4xl">
              <TechLogo />
            </div>
            <p className="text-zinc-400 text-base max-w-sm font-sans leading-relaxed">
              Stories from the heart of Nairobi&apos;s active creative art and
              culture scene. Documenting the rhythm of the city.
            </p>
          </div>

          {/* Links Column 1: Magazine */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-zinc-200">
              Magazine
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.magazine.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-base font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2: Company */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-zinc-200">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 hover:text-white transition-colors text-base font-sans"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 3: Newsletter Form */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold text-sm tracking-widest uppercase text-zinc-200">
              Newsletter
            </h3>
            <p className="text-zinc-400 text-sm font-sans leading-relaxed">
              Get weekly editorial drops directly to your inbox.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-2 mt-1"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="w-full bg-zinc-950 border border-zinc-800 text-white font-sans rounded-sm px-3 py-2 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
              />
              <Button
                type="submit"
                className="w-full bg-white text-black hover:bg-zinc-200 text-sm font-medium rounded-sm py-2 transition-colors cursor-pointer"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* LOWER UTILITY SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-sans text-zinc-500 tracking-wide">
          <div>&copy; {currentYear} THE NAIROBIAN. All rights reserved.</div>

          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-zinc-300 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* <-- Fixed closing parent layout wrapper node */}
    </footer>
  );
}
