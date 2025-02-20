import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token validity
    });

    // Set the token in cookies
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
        httpOnly: true, // Protect against XSS
        sameSite: "strict", // Protect against CSRF
        secure: process.env.NODE_ENV !== "development", // HTTPS only in production
    });

    return token;
};
