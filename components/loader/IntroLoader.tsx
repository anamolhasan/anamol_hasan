"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate as animateValue,
} from "framer-motion";
import Image from "next/image";
import { getRandomMessage } from "./getRandomMessage";

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const [message] = useState(() => getRandomMessage());
  const [visible, setVisible] = useState(true);

  const progress = useMotionValue(0);
  const progressWidth = useTransform(progress, (v) => `${v}%`);
  const progressText = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const controls = animateValue(progress, 100, {
      duration: 1.8,
      ease: "easeInOut",
      onComplete: () => {
        setVisible(false);
        setTimeout(onFinish, 600);
      },
    });
    return () => controls.stop();
  }, [progress, onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
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
            {message}
          </motion.p>

          {/* Progress bar */}
          <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-white"
              style={{ width: progressWidth }}
            />
          </div>

          {/* Progress % */}
          <motion.span className="mt-2 text-[11px] tabular-nums text-white/40">
            {progressText}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}