import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import Image from "next/image";

type Brand = {
  id: number;
  src: string;
  name: string;
};

const brandList: Brand[] = [
  { id: 1, src: "/logo/html5.webp", name: "HTML5" },
  { id: 2, src: "/logo/css3.webp", name: "CSS3" },
  { id: 3, src: "/logo/javascript.webp", name: "JavaScript" },
  { id: 4, src: "/logo/react.webp", name: "React" },
  { id: 5, src: "/logo/redux.webp", name: "Redux" },
  { id: 6, src: "/logo/nextjs.png", name: "Next.js" },
  { id: 7, src: "/logo/express.png", name: "Express.js" },
  { id: 8, src: "/logo/mongoos.png", name: "Mongoose" },
  { id: 9, src: "/logo/postgresql.webp", name: "PostgreSQL" },
  { id: 10, src: "/logo/docker.webp", name: "Docker" },
  { id: 11, src: "/logo/aws.webp", name: "AWS" },
  { id: 12, src: "/logo/gitlogo.webp", name: "Git" },
];

const BrandCard = ({ brand }: { brand: Brand }) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-visible py-6">
      
      <Card
        className="peer relative w-18 h-18 flex items-center justify-center 
        border border-gray-200 dark:border-gray-800 
        bg-white/40 dark:bg-black/30 backdrop-blur-md
        transition duration-300
        hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
        hover:-translate-y-1 hover:scale-105"
      >
        <CardContent className="p-0 flex items-center justify-center">
          <Image
            src={brand.src}
            alt={brand.name}
            width={42}
            height={42}
            className="object-contain"
          />
        </CardContent>
      </Card>

      <span
  className="absolute -top-3 left-1/2 -translate-x-1/2 
  text-xs font-semibold text-gray-700 dark:text-gray-300
  opacity-0 translate-y-2
  peer-hover:opacity-100 peer-hover:translate-y-0
  transition-all duration-300 whitespace-nowrap pointer-events-none"
>
        {brand.name}
      </span>
    </div>
  );
};
export default function BrandMarquee() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6">
      
      {/* Row 1 */}
     <Marquee pauseOnHover className="[--duration:20s] overflow-visible ">
        {brandList.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </Marquee>

      {/* Row 2 */}
      <Marquee reverse pauseOnHover className="[--duration:20s] overflow-visible">
        {brandList.map((brand) => (
          <BrandCard key={brand.id} brand={brand} />
        ))}
      </Marquee>

      {/* Gradient fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}