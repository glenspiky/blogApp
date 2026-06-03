"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import TechLogo from "./logo";
import { Button } from "@/components/ui/button";
// 1. Import Sheet components from your Shadcn installation
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
// 2. Import the Menu (hamburger) icon from lucide-react
import { Menu } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Controls mobile sheet drawer state

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Blogs", href: "/blogs" },
    { name: "Create", href: "/create" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="w-full bg-black text-white border-b border-zinc-900 sticky top-0 z-50">
      <nav className="flex justify-between p-4 items-center max-w-7xl mx-auto w-full">
        {/* LOGO AREA */}
        <div className="text-3xl md:text-4xl">
          <TechLogo />
        </div>

        {/* DESKTOP NAVIGATION: Hidden on mobile screens, flexing at 'md' breakdown */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Button
                key={link.href}
                variant="link"
                asChild
                className={`text-xl cursor-pointer rounded-none transition-all pb-1 h-auto border-b-2 ${
                  isActive
                    ? "border-white text-white no-underline hover:no-underline"
                    : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                <Link href={link.href}>{link.name}</Link>
              </Button>
            );
          })}

          <Button className="text-lg bg-emerald-500 hover:bg-emerald-600 text-black rounded-sm px-4 py-2 h-9 cursor-pointer ml-4">
            Login
          </Button>
        </div>

        {/* MOBILE NAVIGATION: Visible on small screens, hidden at 'md' layout breakpoint */}
        <div className="flex md:hidden items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            {/* The Hamburger Button Trigger */}
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-zinc-900 cursor-pointer"
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>

            {/* Slide out drawer content container */}
            <SheetContent
              side="right"
              className="bg-zinc-950 text-white border-zinc-900 w-[280px]"
            >
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-2xl text-white font-bold tracking-tighter">
                  <TechLogo />
                </SheetTitle>
              </SheetHeader>

              {/* Stacked Vertical Mobile Nav Layout */}
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)} // Close drawer smoothly on link tap
                      className={`text-2xl ml-5 font-medium transition-colors ${
                        isActive
                          ? "text-emerald-400 font-semibold"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}

                <hr className="border-zinc-900 my-2" />
                <Link href="/login">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="text-xl bg-emerald-500 text-black hover:bg-emerald-600 rounded-sm py-6 w-full cursor-pointer"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
