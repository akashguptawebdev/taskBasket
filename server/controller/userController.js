import { userModel } from "../models/userModel.js";
import { generateToken } from "../utils/jwtToken.js";

export const userRegistration = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json("Fill all form fields");
        }

        let user = await userModel.findOne({ email });

        if (user) {
            return res.status(400).json("Email Already Exists");
        }

        user = await userModel.create({
            fullname,
            email,
            password,
        });

        generateToken(user, "User Registered", 200, res);
    } catch (err) {
        res.status(500).json({
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

        let user = await userModel.findOne({ email }).select("+password");

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

        generateToken(user, "User Login Successfully!", 200, res);
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Server error. Please try again later.",
        });
    }
};

// Logout function
export const logout = async (req, res, next) => {
  res.clearCookie("loginToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
  });

  res.status(200).json({
      success: true,
      message: "User logged out successfully!",
  });
};

export const getUserDetails = async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
};
