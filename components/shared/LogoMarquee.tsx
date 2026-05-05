// "use client";
// import Image from "next/image";
// import React from "react";

// const logos1 = [
//   { id: 1, src: "/anam.jpg" },
//   { id: 2, src: "/anam.jpg" },
//   { id: 3, src: "/anam.jpg" },
//   { id: 4, src: "/anam.jpg" },
//   { id: 5, src: "/anam.jpg" },
//   { id: 6, src: "/anam.jpg" },
//   { id: 7, src: "/anam.jpg" },
//   { id: 8, src: "/anam.jpg" },
//   { id: 9, src: "/anam.jpg" },
// ];

// const logos2 = [
//   { id: 1, src: "/anam.jpg" },
//   { id: 2, src: "/anam.jpg" },
//   { id: 3, src: "/anam.jpg" },
//   { id: 4, src: "/anam.jpg" },
//   { id: 5, src: "/anam.jpg" },
//   { id: 6, src: "/anam.jpg" },
//   { id: 7, src: "/anam.jpg" },
//   { id: 8, src: "/anam.jpg" },
//   { id: 9, src: "/anam.jpg" },
// ];

// const Marquee = ({
//   logos,
//   direction = "forwards",
// }: {
//   logos: typeof logos1;
//   direction?: string;
// }) => {
//   const numItems = logos.length;
//   const speed = "25s";
//   const itemWidth = "90px";
//   const itemGap = "15px";

//   return (
//     <div
//       className="max-w-full overflow-hidden"
//       style={
//         {
//           "--speed": speed,
//           "--numItems": numItems,
//           "--item-width": itemWidth,
//           "--item-gap": itemGap,
//           "--direction": direction,
//           maskImage:
//             "linear-gradient(to right, transparent, black 2rem, black calc(100% - 2rem), transparent)",
//         } as React.CSSProperties
//       }
//     >
//       <div
//         className="w-max flex"
//         style={
//           {
//             "--track-width": `calc(var(--item-width) * ${numItems})`,
//             "--track-gap": `calc(var(--item-gap) * ${numItems})`,
//           } as React.CSSProperties
//         }
//       >
//         {[...logos, ...logos].map((logo, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 flex justify-center items-center bg-white/10 border border-black rounded-xl text-white"
//             style={
//               {
//                 width: "var(--item-width)",
//                 aspectRatio: "1 / 1.2",
//                 marginRight: "var(--item-gap)",
//                 animation: `marquee-move var(--speed) linear infinite ${direction}`,
//               } as React.CSSProperties
//             }
//           >
//             <div className="w-full h-full flex items-center justify-center">
//               <Image
//                 src={logo.src}
//                 alt="logo"
//                 width={80}
//                 height={80}
//                 className="object-contain"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// function LogoMarquee() {
//   // We need to inject the keyframes animation into the document's head
//   // because Tailwind CSS doesn't directly support the 'cqw' unit.
//   React.useEffect(() => {
//     const styleSheet = document.createElement("style");
//     styleSheet.innerText = `
//       @keyframes marquee-move {
//         to {
//           transform: translateX(calc(-100cqw - var(--item-gap)));
//         }
//       }
//     `;
//     document.head.appendChild(styleSheet);
//     return () => {
//       document.head.removeChild(styleSheet);
//     };
//   }, []);

//   return (
//     <div className="items-center overflow-hidden">
//       <div className="w-full max-w-6xl flex flex-col gap-y-6">
//         <Marquee logos={logos1} />
//         <Marquee logos={logos2} direction="reverse" />
//       </div>
//     </div>
//   );
// }

// export default LogoMarquee;
