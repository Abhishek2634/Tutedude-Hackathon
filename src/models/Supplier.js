import mongoose, { Schema } from 'mongoose';

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  trust_score: { type: Number, default: 5.0 },
  address: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

const Supplier = mongoose.models.Supplier || mongoose.model('Supplier', SupplierSchema);

export default Supplier;
