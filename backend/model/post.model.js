import mongoose from 'mongoose';    

const postSchema = new mongoose.Schema({ 
    photo: { type: [String] ,default: [], required: true },
    title: { type: String, required: true },
    content: { type: String, required: true }, 
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    locations: { type: [String], default: [] }

},{ timestamps: true });

export const Post = mongoose.model('Post', postSchema);

