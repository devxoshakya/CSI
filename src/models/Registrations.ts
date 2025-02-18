import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
    eventId: { type: String, required: true },
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true },
    image: {type: String, required: true},
    registrationDate: { type: Date, default: Date.now },
});

export default mongoose.models.Registration || mongoose.model('Registration', registrationSchema);