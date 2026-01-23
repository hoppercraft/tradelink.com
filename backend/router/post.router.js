import { Router } from "express";
import { authCheck } from "../middleware/authcheck.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { createPost, getPosts, deletePost } from "../controller/post.controller.js";

const router = Router();

router.post("/", authCheck, upload.any(), createPost);
router.get("/", authCheck, getPosts);
router.delete("/:id", authCheck, deletePost);

export default router;