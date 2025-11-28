"use client";

import Navbar from "@/components/Navbar";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">ساده، شفاف قیمتونه</h1>
          <p className="text-gray-400">هغه پلان غوره کړئ چې ستاسو د روغتیا اړتیاو سره سمون لري.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard 
            title="وړیا" 
            price="$0" 
            features={[
              "په میاشت کې 5 هوښيار چیټ کریډیټونه",
              "د درملو تعامل لومړنی چیک",
              "د ټولنې ملاتړ",
              "د اعلاناتو سره"
            ]}
          />
          <PricingCard 
            title="پرو" 
            price="$9.99" 
            isPopular={true}
            features={[
              "نامحدود هوښيار چیټ",
              "د تعامل تفصیلي راپورونه",
              "د نسخې اپلوډ او تحلیل",
              "لومړیتوب لرونکی ملاتړ",
              "له اعلاناتو پاک تجربه"
            ]}
          />
          <PricingCard 
            title="پریمیم" 
            price="$19.99" 
            features={[
              "په پرو کې هرڅه شامل دي",
              "کورنۍ حساب (تر 5 غړو پورې)",
              "د درمل جوړونکي سره مستقیم مشوره (1/میاشت)",
              "د روغتیا تاریخ تعقیب",
              "نویو ځانګړتیاو ته لومړنی لاسرسی"
            ]}
          />
        </div>
      </div>
    </main>
  );
}

function PricingCard({ title, price, features, isPopular }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={`relative bg-[#112240] rounded-2xl p-8 border ${isPopular ? 'border-[#64ffda]' : 'border-gray-800'} shadow-xl flex flex-col`}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#64ffda] text-[#0a192f] px-4 py-1 rounded-full text-sm font-bold">
          خورا مشهور
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-2 text-right">{title}</h3>
      <div className="text-4xl font-bold text-[#64ffda] mb-6 text-right flex flex-row-reverse justify-end items-baseline gap-1">
        {price}<span className="text-lg text-gray-400 font-normal">/میاشت</span>
      </div>
      
      <ul className="space-y-4 mb-8 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 text-gray-300 flex-row-reverse text-right">
            <span className="flex-1">{feature}</span>
            <Check className="w-5 h-5 text-[#64ffda] shrink-0" />
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 rounded-lg font-bold transition-colors ${isPopular ? 'bg-[#64ffda] text-[#0a192f] hover:bg-[#4fd1c5]' : 'bg-[#233554] text-white hover:bg-[#1e2d4a]'}`}>
        پیل کړئ
      </button>
    </motion.div>
  );
}
