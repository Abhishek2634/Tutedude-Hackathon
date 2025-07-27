import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Supplier from '@/models/Supplier';

// @desc    Register a new supplier
// @route   POST /api/suppliers
export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { name, phone_number, address } = body;

    // --- Basic Validation ---
    if (!name || !phone_number || !address) {
      return NextResponse.json({ message: "Missing required fields: name, phone_number, and address are required." }, { status: 400 });
    }

    const existingSupplier = await Supplier.findOne({ phone_number });
    if (existingSupplier) {
      return NextResponse.json({ message: "A supplier with this phone number already exists." }, { status: 409 });
    }

    const newSupplier = new Supplier({
      name,
      phone_number,
      address
      // trust_score is set by default in the model
    });
    
    const savedSupplier = await newSupplier.save();
    return NextResponse.json(savedSupplier, { status: 201 });

  } catch (error) {
    console.error("Error creating supplier:", error.message);
    return NextResponse.json({ message: 'Error registering supplier', error: error.message }, { status: 500 });
  }
}

// @desc    Get all registered suppliers
// @route   GET /api/suppliers
export async function GET() {
  try {
    await connectToDatabase();
    const suppliers = await Supplier.find({}); // Find all suppliers
    
    return NextResponse.json(suppliers, { status: 200 });

  } catch (error) {
    console.error("Error fetching suppliers:", error.message);
    return NextResponse.json({ message: 'Error fetching suppliers', error: error.message }, { status: 500 });
  }
}
