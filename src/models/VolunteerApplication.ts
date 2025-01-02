// models/VolunteerApplication.js
import mongoose from 'mongoose';

const volunteerApplicationSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    selectedDomains: {
      type: [String],
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    otherSocieties: {
      type: String,
    },
    availability: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String,
      required: true,
    },
    aboutYou: {
      type: String,
      required: true,
    },
    socials: {
      type: String,
    },
    submittedAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.VolunteerApplication || mongoose.model('VolunteerApplication', volunteerApplicationSchema);
