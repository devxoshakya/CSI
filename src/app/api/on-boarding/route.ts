import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/config/mongoose";
import User from "@/models/User";
import { getToken } from "next-auth/jwt"; // Use getToken from next-auth

export async function POST(req: NextRequest) {
  try {
    const { name, fname, email, rollno, branch, year, phone } = await req.json();

    if (!name || !fname || !email || !rollno || !branch || !year) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch the token using getToken (compatible with NextRequest)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ error: "Unauthorized. Please log in first." }, { status: 401 });
    }

    if (!token.googleId) {
      return NextResponse.json({ error: "Google account not found in session." }, { status: 400 });
    }

    // Check if the user is already onboarded
    const existingUser = await User.findOne({ googleId: token.googleId });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found in the database." }, { status: 404 });
    }

    if (existingUser.isOnboarded) {
      return NextResponse.json({ error: "User is already onboarded." }, { status: 400 });
    }

    // Update the user profile in the database
    existingUser.name = name;
    existingUser.fname = fname;
    existingUser.email = email; // Internal email from onboarding
    existingUser.rollNo = rollno;
    existingUser.branch = branch;
    existingUser.year = year;
    existingUser.phone = phone;
    existingUser.isOnboarded = true;


    await existingUser.save();

    return NextResponse.json({ message: "Onboarding completed successfully.", user: existingUser }, { status: 200 });
  } catch (error) {
    console.error("Error during onboarding:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
