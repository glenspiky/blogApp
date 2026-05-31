"use client";

import HeroButton from "@/components/shared/HeroButton";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex items-center p-6 md:p-16 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8 items-center justify-between w-full">
        {/* Left Column: Premium Editorial Content Typography */}
        <div className="flex flex-1 flex-col items-start justify-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 w-full"
          >
            {/* Unified heading block for clean tracking-tight layout */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-tighter leading-[1.05] uppercase">
              The Nairobian <br />
              <span className="text-zinc-400">Magazine &</span> <br />
              Blog Website
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl font-sans max-w-md tracking-wide leading-relaxed">
              Stories from the heart of Nairobi&apos;s active creative art and
              culture scene.
            </p>

            <div className="mt-4">
              <HeroButton />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Floating Double Page Layout Animation */}
        <div className="flex flex-1 justify-center lg:justify-end w-full max-w-[650px]">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1,
              ease: [0.16, 1, 0.3, 1], // Custom cinematic cubic-bezier curve
              delay: 0.2,
            }}
            className="w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
          >
            <Image
              alt="The Nairobian Magazine Cover Showcase Layout"
              src="/mag.png"
              width={650}
              height={750}
              priority
              className="w-full h-auto object-contain selection:bg-transparent"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
