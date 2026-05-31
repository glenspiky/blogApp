"use client";
import { motion } from "framer-motion";
export default function TechLogo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="font-sans text-3xl font-bold tracking-tight text-white flex items-center gap-1 select-none cursor-pointer group"
    >
      <div className="font-sans text-3xl tracking-tighter select-none">
        <span className="font-normal text-gray-400">nairo</span>
        <span className="font-bold text-white tracking-tight">bian</span>
        <span className="text-emerald-500 font-extrabold">.</span>
      </div>

      {/* Animated accent bar that breathes/pulses */}
      <motion.span
        animate={{ scaleY: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-1 h-6 bg-emerald-500 rounded-full origin-center group-hover:bg-emerald-400 transition-colors"
      />
    </motion.div>
  );
}
