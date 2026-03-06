import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


// USER LOGIN
export const userLogin = async (req, res) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      status: "success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({ error: "Internal server error" });

  }
};



// USER REGISTER
export const userRegister = async (req, res) => {

  const { name, email, password } = req.body;

  try {

    const existing = await User.findOne({ email });

    if (existing) {
      return res.json("Already have an account");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "Account created successfully"
    });

  } catch (error) {

    res.status(500).json({ error: "Failed to register" });

  }
};



// GET ALL USERS
export const getAllUsers = async (req, res) => {

  try {

    const data = await User.find();

    res.status(200).json(data);

  } catch (error) {

    console.error("Error fetching users:", error);

    res.status(500).json({
      error: "Internal server error"
    });

  }
};



// GET USER BY ID
export const getUserById = async (req, res) => {

  const { id } = req.params;

  try {

    const user = await User.findById(id);

    res.json(user);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
};



// UPDATE USER
export const updateUser = async (req, res) => {

  const { id } = req.params;
  const { name, email } = req.body;

  try {

    const updated = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );

    res.json(updated);

  } catch (error) {

    res.status(500).json({
      error: "Failed to update user"
    });

  }
};

export const deleteUser = async (req, res) => {

  const { id } = req.params;

  try {

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully" });

  } catch (error) {

    res.status(500).json({ error: "Failed to delete user" });

  }

};