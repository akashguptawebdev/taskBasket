import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from "validator";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        validate:[validator.isEmail, "Please Provide a valid Email"],
        required:true,
    },
    password:{
        type:String,
        minLength: [8  , "Password Must contain At Least 8 char"],
        select:false,
        required:true,
    }
})

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password)
}
const JWT_SECRET_KEY = "kljsakhkjhcasl";
const JWT_EXPIRES = "7d"
userSchema.methods.generateJsonWebToken = function (){
    return jwt.sign({id:this._id} ,JWT_SECRET_KEY , {
        expiresIn:JWT_EXPIRES
    })
}


export const userModel = mongoose.model("user", userSchema);