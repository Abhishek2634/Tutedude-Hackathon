import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Vendor from '@/models/Vendor';

// POST to register a new vendor
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, phone_number, co_op_id, coordinates } = body;

    // Basic validation
    if (!name || !phone_number || !co_op_id || !coordinates) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const existingVendor = await Vendor.findOne({ phone_number });
    if (existingVendor) {
      return NextResponse.json({ message: "Vendor with this phone number already exists" }, { status: 409 });
    }

    const newVendor = new Vendor({
      name,
      phone_number,
      co_op_id,
      stall_location: { coordinates }
    });
    
    const savedVendor = await newVendor.save();
    return NextResponse.json(savedVendor, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error registering vendor', error: error.message }, { status: 500 });
  }
}
