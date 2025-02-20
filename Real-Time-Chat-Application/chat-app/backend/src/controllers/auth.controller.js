import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
            }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error("Error in signup controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const login = async (req, res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({message:"Invalid credentails"});
            }

            const isPasswordCorrect = await bcrypt.compare(password,user.password)
            if  (!isPasswordCorrect){
                return res.status(400).json({message:"Invalid credentails"});
                }
                generateToken(user._id,res)

                res .status(200).json({
                    _id:user._id,
                    userName:user.userName,
                    email:user.email,
                    profilePic:user.profilePic,
                    })
            } catch (error) {
                console.error("Error in login controller:", error.message);
                return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out sucessfully"});
        } catch (error) {
            console.error("Error in logout controller:", error.message);
            return res.status(500).json({ message: "Internal server error" });
            }
    
};

export const updateProfile = async(req,res) =>{
    try{
        const {profilePic} = req.body;
         const userId = req.user._id;

         if(!profilePic){
            return res.status(400).json({message:"Profilepic is required"});

         }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updateUser = await User.findByIdAndUpdate(
            userId,
            {profilePic:uploadResponse,secure_url },
            {new:true}
        );
         res.status(200).json({message:"Profile updated sucessfully"});

         } catch (error) {
            console.error("Error in update profile controller:", error.message);
            return res.status(500).json({ message: "Internal server error" });
            }
    };

export const checkAuth = (req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.error("Error in check auth controller:", error.message);
        return res.status(500).json({ message: "Internal server error" });
        
    }
}