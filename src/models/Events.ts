import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true }, // Unique event identifier
    eventSecret: { type: String, required: true }, // Secret key for the event
    title: { type: String, required: true },
    date: { type: Date, required: true },
    adminEmail: { type: String, required: true }, // Store admin's email directly
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: String }], // Array to store googleId of users who liked the event
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);
