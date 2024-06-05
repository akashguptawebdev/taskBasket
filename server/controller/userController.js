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
      res.send(200).json("Fill all form");
    }
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).json("Invalid Email or Password !");
    }

    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched){
      return res.status(400).json("Invalid Email or Password !");

    }

    generateToken(user , "user Login Successfully !" , 200 , res);
  } catch (err) {}
};


export const getUserDetails = async(req , res , next)=>{
  const user = req.user;
  console.log(req.user)
  res.status(200).json({
    succes: true,
    user,
  });
}