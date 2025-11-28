"use client";

import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Activity, MessageSquare, ShieldCheck, Upload, Search, Calendar, MapPin } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a192f] text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-8"
          >
            <span className="block">ستاسو شخصي هوښيار</span>
            <span className="block text-[#64ffda]">درمل جوړونکی مرستیال</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10"
          >
            د درملو د تعامل فوري چیکونه ترلاسه کړئ، د هوښيار (AI) لخوا روغتیایی مشورې، او خپلې نسخې په اسانۍ سره اداره کړئ. خوندي، باوري، او تل شتون لري.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex justify-center gap-4"
          >
            <Link href="/chat" className="bg-[#64ffda] text-[#0a192f] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#4fd1c5] transition-colors flex items-center gap-2">
              خبرې پیل کړئ <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link href="/interactions" className="border border-[#64ffda] text-[#64ffda] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors">
              تعاملات وګورئ
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#112240]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white">ولې فارما AI غوره کړئ؟</h2>
            <p className="mt-4 text-gray-400">ستاسو د روغتیا خوندیتوب لپاره پرمختللې ټیکنالوژي.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="w-10 h-10 text-[#64ffda]" />}
              title="هوښيار روغتیایی چیټ بوټ"
              description="د درملو، جانبي عوارضو، یا عمومي روغتیایی مشورو په اړه هر وخت پوښتنه وکړئ."
              link="/chat"
            />
            <FeatureCard 
              icon={<Activity className="w-10 h-10 text-[#64ffda]" />}
              title="د درملو تعاملات"
              description="سمدستي وګورئ چې ایا ستاسو درمل یوځای کارول خوندي دي که نه، د تفصیلي راپورونو سره."
              link="/interactions"
            />
            <FeatureCard 
              icon={<Upload className="w-10 h-10 text-[#64ffda]" />}
              title="د نسخې تحلیل"
              description="خپله نسخه اپلوډ کړئ او زموږ هوښيار سیسټم ته اجازه ورکړئ چې خوراک او لارښوونې تشریح کړي."
              link="/upload"
            />
            <FeatureCard 
              icon={<Search className="w-10 h-10 text-[#64ffda]" />}
              title="د درملو ډیټابیس"
              description="زرګونو درملو معلومات، قیمتونه، او موجودیت په یو ځای کې ومومئ."
              link="/search"
            />
            <FeatureCard 
              icon={<Calendar className="w-10 h-10 text-[#64ffda]" />}
              title="د درملو یادونې"
              description="د خپلو درملو مهالویش ترتیب کړئ او هیڅکله یوه خوراک ونه هیروئ."
              link="/reminders"
            />
            <FeatureCard 
              icon={<MapPin className="w-10 h-10 text-[#64ffda]" />}
              title="د درملتونونو موقعیت"
              description="د خپل ځای نږدې درملتونونه ومومئ چې په دې شیبه کې خلاص دي."
              link="/pharmacies"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">ایا تاسو د خپلې روغتیا کنټرول ته چمتو یاست؟</h2>
        <Link href="/signup" className="bg-[#64ffda] text-[#0a192f] px-8 py-3 rounded-full font-bold text-lg hover:bg-[#4fd1c5] transition-colors">
          وړیا حساب جوړ کړئ
        </Link>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description, link }) {
  return (
    <Link href={link || "#"}>
      <motion.div 
        whileHover={{ y: -5 }}
        className="bg-[#0a192f] p-8 rounded-xl border border-gray-800 hover:border-[#64ffda] transition-colors text-right cursor-pointer h-full"
      >
        <div className="mb-4 flex justify-end">{icon}</div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </motion.div>
    </Link>
  );
}
