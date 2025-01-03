import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    eventId: { type: String, ref: 'Event', required: true },
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['registered', 'cancelled'], default: 'registered' },
});

export default mongoose.model('Registration', registrationSchema);