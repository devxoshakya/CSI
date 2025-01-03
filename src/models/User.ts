// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true, // Unique ID from Google login
    },
    name: {
      type: String,
      required: true, // Fetched from Google profile
    },
    email: {
      type: String,
      unique: true, // College email fetched from Google profile
      sparse: true, // Allows multiple `null` values
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'],
    },
    image: {
      type: String, // Fetched from Google profile
    },
    rollNo: {
      type: String,
      unique: true, // Entered during registration
      sparse: true, // Allows null for users who haven't registered yet
    },
    fname: {
      type: String, // Entered during registration
    },
    branch: {
      type: String, // Entered during registration
    },
    year: {
      type: Number, // Entered during registration
    },
    phone: {
      type: String, // Entered during registration
      match: [/^\d{10}$/, 'Phone number must be 10 digits'],
    },
    privileges: {
      type: String,
      enum: ['user', 'organizer', 'admin'], // Restricts to defined roles
      default: 'user', // Default privilege is 'user'
    },
    isOnboarded: {
      type: Boolean,
      default: false, // Default is false until user completes onboarding
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
