import mongoose from "mongoose";
import dotenv from "dotenv";
import mongodb from "mongodb";
import { dataBaseName } from "../contants.js";

dotenv.config( {
    path: "./.env"  
});

const connectdb =  async () => {
    try {
        const response = await mongoose.connect(`${process.env.MONGO_URL}/${dataBaseName}`);
        console.log("Database connected successfully", response.connection.host);
    } catch (error) {
        console.log("Database connection failed", error);
        process.exit(1);
    }
}

export {connectdb}