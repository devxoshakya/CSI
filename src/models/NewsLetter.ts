import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    subscribedAt: {
        type: Date,
        default: Date.now,
    },
});

const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
export default Newsletter;