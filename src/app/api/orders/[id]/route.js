import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

// @desc    Update an order with a winning bid
// @route   PUT /api/orders/:id
export async function PUT(req, { params }) {
  const { id } = params; // Get the order ID from the URL

  try {
    await connectToDatabase();
    const body = await req.json();
    const { supplierId, price } = body;

    // --- Validation ---
    if (!supplierId || !price) {
      return NextResponse.json({ message: "Missing required fields: supplierId and price are required." }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        $set: {
          'winning_bid.supplier_id': supplierId,
          'winning_bid.price': price,
          status: 'bid_accepted', // Update the order status
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: "Order not found." }, { status: 404 });
    }

    return NextResponse.json(updatedOrder, { status: 200 });

  } catch (error) {
    console.error(`Error updating order ${id}:`, error.message);
    return NextResponse.json({ message: 'Error updating order', error: error.message }, { status: 500 });
  }
}
