"use client";

import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("بریښنالیک یا پټنوم غلط دی");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("د ننوتلو پر مهال تېروتنه رامنځته شوه");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#112240] p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-800"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-white">بېرته ښه راغلاست</h2>
          
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-6 text-sm text-right">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 text-right">بریښنالیک پته</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
                placeholder="you@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 text-right">پټنوم</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#64ffda] text-[#0a192f] py-3 rounded-lg font-bold text-lg hover:bg-[#4fd1c5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "ننوتل کیږي..." : "ننوتل"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            حساب نلرئ؟{" "}
            <Link href="/signup" className="text-[#64ffda] hover:underline">
              نوم لیکنه وکړئ
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
