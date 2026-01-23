import { asyncHandler } from "../utils/aynchandler.utils.js";
import { Post } from "../model/post.model.js";
import { uploadOnCloudinary } from "../service/cloudninary.service.js";

const createPost = asyncHandler(async (req, res) => {

    const { title, content, author, locations } = req.body;

    if(!title?.trim() || !content?.trim() || !author.trim() || !locations) {
        return res.status(400).json({
            success: false,
            message: "Title, content, author, and locations are required."
        });
    }
    const photo  = req.files?.[0]?.path;

    if(!photo) {
        return res.status(400).json({
            success: false,
            message: "At least one image is required."
        }); 
    }

    const uploadedImageUrl = await uploadOnCloudinary(photo);

    if (!uploadedImageUrl) {
        return res.status(500).json({
            success: false,
            message: "Image upload failed."
        });
    }

    const newPost = new Post({
        title: title.trim(),
        content: content.trim(),
        author: author.trim(),
        locations: locations.trim(),
        photo: [uploadedImageUrl]
    }); 

   
    res.status(201).json({
        success: true,
        data: newPost
    });
});

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: posts
    });
});

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found."
        });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({
        success: true,
        message: "Post deleted successfully."
    });
});

export { createPost, getPosts, deletePost };
