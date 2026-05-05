import React from "react";

export default function CodeProfile() {
  return (
    <div className="flex items-center justify-center p-4 font-sans bg-white dark:bg-zinc-950">
      <CoderProfileCard />
    </div>
  );
}

const coderData = {
  frontEnd:
    "HTML, CSS, Tailwind, JavaScript, TypeScript, React, Next.js, Redux, TanStack, Shadcn, Motion",
  backEnd:
    "Node.js, Express, Golang, Firebase, JWT, Zod, Stripe, Cloudinary",
  database: "MongoDB, Mongoose, PostgreSQL, Prisma, NeonDB",
  tools: "VS Code, Git, GitHub, Postman, Figma, Vercel",
  others: "RESTful APIs",
  softSkills:
    "Team Management, Time Management, Adaptability, Leadership, Communication",

  role: "Full Stack Developer",
  seniority: "Junior / Entry Level",
  location: "Bangladesh",
};

const CoderProfileCard = () => {
  return (
    <div className="max-w-2xl w-full mx-auto bg-gradient-to-r from-zinc-100 to-zinc-200 dark:from-[#000000] dark:to-[#0a0d37] border-zinc-300 dark:border-[#1b2c68a0] relative rounded-lg border shadow-lg">
      <div className="flex flex-row">
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>

      <div className="px-4 lg:px-8 py-5 flex justify-between items-center bg-zinc-200 dark:bg-[#000000]">
        <div className="flex flex-row space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-orange-400"></div>
          <div className="h-3 w-3 rounded-full bg-green-400"></div>
        </div>
        <div className="text-xs text-zinc-600 dark:text-gray-400 font-mono">
          skills.js
        </div>
      </div>

      <div className="overflow-hidden border-t-[2px] border-zinc-300 dark:border-indigo-900 px-4 lg:px-8 py-4 lg:py-8 relative">
        <div className="absolute -top-24 -left-24 w-56 h-56 bg-blue-600 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-56 h-56 bg-pink-600 rounded-full opacity-10 blur-3xl"></div>

        <div className="relative flex">
          <div className="hidden md:flex flex-col items-end pr-4 text-zinc-600 dark:text-gray-500 font-mono text-xs">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="leading-relaxed select-none opacity-70">
                {i + 1}
              </div>
            ))}
          </div>

          <code className="font-mono text-xs md:text-sm lg:text-base w-full">
            <div>
              <span className="mr-2 text-pink-500">const</span>
              <span className="mr-2 text-violet-500">skills</span>
              <span className="mr-2 text-pink-500">=</span>
              <span className="text-zinc-600 dark:text-gray-400">{"{"}</span>
            </div>

            <div className="pl-6">
              <span>frontEnd:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.frontEnd}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>backEnd:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.backEnd}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>database:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.database}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>tools:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.tools}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>role:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.role}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>seniority:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.seniority}&quot;
              </span>
              ,
            </div>

            <div className="pl-6">
              <span>location:</span>{" "}
              <span className="text-green-500">
                &quot;{coderData.location}&quot;
              </span>
              ,
            </div>

            <div>
              <span className="text-zinc-600">{"};"}</span>
            </div>
          </code>
        </div>
      </div>

      <div className="px-4 lg:px-8 pb-4 mt-4 border-t border-zinc-300 dark:border-gray-800 pt-3 text-xs text-zinc-600 dark:text-gray-500 flex justify-between">
        <span>UTF-8</span>
        <span>Full Stack</span>
        <span>Ln 10, Col 2</span>
      </div>
    </div>
  );
};