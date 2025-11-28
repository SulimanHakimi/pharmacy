import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['chat', 'interaction', 'prescription'],
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  drugs: [String], // For interaction checks
  imageUrl: String, // For prescription uploads
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Consultation || mongoose.model('Consultation', ConsultationSchema);
