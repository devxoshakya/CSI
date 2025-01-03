import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
    eventId: { type: String, ref: 'Event', required: true },
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    email: { type: String, required: true },
    attendanceTime: { type: Date, default: Date.now },
});

export default mongoose.model('Attendance', attendanceSchema);
