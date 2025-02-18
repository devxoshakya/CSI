import { NextResponse, NextRequest } from 'next/server';
import Event from '@/models/Events';
import connectToDatabase from '@/config/mongoose';
import { getBlogPosts } from '@/data/server/events'; // Function to get event metadata from MDX files
import { getToken } from 'next-auth/jwt'; // To get token and validate user

// Connect to the database
await connectToDatabase();

// Secret for token validation (from environment variables)
const SECRET = process.env.NEXTAUTH_SECRET;

// Middleware to check if the user is authenticated and an admin
async function verifyAdmin(req: NextRequest) {
    const token = await getToken({ req, secret: SECRET });
    if (!token || token.privileges !== 'admin') {
        return false; // Unauthorized if no token or if user is not an admin
    }
    return token;
}

export async function GET(req: NextRequest) {
    try {
        // Verify admin privileges using the token
        const token = await verifyAdmin(req);
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized: Admin access required' }, { status: 403 });
        }

        // Fetch metadata from MDX files
        const metadata = await getBlogPosts(); // Assuming this returns an array of metadata

        // Loop through the metadata and check if each event exists in the DB
        for (const data of metadata) {
            const { eventId, title, date,eventSecret } = data.metadata;

            // Check if the event already exists
            const existingEvent = await Event.findOne({ eventId });




            if (!eventId || !date || !title || !eventSecret) {
                // return NextResponse.json({ error: 'Missing required metadata fields: eventId, title, or date' }, { status: 400 });
                continue; // Skip this iteration if any of the required fields are missing
            }
            console.log(data.metadata);

            if (!existingEvent) {
                // If event doesn't exist, create a new event
                const newEvent = new Event({
                    eventId,
                    title,
                    date,
                    eventSecret,
                    adminEmail: token.googleId,
                    likes: [] // Use the email from the token
                });
                await newEvent.save();
            } else {
                // If event exists, update it (optional, based on your needs)
                existingEvent.title = title;
                existingEvent.date = date;
                existingEvent.eventSecret = eventSecret;
                await existingEvent.save();
            }
        }

        // Fetch all events in the DB
        const events = await Event.find({});

        // Return the current list of events
        return NextResponse.json(events, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
}
