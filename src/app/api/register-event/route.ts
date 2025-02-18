import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/config/mongoose';
import Registration from '@/models/Registrations';
import Event from '@/models/Events';
import User from "@/models/User";
import { getToken } from 'next-auth/jwt';

const SECRET = process.env.NEXTAUTH_SECRET;

// Ensure MongoDB is connected
await connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: SECRET });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { eventId } = await req.json();
        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        // Check if the event exists
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        if (!token || !token.googleId) {
            return NextResponse.json({ error: "Google account not found in session.", status: 400 });
        }

        const googleId = token.googleId;


        // Check if the user exists in the database using googleId
        const existingUser = await User.findOne({ googleId });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found in the database.", status: 404 });
        }


        // Check if the user is already registered
        const existingRegistration = await Registration.findOne({ eventId, email: existingUser.email });
        if (existingRegistration) {
            return NextResponse.json({ message: 'You are already registered for this event' });
        }

        // Register the user for the event
        const registration = new Registration({
            eventId,
            name: existingUser.name || 'Unknown',
            image: existingUser.image || 'https://via.placeholder.com/150',
            rollNo: existingUser.rollNo || 'N/A',
            branch: existingUser.branch || 'N/A',
            email: existingUser.email,
        });

        await registration.save();

        return NextResponse.json({ message: 'Registration successful', registration });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: SECRET });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { eventId } = await req.json();
        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }
        if (!token || !token.googleId) {
            return NextResponse.json({ error: "Google account not found in session.", status: 400 });
        }

        const googleId = token.googleId;


        // Check if the user exists in the database using googleId
        const existingUser = await User.findOne({ googleId });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found in the database.", status: 404 });
        }

        // Check if the event exists
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Find the registration record
        const registration = await Registration.findOneAndDelete({ eventId, email: existingUser.email });
        if (!registration) {
            return NextResponse.json({ message: 'You are not registered for this event' });
        }

        return NextResponse.json({ message: 'Unregistration successful' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: SECRET });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const eventId = url.searchParams.get('eventId');

        if(!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        if (!token || !token.googleId) {
            return NextResponse.json({ error: "Google account not found in session.", status: 400 });
        }

        const googleId = token.googleId;

        // Check if the user exists in the database using googleId
        const existingUser = await User.findOne({ googleId });
        if (!existingUser) {
            return NextResponse.json({ error: "User not found in the database.", status: 404 });
        }

        // Check if the event exists
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Find the registration record
        const registration = await Registration
            .findOne({ eventId, email: existingUser.email })

        if (!registration) {
            return NextResponse.json({ registered: false, user: existingUser });
        }
        // console.log(registration + "registration");
        return NextResponse.json({ registered: true, user: existingUser, event: registration.eventId });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

