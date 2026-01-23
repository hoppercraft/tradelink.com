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

const loginUser = asyncHandler(async (req, res) => {
}); 



export { registerUser };