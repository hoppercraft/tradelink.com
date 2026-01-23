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

const getPosts = asyncHandler(async (req, res) => {});

const deletePost = asyncHandler(async (req, res) => {});

export { createPost, getPosts, deletePost };
