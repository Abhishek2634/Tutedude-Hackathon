import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

// GET orders, with optional status filtering
export async function GET(req) {
  // The new URL constructor provides an easy way to read search parameters
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  
  // Build a query object. If a status is provided, use it for filtering.
  const query = status ? { status } : {};

  try {
    await connectToDatabase();
    // Use the query object to find orders. If query is empty, it finds all.
    const orders = await Order.find(query).sort({ delivery_date: 1 });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    return NextResponse.json({ message: 'Error fetching orders', error: error.message }, { status: 500 });
  }
}

// POST a new order from the vendor application
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { co_op_id, items, delivery_date } = body;

    // Basic validation
    if (!co_op_id || !items || !delivery_date) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const newOrder = new Order({ 
      co_op_id, 
      items, 
      delivery_date 
      // Status defaults to 'pending_bids' as defined in the model
    });

    const savedOrder = await newOrder.save();
    return NextResponse.json(savedOrder, { status: 201 });

  } catch (error) {
    console.error("Error creating order:", error.message);
    return NextResponse.json({ message: 'Error creating order', error: error.message }, { status: 500 });
  }
}
