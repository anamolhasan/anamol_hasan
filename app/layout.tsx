import type { Metadata } from "next"
import "./globals.css"
import AppClerkProvider from "@/components/AppClerkProvider"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
// import { TooltipProvider } from "@/components/ui/tooltip";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  metadataBase: new URL("https://anamolhasan.vercel.app"), // আপনার আসল ডোমেইন দিয়ে বদলান
  title: {
    default: "Anamol Hasan | Full Stack Developer",
    template: "%s | Anamol Hasan",
  },
  description:
    "Anamol Hasan is a Full Stack Developer specializing in Next.js, TypeScript, Postgresql, and MongoDB — building fast, scalable web applications and modern user experiences.",
  keywords: [
    "Anamol Hasan",
    "Anamul Hasan",
    "Anam",
    "Full Stack Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Postgresql",
    "MongoDB",
    "Web Developer Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Anamol Hasan", url: "https://anamolhasan.vercel.app" }],
  creator: "Anamol Hasan",
  publisher: "Anamol Hasan",

  icons: {
    icon: "/favicon.ico",
    apple: "/anamolhasan.jpg",
  },

  openGraph: {
    type: "website",
    url: "https://anamolhasan.vercel.app",
    title: "Anamol Hasan | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript,Postgresql, and MongoDB — building fast, scalable web applications.",
    siteName: "Anamol Hasan",
    images: [
      {
        url: "/anamolhasan.jpg",
        width: 1200,
        height: 630,
        alt: "Anamol Hasan - Full Stack Developer",
      },
    ],
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Anamol Hasan | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, TypeScript,Postgresql, and MongoDB.",
    images: ["/anamolhasan.jpg"],
    creator: "@your_twitter_handle", // আপনার টুইটার হ্যান্ডেল দিয়ে বদলান
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <AppClerkProvider>
          {/* <TooltipProvider> */}
            {children}
          {/* </TooltipProvider> */}
        </AppClerkProvider>
      </body>
    </html>
  )
}