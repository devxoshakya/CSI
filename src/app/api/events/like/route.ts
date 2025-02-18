import { NextResponse, NextRequest } from 'next/server';
import Event from '@/models/Events';
import connectToDatabase from '@/config/mongoose';
import { getToken } from 'next-auth/jwt'; // To get token and validate user

// Connect to the database
await connectToDatabase();

// Secret for token validation (from environment variables)
const SECRET = process.env.NEXTAUTH_SECRET;

// Function to verify if the user is authenticated
async function verifyUser(req: NextRequest) {
    const token = await getToken({ req, secret: SECRET });
    return token || null; // Returns token if authenticated, otherwise null
}
export async function GET(req: NextRequest) {
    try {
        const token = await verifyUser(req);
        const googleId = token?.googleId; // Extract Google ID from the token

        // Fetch all events
        const events = await Event.find({});

        // Map over events to check if the user has liked each one
        const response = events.map(event => ({
            eventId: event.eventId,
            title: event.title,
            date: event.date,
            like: event.likes.length, // Total number of likes
            liked: googleId ? event.likes.includes(googleId) : false // Check if the user liked it
        }));

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }
}

// **POST /api/events/like (Like an event)**
export async function POST(req: NextRequest) {
    try {
        const token = await verifyUser(req);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { eventId } = await req.json();
        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        if (!event.likes.includes(token.googleId)) {
            event.likes.push(token.googleId);
            await event.save();
        }

        return NextResponse.json({ message: 'Event liked successfully', likes: event.likes.length }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to like event' }, { status: 500 });
    }
}

// **DELETE /api/events/unlike (Unlike an event)**
export async function DELETE(req: NextRequest) {
    try {
        const token = await verifyUser(req);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { eventId } = await req.json();
        if (!eventId) {
            return NextResponse.json({ error: 'Event ID is required' }, { status: 400 });
        }

        const event = await Event.findOne({ eventId });
        if (!event) {
            return NextResponse.json({ error: 'Event not found' }, { status: 404 });
        }

        event.likes = event.likes.filter((id:any) => id !== token.googleId);
        await event.save();

        return NextResponse.json({ message: 'Event unliked successfully', likes: event.likes.length }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to unlike event' }, { status: 500 });
    }
}
