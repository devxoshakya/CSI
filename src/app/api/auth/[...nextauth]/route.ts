/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/config/mongoose";
import User from "@/models/User";

declare module "next-auth" {
  interface User {
    id: string;
    googleId: string; // Email used for Google OAuth
    email?: string; // Internal email provided during onboarding
    privileges: string;
    isOnboarded: boolean;
  }

  interface Session {
    user: {
      id: string;
      googleId: string;
      email?: string;
      name: string;
      image: string;
      privileges: string;
      isOnboarded: boolean;
    };
  }

  interface Profile {
    picture?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        console.log(profile);
        return {
          id: profile.sub,
          googleId: profile.email, // Store Google OAuth email
          name: profile.name,
          image: profile.picture,
          privileges: "user",
          isOnboarded: false,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDatabase();

      if (account?.provider === "google") {
        const existingUser = await User.findOne({ googleId: profile?.email });

        if (existingUser) {
          // Update user data if it already exists
          await User.updateOne(
            { googleId: profile?.email },
            {
              $set: {
                name: existingUser.name,
                image: profile?.picture || existingUser.image,
                privileges: existingUser.privileges, // Keep existing privileges
              },
            }
          );
        } else {
          // Create a new user with default role and privileges
          await User.create({
            googleId: profile?.email, // Store Google OAuth email
            name: profile?.name,
            email: `dummy_${profile?.sub}@example.com`,
            isOnboarded: false,
            image: profile?.picture || "https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg",
            privileges: "user", // Default role
          });
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      await connectToDatabase();

      // If this is the first sign-in, user data is passed
      if (user) {
        token.id = user.id;
        token.googleId = user.googleId; // Google OAuth email
        token.name = user.name;
        token.image = user.image;
        token.privileges = user.privileges || "user";
        token.isOnboarded = user.isOnboarded || false;
      } else {
        // Fetch the latest user data from the database
        const dbUser = await User.findOne({ googleId: token.googleId });
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.image = dbUser.image;
          token.privileges = dbUser.privileges;
          token.isOnboarded = dbUser.isOnboarded;
          token.email = dbUser.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.googleId = token.googleId as string; // Google OAuth email
        session.user.email = token.email as string; // Internal email (if onboarded)
        session.user.name = token.name as string;
        session.user.image = token.image as string;
        session.user.privileges = token.privileges as string;
        session.user.isOnboarded = token.isOnboarded as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
