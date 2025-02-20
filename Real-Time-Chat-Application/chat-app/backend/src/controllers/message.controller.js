import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async(req,res) =>{
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne:loggedUserId}}).Selection("-password");

        res.status(200).json(filteredUsers);
        } catch (error) {
            console.error("Error in the getUserForSidebar: ", error.message);
            res.status(500).json({error: "Error fetching users"});
            }
}; 

export const getMessage = async(req,res) => { 
    try{
        const { id:userToChatId } = req.params;
        const myId = req.user._id;

        const message = await Message.find({
            $or: [
                { senderId:myId, receiverId: userToChatId },
                { senderId: userToChatId, receiver:myId },
                ],
        })

        res .status(200).json(message);
    }catch (error){
        console.error("Error in the getMessage controller: ", error.message);
        res.status(500).json({error: "Error fetching messages"});
        }


};
export const sendMessage = async(req,res) => {
    try{
         const {text ,image } =req.body;
         const {id:receiverId} = req.params;
         const senderId = req.user._id;

         let imageUrl;
         if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
            }
            const message = new Message({
                text,
                senderId,
                receiverId,
                image: imageUrl,
                });
                await message.save();
                //todo:realtime functionality goes here =>socket.io
                res.status(201).json(newMessage);
        }catch (error){
            console.error("Error in the sendMessage controller: ", error.message);
            res.status(500).json({error: "Error sending message"});
        }
};
