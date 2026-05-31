import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    // get users input from the req
    const { name, email, password } = req.body;
    // check if the email exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }
    //generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password using salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // save the user to mongo with hashed password
    const newUser = await User.create({
      userName: name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "User registerd succesfully",
      userId: newUser._id,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    // get users input from the req
    const { name, email, password } = req.body;

    // check if user exists
    // We use .select('+password') because our schema hides it by default
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }
    // compare the hashed password the one on db
    // We pass the user's ID as the payload, our secret key, and an expiration time
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // send the json back to the user
    res.status(200).json({
      message: "Login succesfull!",
      token: token,
      user: {
        id: user._id,
        name: user.userName,
        email: user.email,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
