import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, password, email } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email === "" ||
    password === "" ||
    email === ""
  ) {
    next(errorHandler(401, "Please fill all fields"));
  }

  try {
    const user = await User.create({
      username,
      password: bcryptjs.hashSync(password, 10),
      email,
    });
    if (!user) {
      return res.status(500).json({
        message: "Failed to create user",
      });
    }

    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandler(401, "Please fill all fields"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "Email not found"));
    }

    const isPasswordValid = bcryptjs.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      return next(errorHandler(401, "Invalid password"));
    }

    const token = jwt.sign(
      { userId: validUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const { password: pass, ...rest } = validUser._doc;

    return res
      .status(200)
      .cookie("access_Token", token, { httpOnly: true })
      .json({
        message: "User signed in successfully",
        user: rest,
      });
  } catch (error) {
    next(error);
  }
};