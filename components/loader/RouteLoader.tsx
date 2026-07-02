"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-1 overflow-hidden bg-transparent">
      <div className="h-full w-1/3 animate-[loaderbar_1s_ease-in-out_infinite] bg-white" />
    </div>
  );
}