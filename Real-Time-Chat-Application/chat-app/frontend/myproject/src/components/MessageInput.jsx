import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image as ImageIcon, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import { Box, Button, Flex, IconButton, Image, Input } from "@chakra-ui/react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <Box p={4} w="full">
      {imagePreview && (
        <Flex mb={3} align="center" gap={2}>
          <Box position="relative">
            <Image
              src={imagePreview}
              alt="Preview"
              boxSize="80px"
              objectFit="cover"
              borderRadius="lg"
              border="1px solid"
              borderColor="gray.700"
            />
            <IconButton
              onClick={removeImage}
              aria-label="Remove image"
              icon={<X size={14} />}
              size="xs"
              colorScheme="gray"
              position="absolute"
              top="-5px"
              right="-5px"
              borderRadius="full"
            />
          </Box>
        </Flex>
      )}

      <form onSubmit={handleSendMessage}>
        <Flex align="center" gap={2}>
          <Input
            flex="1"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            size="md"
            borderRadius="md"
          />
          <Input
            type="file"
            accept="image/*"
            display="none"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <IconButton
            aria-label="Attach image"
            icon={<ImageIcon size={20} />}
            colorScheme={imagePreview ? "green" : "gray"}
            variant="ghost"
            onClick={() => fileInputRef.current?.click()}
          />

          <IconButton
            aria-label="Send message"
            icon={<Send size={22} />}
            colorScheme="blue"
            type="submit"
            isDisabled={!text.trim() && !imagePreview}
          />
        </Flex>
      </form>
    </Box>
  );
};

export default MessageInput;
