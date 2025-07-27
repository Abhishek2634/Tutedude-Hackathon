import mongoose, { Schema } from 'mongoose';

// Define the schema
const VendorSchema = new Schema({
  name: { type: String, required: true },
  phone_number: { type: String, required: true, unique: true },
  co_op_id: { type: String, required: true },
  stall_location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  created_at: { type: Date, default: Date.now }
});

// The key part: Check if the model already exists before defining it.
// Then export it. This prevents errors during hot-reloading in development.
const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', VendorSchema);

export default Vendor;
