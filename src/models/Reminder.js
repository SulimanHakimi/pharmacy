import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  drugName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    required: true, // e.g., "daily", "twice daily", "weekly"
  },
  times: [String], // e.g., ["08:00", "20:00"]
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,
  notes: String,
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Reminder || mongoose.model('Reminder', ReminderSchema);
