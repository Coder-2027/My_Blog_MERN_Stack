import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (
    !email ||
    !username ||
    !password ||
    email === "" ||
    password === "" ||
    email === ""
  ) {
    return res.status(401).json({
      message: "Please fill all fields",
    });
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
    return res.status(500).json({
      messege: error.message,
    });
  }
};
