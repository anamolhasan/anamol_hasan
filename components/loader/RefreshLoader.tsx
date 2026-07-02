"use client";
import { useEffect, useState } from "react";

export default function RefreshLoader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
    if (nav?.type === "reload") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-white" />
    </div>
  );
}