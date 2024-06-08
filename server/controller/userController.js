import { userModel } from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";
export const userRegistration = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      res.send(200).json("Fill all form");
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(200).json("Email Already Exist");
    }

    user = await userModel.create({
      fullname,
      email,
      password,
    });

    generateToken(user, "user Registerd", 200, res);
  } catch (err) {
    res.status(400).json({
      message: err.message,
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details!",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password!",
      });
    }

    generateToken(user, "user Login Successfully !", 200, res);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("loginToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user Log Out Successfully !",
    });
};

export const getUserDetails = async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    succes: true,
    user,
  });
};
