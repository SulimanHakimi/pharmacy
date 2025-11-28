"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Plus, X, AlertTriangle, Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";   // ← enables tables, strikethrough, lists

export default function InteractionsPage() {
  const [drugs, setDrugs] = useState([]);
  const [currentDrug, setCurrentDrug] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const addDrug = () => {
    if (currentDrug.trim() && !drugs.includes(currentDrug.trim())) {
      setDrugs([...drugs, currentDrug.trim()]);
      setCurrentDrug("");
    }
  };

  const removeDrug = (drug) => {
    setDrugs(drugs.filter((d) => d !== drug));
  };

  const checkInteractions = async () => {
    if (drugs.length < 2) return;

    setIsLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch("/api/interactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ drugs }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setResult((prev) => prev + chunk);
      }
    } catch (err) {
      console.error("Interaction check error:", err);
      setError("د تعاملاتو چیک کولو پر مهال ستونزه رامنځته شوه. مهرباني وکړئ بیا هڅه وکړئ.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">د درملو د تعامل چیکر</h1>
          <p className="text-gray-400">
            د احتمالي تعاملاتو چک کولو لپاره دوه یا ډیر درمل داخل کړئ.
          </p>
        </div>

        {/* Drug Input Section */}
        <div className="bg-[#112240] rounded-xl p-6 sm:p-8 shadow-xl border border-gray-800">
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={currentDrug}
              onChange={(e) => setCurrentDrug(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addDrug()}
              placeholder="د درملو نوم دننه کړئ (مثلاً اسپرین)"
              className="flex-1 bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
              dir="rtl"
            />
            <button
              onClick={addDrug}
              className="bg-[#233554] text-[#64ffda] px-6 py-3 rounded-lg font-bold hover:bg-[#1e2d4a] transition-colors flex items-center justify-center"
            >
              <Plus size={24} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8 min-h-[50px]">
            <AnimatePresence>
              {drugs.map((drug) => (
                <motion.div
                  key={drug}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-[#233554] text-white px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <span>{drug}</span>
                  <button onClick={() => removeDrug(drug)} className="text-gray-400 hover:text-white">
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {drugs.length === 0 && (
              <p className="text-gray-500 italic py-2 text-right w-full">
                تر اوسه هیڅ درمل نه دي اضافه شوي.
              </p>
            )}
          </div>

          <button
            onClick={checkInteractions}
            disabled={drugs.length < 2 || isLoading}
            className="w-full bg-[#64ffda] text-[#0a192f] py-4 rounded-lg font-bold text-lg hover:bg-[#4fd1c5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                تحلیل کوي...
              </>
            ) : (
              <>
                <Search size={20} />
                تعاملات چیک کړئ
              </>
            )}
          </button>
        </div>

        {/* Rich Text Result */}
        {(result || isLoading || error) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#112240] rounded-xl p-6 sm:p-8 shadow-xl border border-gray-800"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="text-[#64ffda]" />
              د تحلیل پایله
            </h2>

            {error && (
              <p className="text-red-400 text-right" dir="rtl">{error}</p>
            )}

            <div className="text-right" dir="rtl">
              {isLoading && !result ? (
                <div className="flex items-center justify-end gap-3 py-8">
                  <Loader2 className="animate-spin text-[#64ffda]" size={28} />
                  <span className="text-gray-400">تحلیل روان دی...</span>
                </div>
              ) : (
                // ← WRAPPER DIV with className moved here
                <div className="prose prose-invert max-w-none leading-relaxed text-gray-300">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      strong: ({ children }) => <span className="font-bold text-white">{children}</span>,
                      em: ({ children }) => <span className="italic text-[#64ffda]">{children}</span>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-300">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-300">{children}</ol>,
                      li: ({ children }) => <li className="marker:text-[#64ffda]">{children}</li>,
                      h1: ({ children }) => <h1 className="text-2xl font-bold text-white mt-6 mb-3">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-xl font-bold text-[#64ffda] mt-5 mb-2">{children}</h2>,
                    }}
                  >
                    {result}
                  </ReactMarkdown>
                </div>
                // ← END WRAPPER
              )}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}