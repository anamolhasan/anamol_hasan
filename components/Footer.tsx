import Link from "next/link";
import { FaGithub, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
  { icon: FaGithub, href: "https://github.com/anamolhasan", label: "GitHub" },
  { icon: FaLinkedin, href: "https://www.linkedin.com/in/anamolhasan", label: "LinkedIn" },
  { icon: FaFacebook, href: "https://www.facebook.com/anam.hasan.701080", label: "Facebook" },
  { icon: FaYoutube, href: "https://www.youtube.com/@anamol-hasan", label: "YouTube" },
  { icon: HiOutlineMail, href: "mailto:anamolhasan.job@gmail.com", label: "Email" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-8 text-center sm:text-left md:grid-cols-3 md:gap-10">
          {/* Brand — mobile এ full-width row, md থেকে ১ কলাম */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-white">
              Anamol <span className="text-green-500">Hasan</span>
            </h3>
            <p className="mt-2 text-sm text-white/50">
              Full Stack Developer building fast, scalable web applications
              with Next.js, TypeScript, Postgresql and MongoDB.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-500">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-green-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-green-500">
              Connect
            </h4>
            <TooltipProvider delayDuration={150}>
              <div className="mt-4 flex flex-wrap justify-center gap-3 sm:justify-start">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <Tooltip key={label}>
                    <TooltipTrigger asChild>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-green-500 hover:text-green-500"
                      >
                        <Icon size={16} />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="bg-green-600 text-white border-green-600">
                      {label}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 border-t border-green-500/40 pt-6 text-center sm:mt-10 sm:flex-row sm:text-left">
          <p className="text-xs text-white/40">
            © {year} Anamol Hasan. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with{" "}
            <span className="text-green-500">Next.js</span> &{" "}
            <span className="text-green-500">TypeScript</span>
          </p>
        </div>
      </div>
    </footer>
  );
}