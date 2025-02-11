import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/config/mongoose';
import Registration from '@/models/Registrations';
import Event from '@/models/Events';
import { getToken } from 'next-auth/jwt';

const SECRET = process.env.NEXTAUTH_SECRET;

// Ensure MongoDB is connected
await connectToDatabase();

export async function GET(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: SECRET });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(req.url);
        const eventId = url.searchParams.get('eventId');

        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        // Check if the event exists
        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        // Fetch all registrations for the event
        const registrations = await Registration.find({ eventId });

        return NextResponse.json({ registrations });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
