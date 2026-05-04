"use client"

import {
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
  Show,
} from "@clerk/nextjs"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Project", path: "/project" },
  { name: "Contact", path: "/contact" },
]

const Navbar = () => {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user } = useUser()

  const role = user?.publicMetadata?.role

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-1">
          <span className="text-2xl font-black tracking-tighter transition-transform group-hover:-rotate-2">
            anam<span className="text-indigo-600">.dev</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="relative px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white transition-colors"
            >
              {pathname === link.path && (
                <motion.span
                  layoutId="activeLink"
                  className="absolute inset-0 bg-indigo-50 dark:bg-indigo-500/10 rounded-full -z-10"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              {link.name}
            </Link>
          ))}

          {role === "admin" && (
            <Link 
              href="/admin" 
              className="ml-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-500 border border-green-500/20 rounded-md bg-green-500/5 hover:bg-green-500 hover:text-black transition-all"
            >
              Admin
            </Link>
          )}
        </div>

        {/* Auth Actions (Desktop) */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-all cursor-pointer active:scale-95">
                  Sign In
                </button>
              </SignInButton>
              
              <SignUpButton mode="modal">
                <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-indigo-500/25 transition-all cursor-pointer active:scale-95 flex items-center gap-2 group">
                  Get Started
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2.5} 
                    stroke="currentColor" 
                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <div className="p-1 rounded-full border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/50 dark:bg-indigo-900/10 transition-transform hover:scale-105">
                <UserButton />
              </div>
            </Show>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 transition-all active:scale-90 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-neutral-950 border-b border-gray-100 dark:border-neutral-900 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-8 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    pathname === link.path 
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20" 
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

               {role === "admin" && (
            <Link 
              href="/admin" 
              className="ml-4 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-500 border border-green-500/20 rounded-md bg-green-500/5 hover:bg-green-800 hover:text-white transition-all"
            >
              Admin
            </Link>
          )}
              
              <div className="pt-6 mt-4 border-t border-gray-100 dark:border-neutral-800 flex flex-col gap-3">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="w-full py-3.5 text-center font-bold border border-gray-200 dark:border-white/10 rounded-2xl active:scale-[0.98] transition-all cursor-pointer hover:bg-gray-800">
                      Log In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all cursor-pointer hover:bg-indigo-800">
                      Register
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <div className="flex items-center gap-4 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl">
                    <UserButton />
                    <span className="font-semibold text-sm text-indigo-600">Active Session</span>
                  </div>
                </Show>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar