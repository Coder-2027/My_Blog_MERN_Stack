import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const updateUser = async (req, res, next) => {
  // console.log("Inside updateUser");
  if (req.user.userId !== req.params.userId) {
    return res.status(401).json({
      success: false,
      message: "You are not allowed to update this user",
    });
  }
  // console.log("Hello");
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length > 20 || req.body.username.length < 7) {
      return res.status(400).json({
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

export const deleteUser = async (req, res, next) => {
  // console.log(req.user);
  // console.log(req.params);
  // console.log("Inside deleteUser");
  if (!req.user.isAdmin) {
    return res.status(404).json({
      success: false,
      message: "You are not allowed to delete this user",
    });
  }
  // console.log("Hello");
  try {
    await User.findByIdAndDelete(req.params.userId);
    return res
      .status(200)
      .json({ success: true, message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    return res
      .clearCookie("access_Token")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  // console.log("Hello");
  if (!req.user.isAdmin) {
    return res.status(500).json({
      success: false,
      message: "You are not authorized to view users",
    });
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const users = await User.find()
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select("-password");

    // console.log(posts);
    // const userWithoutPassword = users.map(user => {
    //   const {password, ...rest} = user._doc;
    //   return rest;
    // })

    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      users,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async(req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if(!user){
      return next(errorHandler(404, "User not found"));
    }
    const {password, ...rest} = user._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}