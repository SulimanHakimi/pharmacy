"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Plus, Calendar, Clock, Pill, Trash2, Edit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RemindersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reminders, setReminders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchReminders();
    }
  }, [status, router]);

  const fetchReminders = async () => {
    try {
      const response = await fetch('/api/reminders');
      const data = await response.json();
      setReminders(data.reminders || []);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReminder = async (id) => {
    try {
      await fetch(`/api/reminders/${id}`, { method: 'DELETE' });
      setReminders(reminders.filter(r => r._id !== id));
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

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
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#64ffda] text-[#0a192f] px-6 py-3 rounded-lg font-bold hover:bg-[#4fd1c5] transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            نوې یادونه
          </button>
          <div className="text-right">
            <h1 className="text-4xl font-bold text-white mb-2">د درملو یادونې</h1>
            <p className="text-gray-400">د خپلو درملو مهالویش اداره کړئ</p>
          </div>
        </div>

        {/* Reminders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reminders.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              تر اوسه هیڅ یادونه جوړه شوې نه ده
            </div>
          ) : (
            reminders.map((reminder) => (
              <ReminderCard
                key={reminder._id}
                reminder={reminder}
                onDelete={deleteReminder}
              />
            ))
          )}
        </div>

        {/* Add Reminder Modal */}
        <AnimatePresence>
          {showAddModal && (
            <AddReminderModal
              onClose={() => setShowAddModal(false)}
              onAdd={() => {
                setShowAddModal(false);
                fetchReminders();
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ReminderCard({ reminder, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#112240] p-6 rounded-xl border border-gray-800"
    >
      <div className="flex justify-between items-start mb-4">
        <button
          onClick={() => onDelete(reminder._id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 size={18} />
        </button>
        <div className="text-right flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{reminder.drugName}</h3>
          <p className="text-gray-400 text-sm">{reminder.dosage}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-end gap-2 text-gray-300">
          <span className="text-sm">{reminder.frequency}</span>
          <Calendar size={16} className="text-[#64ffda]" />
        </div>

        {reminder.times && reminder.times.length > 0 && (
          <div className="flex items-start justify-end gap-2">
            <div className="text-right">
              {reminder.times.map((time, i) => (
                <div key={i} className="text-sm text-gray-300">{time}</div>
              ))}
            </div>
            <Clock size={16} className="text-[#64ffda] mt-1" />
          </div>
        )}

        {reminder.notes && (
          <p className="text-sm text-gray-500 text-right pt-3 border-t border-gray-700">
            {reminder.notes}
          </p>
        )}

        <div className={`inline-block px-3 py-1 rounded-full text-xs ${reminder.active ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
          {reminder.active ? 'فعال' : 'غیر فعال'}
        </div>
      </div>
    </motion.div>
  );
}

function AddReminderModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    drugName: '',
    dosage: '',
    frequency: 'daily',
    times: ['08:00'],
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      onAdd();
    } catch (error) {
      console.error("Error creating reminder:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#112240] rounded-2xl p-8 max-w-md w-full border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-right">نوې یادونه اضافه کړئ</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 text-right">د درملو نوم</label>
            <input
              type="text"
              value={formData.drugName}
              onChange={(e) => setFormData({...formData, drugName: e.target.value})}
              className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 text-right">خوراک</label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
              placeholder="مثلاً: 500mg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 text-right">د تکرار شمیر</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
            >
              <option value="daily">ورځنی</option>
              <option value="twice daily">ورځې دوه ځله</option>
              <option value="three times daily">ورځې درې ځله</option>
              <option value="weekly">اونیز</option>
              <option value="as needed">د اړتیا په صورت کې</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 text-right">یادښتونه (اختیاري)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="w-full bg-[#0a192f] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#64ffda] text-right"
              rows={3}
            />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-bold hover:bg-gray-600 transition-colors"
            >
              لغوه کول
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#64ffda] text-[#0a192f] py-3 rounded-lg font-bold hover:bg-[#4fd1c5] transition-colors"
            >
              خوندي کول
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
