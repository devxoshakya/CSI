import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/config/mongoose';
import Newsletter from '@/models/NewsLetter';

// Connect to the database
await connectToDatabase();


// API for newsletter subscription
// File: /app/api/newsletter/route.js

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Check if the email already exists in the newsletter database
        const existingSubscriber = await Newsletter.findOne({ email });
        if (existingSubscriber) {
            return NextResponse.json({ error: 'Email is already subscribed' }, { status: 400 });
        }

        // Add email to the newsletter database
        const newSubscriber = new Newsletter({ email });
        await newSubscriber.save();

        return NextResponse.json({ message: 'Subscription successful' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Remove email from the newsletter database
        const deletedSubscriber = await Newsletter.findOneAndDelete({ email });
        if (!deletedSubscriber) {
            return NextResponse.json({ error: 'Email not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Unsubscription successful' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
