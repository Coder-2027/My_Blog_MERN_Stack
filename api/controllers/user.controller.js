import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";

export const updateUser = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return res
      .status(401)
      .json({
        success: false,
        message: "You are not allowed to update this user",
      });
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length > 20 || req.body.username.length < 7) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username must be between 7 and 20 characters long",
        });
    }
    if (req.body.username.includes(" ")) {
      return res
        .status(400)
        .json({ success: false, message: "Username cannot contain spaces" });
    }
    if (req.body.username != req.body.username.toLowerCase()) {
      return res
        .status(400)
        .json({ success: false, message: "Username must be in lowercase" });
    }

    // if()
    // console.log("Going to create entry in database...");
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "User successfully updated", user });
  } catch (error) {
      next(error);
  }
};
