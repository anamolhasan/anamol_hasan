// import React from "react";

// type LogoItem = {
//   id: number;
//   component: React.ReactNode;
// };

// type MarqueeProps = {
//   logos: LogoItem[];
//   direction?: "normal" | "reverse";
// };

// export const Marquee = ({ logos, direction = "normal" }: MarqueeProps) => {
//   const safeLogos = Array.isArray(logos) ? logos : [];

//   return (
//     <div className="w-full overflow-hidden">
//       <div
//         className="flex w-max animate-marquee"
//         style={{
//           animationDirection: direction,
//         }}
//       >
//         {[...safeLogos, ...safeLogos].map((logo, index) => (
//           <div
//             key={index}
//             className="flex items-center justify-center mx-4"
//           >
//             <div className="w-16 h-16 flex items-center justify-center">
//               {logo.component}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };