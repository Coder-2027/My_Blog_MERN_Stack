import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-photo/memoji-emoji-handsome-smiling-man-white-background_826801-6987.jpg?w=740'
    }
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);