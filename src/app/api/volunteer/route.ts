import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { z } from 'zod';
import connectToDatabase from '@/config/mongoose';
import User from '@/models/User';
import VolunteerApplication from '@/models/VolunteerApplication';

const formSchema = z.object({
    selectedDomains: z.array(z.string()).max(2, "You can select up to 2 domains."),
    experience: z.string().min(1, "Experience field cannot be empty."),
    skills: z.string().min(1, "Skills field cannot be empty."),
    otherSocieties: z.string().optional(),
    availability: z.string(),
    portfolio: z.string(),
    aboutYou: z.string().min(1, "About you field cannot be empty."),
    socials: z.string().optional(),
});

export async function POST(req: NextRequest) {
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method not allowed'},{ status: 405 });
    }

    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        if (!token || !token.googleId) {
            return NextResponse.json({ error: "Google account not found in session."},{ status: 401 });
        }

        const googleId = token.googleId;

        // Connect to the database using the Mongoose connection
        await connectToDatabase();

        // Check if the user exists in the database using googleId
        const existingUser = await User.findOne({ googleId });

        if (!existingUser) {
            return NextResponse.json({ error: "User not found in the database." },{ status: 404 });
        }

        // If the user is already onboarded
        // if (existingUser.isOnboarded) {
        //   return NextResponse.json({ error: "User is already onboarded.", status: 400 });
        // }
        const body = await req.json();
        console.log(body);
        // Check if all required fields are present
        const requiredFields = ['selectedDomains', 'experience', 'skills', 'availability', 'portfolio', 'aboutYou'];
        for (const field of requiredFields) {
            if (body[field] === undefined) {
                return NextResponse.json({ error: `${field} is required`},{ status: 400 });
            }
        }

        // Parse and validate the form data
        const formData = formSchema.parse(body);

        // Check if the user has already submitted an application
        const existingApplication = await VolunteerApplication.findOne({ googleId });

        if (existingApplication) {
            return NextResponse.json({ error: 'You have already submitted an application.'},{ status: 400 });
        }

        // Save the volunteer application with the user's college email and other data
        const application = new VolunteerApplication({
            googleId,
            email: existingUser.email, // College email entered during onboarding
            name: existingUser.name,
            rollNo: existingUser.rollNo,
            branch: existingUser.branch,
            year: existingUser.year,
            ...formData,
            submittedAt: new Date(),
        });

        await application.save();

        return NextResponse.json({ message: 'Application submitted successfully.', status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation failed', errors: error.errors}, { status: 400 });
        }

        console.error('Error submitting application:', error);
        return NextResponse.json({ error: 'Internal Server Error'}, { status: 500 });
    }
}
