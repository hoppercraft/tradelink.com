import express from "express"
import cors from "cors";
import dotenv from "dotenv";
import cookie from "cookie-parser";

dotenv.config({
    path : "./.env"
});

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookie());


//routes
import userRouter from "./router/user.router.js";
app.use("/api/v1/tradelink", userRouter);

import postRouter from "./router/post.router.js";
app.use("/api/v1/tradelink/post", postRouter);

export default app;