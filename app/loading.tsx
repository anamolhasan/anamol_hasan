"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate as animateValue } from "framer-motion";
import Image from "next/image";

export default function Loading() {

  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (v) => `${v}%`);
  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    // আসল data কখন load শেষ হবে জানা নেই, তাই 95% পর্যন্ত animate করে
    // হোল্ড করে রাখবে — page ready হলে Next.js নিজেই এই component
    // unmount করে দেবে, তাই 100% পর্যন্ত যাওয়ার দরকার নেই
    const controls = animateValue(progress, 95, {
      duration: 2.5,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [progress]);

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black">
      {/* Logo */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative h-24 w-24 overflow-hidden rounded-2xl ring-1 ring-white/10"
      >
        <Image
          src="/anamolhasan.jpg"
          alt="Anamol Hasan"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-5 text-lg font-semibold tracking-wide text-white"
      >
        Anamol Hasan
      </motion.h1>

      {/* Full Stack Dev badge */}
      <motion.span
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="mt-2 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs font-medium tracking-wider text-white/70"
      >
        FULL STACK DEVELOPER
      </motion.span>

      {/* Random message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-6 text-xs text-white/40"
      >
        LOADING...
      </motion.p>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full rounded-full bg-white" style={{ width: progressWidth }} />
      </div>

      {/* Progress % */}
      <motion.span className="mt-2 text-[11px] tabular-nums text-white/40">
        {progressText}
      </motion.span>
    </div>
  );
}