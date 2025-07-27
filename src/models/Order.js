import mongoose, { Schema } from 'mongoose';

const OrderSchema = new Schema({
  co_op_id: { type: String, required: true },
  items: [{
    product_name: { type: String, required: true },
    quantity_kg: { type: Number, required: true }
  }],
  status: {
    type: String,
    enum: ['pending_bids', 'bid_accepted', 'out_for_delivery', 'delivered'],
    default: 'pending_bids'
  },
  winning_bid: {
    supplier_id: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    price: { type: Number }
  },
  delivery_date: { type: Date, required: true },
  order_date: { type: Date, default: Date.now }
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);

export default Order;
