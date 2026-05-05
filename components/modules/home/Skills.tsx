import TestimonialMarqueeDemo from "@/components/shadcn-space/marquee/marquee-01";
import CodeProfile from "@/components/shared/CodeProfile";
import React from "react";

const Skills = () => {
  return (
    <section className="w-full py-20 px-4 md:px-10 bg-gradient-to-b from-white to-gray-50 dark:from-zinc-950 dark:to-black">

      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-sm uppercase tracking-widest text-emerald-500 font-semibold">
          Projects
        </p>

        <h1 className="text-3xl md:text-5xl font-bold mt-2 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
          My Skills
        </h1>

        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm md:text-base">
          Technologies and tools I use to build modern, scalable, and high-performance applications.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

  {/* Left - Marquee (CENTERED) */}
  <div className="relative flex items-center justify-center min-h-[400px] rounded-xl overflow-hidden">

    {/* fade effect */}
    <div className="absolute inset-0  pointer-events-none z-10" />

   <div className="w-full flex flex-col justify-center">
      <TestimonialMarqueeDemo />
    </div>

  </div>

  {/* Right - Code Profile */}
  <div className="flex justify-center lg:justify-end">
    <div className="w-full max-w-2xl">
      <div className="shadow-2xl shadow-emerald-500/10 rounded-xl">
        <CodeProfile />
      </div>
    </div>
  </div>

</div>
    </section>
  );
};

export default Skills;