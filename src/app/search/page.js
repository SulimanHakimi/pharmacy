"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Search, Pill, Info, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DrugSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/drugs/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setResults(data.drugs || []);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">د درملو پلټنه</h1>
          <p className="text-gray-400">د درملو معلومات، قیمتونه، او موجودیت ومومئ</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="د درملو نوم دننه کړئ..."
              className="w-full bg-[#112240] border border-gray-700 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-[#64ffda] text-right"
            />
            <button
              onClick={handleSearch}
              className="absolute left-2 top-2 p-2 bg-[#64ffda] text-[#0a192f] rounded-full hover:bg-[#4fd1c5] transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center text-gray-400">لټول کیږي...</div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((drug) => (
              <DrugCard
                key={drug._id}
                drug={drug}
                onClick={() => setSelectedDrug(drug)}
              />
            ))}
          </div>
        ) : searchTerm && (
          <div className="text-center text-gray-500">هیڅ پایله ونه موندل شوه</div>
        )}

        {/* Drug Detail Modal */}
        <AnimatePresence>
          {selectedDrug && (
            <DrugDetailModal
              drug={selectedDrug}
              onClose={() => setSelectedDrug(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function DrugCard({ drug, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="bg-[#112240] p-6 rounded-xl border border-gray-800 cursor-pointer hover:border-[#64ffda] transition-colors"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`px-3 py-1 rounded-full text-xs ${drug.inStock ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {drug.inStock ? 'موجود' : 'نه موجود'}
        </div>
        <Pill className="text-[#64ffda]" size={24} />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 text-right">{drug.namePashto}</h3>
      <p className="text-gray-400 text-sm mb-3 text-right">{drug.name}</p>
      <p className="text-gray-500 text-sm mb-4 text-right line-clamp-2">{drug.description}</p>
      
      <div className="flex justify-between items-center">
        <button className="text-[#64ffda] text-sm hover:underline">تفصیلات وګورئ</button>
        {drug.price && (
          <span className="text-white font-bold">${drug.price}</span>
        )}
      </div>
    </motion.div>
  );
}

function DrugDetailModal({ drug, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#112240] rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-800"
      >
        <div className="flex justify-between items-start mb-6">
          <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl">
            ×
          </button>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-white mb-2">{drug.namePashto}</h2>
            <p className="text-gray-400">{drug.name}</p>
          </div>
        </div>

        <div className="space-y-6">
          <Section icon={<Info />} title="تفصیلات">
            <p className="text-gray-300 text-right">{drug.description}</p>
          </Section>

          {drug.dosage && (
            <Section icon={<Pill />} title="خوراک">
              <p className="text-gray-300 text-right">{drug.dosage}</p>
            </Section>
          )}

          {drug.sideEffects && drug.sideEffects.length > 0 && (
            <Section icon={<AlertTriangle />} title="جانبي عوارض">
              <ul className="list-disc list-inside text-gray-300 text-right space-y-2">
                {drug.sideEffects.map((effect, i) => (
                  <li key={i}>{effect}</li>
                ))}
              </ul>
            </Section>
          )}

          {drug.manufacturer && (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-right">
                تولید کوونکی: <span className="text-white">{drug.manufacturer}</span>
              </p>
            </div>
          )}

          {drug.price && (
            <div className="pt-4 border-t border-gray-700">
              <p className="text-2xl font-bold text-[#64ffda] text-right">${drug.price}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="bg-[#0a192f] p-4 rounded-lg">
      <div className="flex items-center justify-end gap-2 mb-3">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="text-[#64ffda]">{icon}</div>
      </div>
      {children}
    </div>
  );
}
