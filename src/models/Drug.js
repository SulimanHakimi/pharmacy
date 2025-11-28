import mongoose from 'mongoose';

const DrugSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  namePashto: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sideEffects: [String],
  dosage: String,
  manufacturer: String,
  price: Number,
  inStock: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Drug || mongoose.model('Drug', DrugSchema);
