import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventId: { type: String, required: true, unique: true }, // Unique event identifier
    title: { type: String, required: true },
    date: { type: Date, required: true },
    adminEmail: { type: String, required: true }, // Store admin's email directly
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Event || mongoose.model('Event', eventSchema);;
