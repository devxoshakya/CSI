import { NextResponse } from 'next/server';
import  connectToDatabase  from '@/config/mongoose';
import User from '@/models/User'; // User model
import Registration from '@/models/Registrations'; // Registration model
import CheckIn from '@/models/Checkin'; // Check-In model

export async function POST(req: Request) {
  try {
    await connectToDatabase(); // Ensure DB is connected

    const { phone, eventId } = await req.json();
    console.log(phone, eventId);

    if (!phone || !eventId) {
      return NextResponse.json({ error: 'Phone and Event ID are required', checkedIn: false }, { status: 400 });
    }

    // Find the user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: 'User not found', checkedIn: false }, { status: 404 });
    }

    // Check if the user is registered for the event
    const isRegistered = await Registration.findOne({ eventId, email: user.email });
    if (!isRegistered) {
      return NextResponse.json({ message: 'User is not registered for this event', checkedIn: false }, { status: 402 });
    }

    // Check if the user is already checked in
    const existingCheckIn = await CheckIn.findOne({ eventId, email: user.email });
    if (existingCheckIn) {
      return NextResponse.json({ message: 'User is already checked in', checkedIn: true, checkIn: existingCheckIn });
    }

    // Create a new check-in record
    const checkIn = new CheckIn({
      eventId,
      name: user.name,
      rollNo: user.rollNo,
      branch: user.branch,
      email: user.email,
    });

    await checkIn.save();

    return NextResponse.json({ message: 'Check-in successful', checkedIn: true, checkIn });
  } catch (error: any) {
    return NextResponse.json({ error: (error as Error).message, checkedIn: false }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    await connectToDatabase(); // Ensure DB is connected

    const { phone, eventId } = await req.json();

    if (!phone || !eventId) {
      return NextResponse.json({ error: 'Phone and Event ID are required', checkedIn: false }, { status: 400 });
    }

    // Find the user by phone
    const user = await User.findOne({ phone });
    if (!user) {
      return NextResponse.json({ error: 'User not found', checkedIn: false }, { status: 404 });
    }

    // Check if the user is registered for the event
    let isRegistered = await Registration.findOne({ eventId, email: user.email });

    // If not registered, register the user for the event
    if (!isRegistered) {
      const newRegistration = new Registration({
        eventId,
        name: user.name,
        rollNo: user.rollNo,
        branch: user.branch,
        email: user.email,
      });

      await newRegistration.save();
      isRegistered = newRegistration;
    }

    // Check if the user is already checked in
    const existingCheckIn = await CheckIn.findOne({ eventId, email: user.email });
    if (existingCheckIn) {
      return NextResponse.json({ message: 'User is already checked in', checkedIn: true, checkIn: existingCheckIn });
    }

    // Create a new check-in record
    const checkIn = new CheckIn({
      eventId,
      name: user.name,
      rollNo: user.rollNo,
      branch: user.branch,
      email: user.email,
      phone: user.phone,
    });

    await checkIn.save();

    return NextResponse.json({
      message: 'User registered and checked in successfully',
      registered: true,
      checkedIn: true,
      registration: isRegistered,
      checkIn,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message, checkedIn: false }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectToDatabase(); // Ensure DB is connected

    const url = new URL(req.url);
    const eventId = url.searchParams.get('eventId');

    if (!eventId) {
      return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
    }

    // Fetch all registrations for the specific event
    const registrations = await Registration.find({ eventId });

    return NextResponse.json({ registrations });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}