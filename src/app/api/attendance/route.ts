import { NextResponse, NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt'; // To get token and validate user
import User from '@/models/User';  // Adjust path to your User model
import Event from '@/models/Events';  // Adjust path to your Event model
import Registration from '@/models/Registrations';  // Adjust path to your Registration model
import Attendance from '@/models/Attendance';  // New Attendance model
import connectToDatabase from '@/config/mongoose';  // Ensure your database connection logic is in place

// Secret for token validation (from environment variables)
const SECRET = process.env.NEXTAUTH_SECRET;

// Middleware to check if the user is authenticated
async function verifyUser(req: NextRequest) {
    const token = await getToken({ req, secret: SECRET });
    if (!token) {
        return null; // Unauthorized if no token
    }
    return token;
}

// Connect to the database
await connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: User not authenticated' }, { status: 401 });
        }

        // Retrieve eventId and eventSecret from the request body
        const { eventId, eventSecret } = await req.json();

        if (!eventId || !eventSecret) {
            return NextResponse.json({ error: 'Event ID and event secret are required' }, { status: 400 });
        }

        // Find the event by eventId
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Check if the eventSecret matches
        if (event.eventSecret !== eventSecret) {
            return NextResponse.json({ error: 'Invalid event secret' }, { status: 403 });
        }

        // Find the user by token email
        const existingUser = await User.findOne({ googleId: token.googleId });
        if (!existingUser) {
            return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
        }

        // Check if the user is registered for the event
        const registration = await Registration.findOne({
            eventId,
            email: existingUser.email,
        });

        if (!registration) {
            return NextResponse.json({ error: 'User is not registered for this event' }, { status: 400 });
        }

        // Record attendance in the Attendance model
        const attendance = new Attendance({
            eventId,
            name: existingUser.name,
            rollNo: existingUser.rollNo,
            branch: existingUser.branch,
            email: existingUser.email,
        });
        await attendance.save();

        return NextResponse.json({
            message: 'Attendance marked successfully',
            checkedIn: true,
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: User not authenticated' }, { status: 401 });
        }

        // Retrieve eventId from the request query
        const { searchParams } = new URL(req.url);
        const eventId = searchParams.get('eventId');

        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        // Find the event by eventId
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Fetch all attendance records for the event
        const attendanceRecords = await Attendance.find({ eventId });

        return NextResponse.json({
            message: 'Attendance records fetched successfully',
            attendanceRecords,
        });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}