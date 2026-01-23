import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";  

const userSchema = new mongoose.Schema({
    photo: { type: String },
    fullname: { type: String },
    email: { type: String, unique: true },
    location: { type: String },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return ;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (candidatePassword) { 
    return await bcrypt.compare(candidatePassword, this.password);
}
userSchema.methods.accessToken = function () {
    return jwt.sign(
        { userId: this._id,
         username: this.username },
        process.env.accessToken_SECRET,
        { expiresIn: process.env.accessToken_EXPIRE }
    );
};

userSchema.methods.refreshToken = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
         process.env.refreshToken_SECRET,

        { 
            expiresIn: process.env.refreshToken_EXPIRE
        }
    );
};


export const User = mongoose.model("User", userSchema); 