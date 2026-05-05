import ButtonHeartbeatEffectDemo from "@/components/shadcn-space/button/button-04";
import MarqueeBrandsDemo from "@/components/shadcn-space/marquee/marquee-02";
import { Download } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  const downloadCv = "Download Resume";
  const downloadIcon = <Download />;
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
      {/* Left Side - Image */}
      <div className="flex justify-center md:justify-start relative group">
        {/* Main Image */}
        <Image
          src="/anamolhasan.jpg"
          alt="Anamol Hasan"
          width={450}
          height={600}
          className="object-cover shadow-2xl transition duration-500 group-hover:scale-105 [clip-path:polygon(50%_0%,83%_12%,100%_43%,94%_78%,68%_100%,32%_100%,6%_78%,0%_43%,17%_12%)]"
        />

        {/* Bottom Center Icon */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 md:-translate-x-3/2
                  transition duration-500
                  group-hover:scale-110 group-hover:-translate-y-1"
        >
          <Image
            src="/logo/codebg.png"
            alt="code icon"
            width={50}
            height={50}
            className="drop-shadow-lg"
          />
        </div>
      </div>
      {/* Right Side */}
      <div className="space-y-6 text-center md:text-left">
        {/* Intro */}
        <div className="text-pink-500 text-sm md:text-base font-mono">
          &lt;span&gt;
          <span className="text-gray-800 dark:text-gray-200">
            {" "}
            Hey, I&apos;m Anamol Hasan !
          </span>
          &lt;/span&gt;
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          I am{" "}
          <span className="text-emerald-500 ">
            {"{Full"}
            <br />
            {" Stack} "}
          </span>
          <span className="text-gray-900 dark:text-white">
            Web & App Developer_
          </span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
          <span className="text-pink-500">&lt;p&gt;</span>
          {" With expertise in "}
          <span className="text-emerald-500">NodeJS</span>,{" "}
          <span className="text-emerald-500">React</span>,{" "}
          <span className="text-emerald-500">Next.js</span>,{" "}
          <span className="text-emerald-500">Tailwind CSS</span>
          {", I build modern, scalable and high-performance web applications."}
          <span className="text-pink-500">&lt;/p&gt;</span>
        </p>

        {/* Marquee */}
        <div className="flex items-center gap-0 pt-2 w-full">
          {/* Marquee - 2/3 */}
          <div className="w-2/3">
            <MarqueeBrandsDemo />
          </div>

          {/* Text - 1/3 */}
          <div className="w-1/3 flex justify-start">
            <span className="text-md font-bold text-gray-700">...and more</span>
          </div>
        </div>

        {/* Button */}
        <div className="pt-4 flex justify-center md:justify-start">
          <ButtonHeartbeatEffectDemo
            downloadCv={downloadCv}
            downloadIcon={downloadIcon}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
