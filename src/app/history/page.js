"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageSquare, Activity, FileText, Calendar, Filter } from "lucide-react";
import { motion } from "framer-motion";

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [consultations, setConsultations] = useState([]);
  const [filter, setFilter] = useState('all'); // all, chat, interaction, prescription
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchHistory();
    }
  }, [status, router]);

  const fetchHistory = async () => {
    try {
      const response = await fetch('/api/history');
      const data = await response.json();
      setConsultations(data.consultations || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredConsultations = filter === 'all' 
    ? consultations 
    : consultations.filter(c => c.type === filter);

  if (status === "loading" || isLoading) {
    return (
      <main className="min-h-screen bg-[#0a192f] text-white flex items-center justify-center">
        <div className="text-2xl">بارول کیږي...</div>
      </main>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2 text-right">د روغتیا تاریخ</h1>
          <p className="text-gray-400 text-right">ستاسو وروستۍ مشورې او تحلیلونه</p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-end">
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            label="ټول"
          />
          <FilterButton
            active={filter === 'chat'}
            onClick={() => setFilter('chat')}
            label="چیټ"
            icon={<MessageSquare size={16} />}
          />
          <FilterButton
            active={filter === 'interaction'}
            onClick={() => setFilter('interaction')}
            label="تعاملات"
            icon={<Activity size={16} />}
          />
          <FilterButton
            active={filter === 'prescription'}
            onClick={() => setFilter('prescription')}
            label="نسخې"
            icon={<FileText size={16} />}
          />
        </div>

        {/* Consultations List */}
        <div className="space-y-4">
          {filteredConsultations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              هیڅ تاریخ شتون نلري
            </div>
          ) : (
            filteredConsultations.map((consultation) => (
              <ConsultationCard
                key={consultation._id}
                consultation={consultation}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}

function FilterButton({ active, onClick, label, icon }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-bold transition-colors flex items-center gap-2 ${
        active
          ? 'bg-[#64ffda] text-[#0a192f]'
          : 'bg-[#112240] text-gray-400 hover:text-white'
      }`}
    >
      {label}
      {icon}
    </button>
  );
}

function ConsultationCard({ consultation }) {
  const getTypeInfo = (type) => {
    switch(type) {
      case 'chat':
        return { icon: <MessageSquare className="text-blue-400" />, label: 'چیټ', color: 'bg-blue-500/10' };
      case 'interaction':
        return { icon: <Activity className="text-green-400" />, label: 'تعامل', color: 'bg-green-500/10' };
      case 'prescription':
        return { icon: <FileText className="text-purple-400" />, label: 'نسخه', color: 'bg-purple-500/10' };
      default:
        return { icon: <MessageSquare className="text-gray-400" />, label: 'نور', color: 'bg-gray-500/10' };
    }
  };

  const typeInfo = getTypeInfo(consultation.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#112240] p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-500 text-sm">
            {new Date(consultation.createdAt).toLocaleDateString('ps-AF')}
          </span>
          <Calendar size={16} className="text-gray-500" />
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${typeInfo.color}`}>
          <span className="text-sm font-bold">{typeInfo.label}</span>
          {typeInfo.icon}
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-[#0a192f] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-2 text-right">پوښتنه:</p>
          <p className="text-white text-right">{consultation.query}</p>
        </div>

        {consultation.drugs && consultation.drugs.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-end">
            {consultation.drugs.map((drug, i) => (
              <span key={i} className="px-3 py-1 bg-[#233554] text-[#64ffda] rounded-full text-sm">
                {drug}
              </span>
            ))}
          </div>
        )}

        <div className="bg-[#0a192f] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-2 text-right">ځواب:</p>
          <p className="text-gray-300 text-right line-clamp-3">{consultation.response}</p>
        </div>
      </div>
    </motion.div>
  );
}
