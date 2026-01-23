import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
        process.env.JWT1_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    );
};

userSchema.methods.refreshToken = function () {
    return jwt.sign(
        { userId: this._id, username: this.username },
        process.env.JWT2_REFRESH_SECRET,
        { expiresIn: process.env.JWT2_REFRESH_EXPIRE }
    );
};


export const User = mongoose.model("User", userSchema); 