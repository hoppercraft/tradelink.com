import { asyncHandler } from "../utils/aynchandler.utils.js";
import { User } from "../model/user.model.js";


const registerUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.status(409).json({ message: "Username already taken" });
    }

    const newUser = new User({ username, password });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" }); 
});

const generateTokens = (user) => {
    try {
        const accessToken = user.accessToken();
        const refreshToken = user.refreshToken();
        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Token generation failed");
    }
};

const loginUser = asyncHandler(async (req, res) => {

    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(401).json({ message: "Invalid username " });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const { accessToken, refreshToken } = generateTokens(user);

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge:  24 * 60 * 60 * 1000,
    }
    res.cookie("refreshToken", refreshToken, options)
    res.cookie("accessToken", accessToken,options); 

    res.status(200).json({
        sucess: true,
        message: "Login successful",
    })
}); 

const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logout successful" });
}); 

const getProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const user = await User.findById(userId).select("-password  -_id");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
});

const changePassword = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const { oldPassword, newPassword } = req.body;
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        return res.status(401).json({ message: "Old password is incorrect" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
}); 
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const { fullname, email, location } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }       

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.location = location || user.location;

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
});

const deleteUser = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const {password} = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: "Password is incorrect" });
    }

    await User.findByIdAndDelete(userId);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.status(200).json({ message: "User deleted successfully" }); 
});

export { registerUser,loginUser , logoutUser, getProfile, changePassword , updateProfile ,deleteUser};