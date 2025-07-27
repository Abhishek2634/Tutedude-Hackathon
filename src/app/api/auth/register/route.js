import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Vendor from '@/models/Vendor';
import Supplier from '@/models/Supplier';

export async function POST(req) {
  await connectToDatabase();
  
  try {
    const { name, email, password, role, phone_number } = await req.json(); // Get phone_number from request

    if (!name || !email || !password || !role || !phone_number) {
      return NextResponse.json({ success: false, message: "Please provide all required fields." }, { status: 400 });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json({ success: false, message: "User with this email already exists." }, { status: 409 });
    }

    let profile;
    if (role === 'vendor') {
      // Use the real phone number instead of the placeholder
      profile = await Vendor.create({ name, phone_number, co_op_id: 'default', coordinates: [0, 0] });
    } else if (role === 'supplier') {
      // Use the real phone number for supplier too (assuming it needs to be unique)
      profile = await Supplier.create({ name, phone_number, address: 'default address' });
    } else {
      return NextResponse.json({ success: false, message: "Invalid role specified." }, { status: 400 });
    }

    const user = await User.create({ email, password, role, profileId: profile._id });

    return NextResponse.json({ success: true, message: "Registration successful! You can now log in." }, { status: 201 });

  } catch (error) {
    // Check if it's our duplicate key error and provide a user-friendly message
    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: "An account with this phone number already exists." }, { status: 409 });
    }
    console.error("Registration Error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
