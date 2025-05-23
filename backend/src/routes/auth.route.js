const jwt = require("jsonwebtoken")
const express = require("express");
const authRouter = express.Router();
const { loginSchema, signupSchema } = require("../validationSchema/signupSchema");
authRouter.use(express.json());
const dotenv = require("dotenv");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
dotenv.config();

authRouter.post("/signup", async (req, res) => {
    const parsedData = signupSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors[0].message });
    }
    const { email, username, password, role } = parsedData.data;

    try {
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
 
        const newUser = new UserModel({ email, username, password: hashedPassword, role });
        const savedUser = await newUser.save();

        if (!savedUser) {
            return res.status(500).json({ message: "Error saving user" });
        }

        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }

});

authRouter.post("/login", async (req, res) => {
    const parsedData = loginSchema.safeParse(req.body);
    if (!parsedData.success) {
        return res.status(400).json({ message: parsedData.error.errors[0].message });
    }
    const { username, password } = parsedData.data;

    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = authRouter