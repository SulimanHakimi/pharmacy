"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { MapPin, Phone, Clock, Search, Navigation } from "lucide-react";
import { motion } from "framer-motion";

// Sample pharmacy data (in production, this would come from an API or database)
const samplePharmacies = [
  {
    id: 1,
    name: "د کابل مرکزي درملتون",
    namePashto: "د کابل مرکزي درملتون",
    address: "شهرنو، کابل",
    phone: "+93 (0) 799 123 456",
    hours: "۸:۰۰ صبح - ۱۰:۰۰ شپه",
    distance: "۱.۲ کیلومتره",
    isOpen: true,
  },
  {
    id: 2,
    name: "صحت درملتون",
    namePashto: "صحت درملتون",
    address: "کارته ۴، کابل",
    phone: "+93 (0) 799 234 567",
    hours: "۹:۰۰ صبح - ۹:۰۰ شپه",
    distance: "۲.۵ کیلومتره",
    isOpen: true,
  },
  {
    id: 3,
    name: "عصري درملتون",
    namePashto: "عصري درملتون",
    address: "ده مزنګ، کابل",
    phone: "+93 (0) 799 345 678",
    hours: "۷:۰۰ صبح - ۱۱:۰۰ شپه",
    distance: "۳.۸ کیلومتره",
    isOpen: false,
  },
  {
    id: 4,
    name: "د افغان درمل خانه",
    namePashto: "د افغان درمل خانه",
    address: "پل سرخ، کابل",
    phone: "+93 (0) 799 456 789",
    hours: "۲۴ ساعته",
    distance: "۴.۲ کیلومتره",
    isOpen: true,
  },
  {
    id: 5,
    name: "شفا درملتون",
    namePashto: "شفا درملتون",
    address: "چهارراهی صدارت، کابل",
    phone: "+93 (0) 799 567 890",
    hours: "۸:۰۰ صبح - ۸:۰۰ شپه",
    distance: "۵.۱ کیلومتره",
    isOpen: true,
  },
];

export default function PharmacyLocatorPage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [pharmacies, setPharmacies] = useState(samplePharmacies);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);

  const handleSearch = () => {
    // In production, this would fetch pharmacies based on location
    console.log("Searching for pharmacies near:", searchLocation);
  };

  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">د درملتونونو موقعیتونه</h1>
          <p className="text-gray-400">نږدې درملتونونه ومومئ</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="د ځای نوم یا پته دننه کړئ..."
              className="w-full bg-[#112240] border border-gray-700 rounded-full py-4 pl-14 pr-6 text-white focus:outline-none focus:border-[#64ffda] text-right"
            />
            <button
              onClick={handleSearch}
              className="absolute left-2 top-2 p-2 bg-[#64ffda] text-[#0a192f] rounded-full hover:bg-[#4fd1c5] transition-colors"
            >
              <Search size={20} />
            </button>
          </div>
          <button className="w-full mt-4 bg-[#112240] text-[#64ffda] py-3 rounded-lg font-bold hover:bg-[#1e2d4a] transition-colors flex items-center justify-center gap-2">
            <Navigation size={20} />
            زما اوسنی موقعیت وکاروئ
          </button>
        </div>

        {/* Pharmacies List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {pharmacies.map((pharmacy) => (
              <PharmacyCard
                key={pharmacy.id}
                pharmacy={pharmacy}
                isSelected={selectedPharmacy?.id === pharmacy.id}
                onClick={() => setSelectedPharmacy(pharmacy)}
              />
            ))}
          </div>

          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-24 h-[500px] bg-[#112240] rounded-xl border border-gray-800 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={64} className="text-[#64ffda] mx-auto mb-4" />
              <p className="text-gray-400">د نقشې نظارت</p>
              <p className="text-sm text-gray-500 mt-2">Google Maps API کې یوځای کیږي</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function PharmacyCard({ pharmacy, isSelected, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={`bg-[#112240] p-6 rounded-xl border cursor-pointer transition-colors ${
        isSelected ? 'border-[#64ffda]' : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`px-3 py-1 rounded-full text-xs ${pharmacy.isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {pharmacy.isOpen ? 'خلاص' : 'بند'}
        </div>
        <div className="text-right flex-1 mr-4">
          <h3 className="text-xl font-bold text-white mb-1">{pharmacy.namePashto}</h3>
          <p className="text-gray-400 text-sm">{pharmacy.distance}</p>
        </div>
      </div>

      <div className="space-y-3">
        <InfoRow icon={<MapPin size={16} />} text={pharmacy.address} />
        <InfoRow icon={<Phone size={16} />} text={pharmacy.phone} />
        <InfoRow icon={<Clock size={16} />} text={pharmacy.hours} />
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 flex gap-3">
        <button className="flex-1 bg-[#64ffda] text-[#0a192f] py-2 rounded-lg text-sm font-bold hover:bg-[#4fd1c5] transition-colors">
          لارښوونې ترلاسه کړئ
        </button>
        <button className="flex-1 bg-[#233554] text-white py-2 rounded-lg text-sm font-bold hover:bg-[#1e2d4a] transition-colors">
          اړیکه ونیسئ
        </button>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon, text }) {
  return (
    <div className="flex items-center justify-end gap-2 text-gray-300">
      <span className="text-sm">{text}</span>
      <div className="text-[#64ffda]">{icon}</div>
    </div>
  );
}
