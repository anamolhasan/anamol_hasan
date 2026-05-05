/* eslint-disable @typescript-eslint/no-explicit-any */
import { Marquee } from "@/components/shadcn-space/animations/marquee";
import Image from "next/image";

type Brand = {
  id: number;
  src: string;
};

export default function MarqueeBrandsDemo() {
 const brandList: Brand[] = [
    { id: 1, src: "/logo/html5.webp" },
    { id: 2, src: "/logo/css3.webp" },
    { id: 3, src: "/logo/javascript.webp" },
    { id: 4, src: "/logo/react.webp" },
    { id: 5, src: "/logo/redux.webp" },
    { id: 6, src: "/logo/nextjs.png" },
    { id: 7, src: "/logo/express.png" },
    { id: 8, src: "/logo/mongoos.png" },
    { id: 9, src: "/logo/postgresql.webp" },
    { id: 10, src: "/logo/docker.webp" },
    { id: 11, src: "/logo/aws.webp" },
    { id: 12, src: "/logo/gitlogo.webp" },
  ];

  return (
    <>
      <Marquee className="[--duration:20s] p-0" pauseOnHover>
         {brandList.map((brand) => (
  <div
    key={brand.id}
    className="mx-2 flex items-center justify-center h-12"
  >
    <Image
      src={brand.src}
      alt={`logo-${brand.id}`}
      width={40}
      height={40}
      className="object-contain"
    />
            {/* <Image
             src={brand.src}
            alt={`logo-${brand.id}`}
              width={40}
              height={30}
              className="object-contain hidden dark:block"
            /> */}
          </div>
        ))}
      </Marquee>
    </>
  );
}
