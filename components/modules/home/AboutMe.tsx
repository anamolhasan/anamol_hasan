import React from "react";

const AboutMe = () => {
  return (
    <section id="about-me" className="w-full py-16 px-4 flex justify-center">
      
      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-emerald-400/20 blur-3xl rounded-full -z-10" />

      {/* Glass Card */}
      <div className="relative max-w-4xl w-full backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 md:p-14 transition-all duration-500 hover:scale-[1.02] hover:border-emerald-400/40">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="text-emerald-400">About</span> Me
        </h2>

        {/* Content */}
        <div className="space-y-6 text-gray-800 leading-relaxed text-base md:text-lg">

          <p className="hover:text-green-600 transition duration-300">
            I am an aspiring Full Stack Developer with a deep passion for building engaging and interactive web experiences. Although I am still at the early stage of my career, my enthusiasm for learning and strong commitment to improving my skills continuously help me grow as a developer. I am fully dedicated to mastering the tools and technologies required to build beautiful, responsive, and user-friendly web applications from front to back.
          </p>

          <p className="hover:text-green-600 transition duration-300">
            My journey into Full Stack Development started with a curiosity about how websites work and how complete, functional, and interactive digital systems are built. Since then, I have developed a strong foundation in HTML, CSS, and JavaScript, along with familiarity in modern frontend frameworks like React. On the backend side, I have been learning technologies such as Node.js and Express.js, along with basic understanding of databases like MongoDB and SQL.
          </p>

          <p className="hover:text-green-600 transition duration-300">
            I am especially passionate about writing clean, scalable, and accessible code that ensures a seamless user experience across the entire stack. Whether it’s creating pixel-perfect frontend interfaces or building APIs, authentication systems, and database logic on the backend, I approach every project with strong attention to detail.
          </p>

          <p className="text-emerald-600 font-medium">
            My goal is to become a strong Full Stack Developer and bring creative ideas to life on the web.
          </p>

        </div>
      </div>
    </section>
  );
};

export default AboutMe;