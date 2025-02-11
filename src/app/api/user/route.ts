import { NextResponse, NextRequest } from 'next/server';
import connectToDatabase from '@/config/mongoose';
import USER from '@/models/User';
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


        // Fetch all users
        const users = await USER.find({});
        return NextResponse.json({ users });

    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
