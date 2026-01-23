import { asyncHandler } from "../utils/aynchandler.utils.js";
import jwt from "jsonwebtoken";


const authCheck = asyncHandler(
    async (req, res, next) => {
       
       try {
         const token = req.cookies?.accessToken;
         if (!token) {
             return res.status(401).json({ message: "Unauthorized: No token provided" });
         }
         const decoded = jwt.verify(token, process.env.accessToken_SECRET);
         req.user = decoded;
         next();
       } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
       }
    })

export { authCheck };
