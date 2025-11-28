"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User, CreditCard, History, Settings, Calendar, Pill } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalConsultations: 0,
    activeReminders: 0,
    creditsUsed: 0,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
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
          <h1 className="text-4xl font-bold text-white mb-2 text-right">ډشبورډ</h1>
          <p className="text-gray-400 text-right">د {session.user.name} سلام</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<CreditCard className="w-8 h-8 text-[#64ffda]" />}
            title="پاتې کریډیټونه"
            value={session.user.credits || 0}
            subtext={session.user.plan || "وړیا"}
          />
          <StatCard
            icon={<History className="w-8 h-8 text-[#64ffda]" />}
            title="ټولې مشورې"
            value={stats.totalConsultations}
            subtext="د ټولې وختونو"
          />
          <StatCard
            icon={<Calendar className="w-8 h-8 text-[#64ffda]" />}
            title="فعال یادونې"
            value={stats.activeReminders}
            subtext="د درملو یادونې"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-right">ګړندۍ کړنې</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <QuickAction
              href="/chat"
              icon={<Pill className="w-6 h-6" />}
              title="AI سره خبرې وکړئ"
              color="bg-blue-500"
            />
            <QuickAction
              href="/interactions"
              icon={<History className="w-6 h-6" />}
              title="تعاملات چیک کړئ"
              color="bg-green-500"
            />
            <QuickAction
              href="/reminders"
              icon={<Calendar className="w-6 h-6" />}
              title="یادونې اداره کړئ"
              color="bg-purple-500"
            />
            <QuickAction
              href="/search"
              icon={<Pill className="w-6 h-6" />}
              title="درمل ولټوئ"
              color="bg-orange-500"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#112240] rounded-xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6 text-right">وروستۍ فعالیت</h2>
          <div className="space-y-4">
            <ActivityItem
              type="chat"
              text="د اسپرین په اړه پوښتنه وشوه"
              time="2 ساعته مخکې"
            />
            <ActivityItem
              type="interaction"
              text="د 3 درملو تعامل چیک شو"
              time="5 ساعته مخکې"
            />
            <ActivityItem
              type="upload"
              text="نسخه اپلوډ او تحلیل شوه"
              time="1 ورځ مخکې"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, title, value, subtext }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-[#112240] p-6 rounded-xl border border-gray-800 text-right"
    >
      <div className="flex justify-end mb-4">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-gray-400 text-sm mb-1">{title}</div>
      <div className="text-[#64ffda] text-xs">{subtext}</div>
    </motion.div>
  );
}

function QuickAction({ href, icon, title, color }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`${color} p-4 rounded-xl text-white cursor-pointer`}
      >
        <div className="flex items-center justify-end gap-3">
          <span className="font-bold">{title}</span>
          {icon}
        </div>
      </motion.div>
    </Link>
  );
}

function ActivityItem({ type, text, time }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-700 pb-3">
      <span className="text-gray-500 text-sm">{time}</span>
      <div className="flex items-center gap-3">
        <span className="text-gray-300">{text}</span>
        <div className="w-2 h-2 bg-[#64ffda] rounded-full"></div>
      </div>
    </div>
  );
}
