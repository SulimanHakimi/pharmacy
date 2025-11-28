"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Pill, User, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <nav className="fixed w-full z-50 bg-opacity-90 bg-[#0a192f] backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="shrink-0">
              <span className="flex items-center gap-2 text-[#64ffda] font-bold text-xl">
                <Pill className="h-8 w-8" />
                فارما AI
              </span>
            </Link>
            <div className="hidden md:block">
              <div className="mr-10 flex items-baseline space-x-4 space-x-reverse">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  کور پاڼه
                </Link>
                <Link
                  href="/chat"
                  className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  هوښيار چیټ
                </Link>
                <Link
                  href="/interactions"
                  className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  تعاملات
                </Link>
                <Link
                  href="/search"
                  className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  د درملو لټون
                </Link>
                <Link
                  href="/pharmacies"
                  className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  درملتونونه
                </Link>
                {session && (
                  <>
                    <Link
                      href="/reminders"
                      className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      یادونې
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-gray-300 hover:text-[#64ffda] px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      ډشبورډ
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="mr-4 flex items-center md:mr-6 gap-4">
              {session ? (
                <>
                  <span className="text-gray-400 text-sm">
                    کریډیټ: {session.user.credits || 0}
                  </span>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    وتل
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-[#64ffda] text-[#0a192f] hover:bg-[#4fd1c5] px-4 py-2 rounded-md text-sm font-bold transition-colors flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  ننوتل
                </Link>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a192f] border-b border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                کور پاڼه
              </Link>
              <Link
                href="/chat"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                هوښيار چیټ
              </Link>
              <Link
                href="/interactions"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                تعاملات
              </Link>
              <Link
                href="/search"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                د درملو لټون
              </Link>
              <Link
                href="/pharmacies"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                درملتونونه
              </Link>
              <Link
                href="/upload"
                className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
              >
                نسخه اپلوډ
              </Link>
              {session && (
                <>
                  <Link
                    href="/reminders"
                    className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
                  >
                    یادونې
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
                  >
                    ډشبورډ
                  </Link>
                  <div className="text-gray-400 px-3 py-2 text-sm text-right">
                    کریډیټ: {session.user.credits || 0}
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="text-red-400 block px-3 py-2 rounded-md text-base font-medium text-right w-full"
                  >
                    وتل
                  </button>
                </>
              )}
              {!session && (
                <Link
                  href="/login"
                  className="text-[#64ffda] block px-3 py-2 rounded-md text-base font-medium text-right"
                >
                  ننوتل
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
