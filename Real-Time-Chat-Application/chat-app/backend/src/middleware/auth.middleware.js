import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;  // Corrected to `req.cookies.jwt`
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - no token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user associated with the token
        const user = await User.findById(decoded.userId).select("-password"); // Ensure userId is correct from token
        if (!user) {
            return res.status(401).json({ message: "Unauthorized - user not found" });
        }

        // Attach user to request object
        req.user = user;

        next();  // Continue to the next middleware/controller
    } catch (error) {
        console.log("Error in protectRoute:", error.message);
        return res.status(500).json({ message: "Unauthorized" });
    }
};
