import { useEffect, useRef } from "react";
import { Box, VStack, Flex, Avatar, Text, Image, Spinner } from "@chakra-ui/react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <VStack flex="1" overflow="auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </VStack>
    );
  }

  return (
    <VStack flex="1" overflow="auto" spacing={0}>
      <ChatHeader />

      <VStack flex="1" overflowY="auto" p={4} spacing={4} w="full">
        {messages.map((message) => (
          <Flex
            key={message._id}
            align="start"
            gap={3}
            alignSelf={message.senderId === authUser._id ? "flex-end" : "flex-start"}
            ref={messageEndRef}
          >
            <Avatar
              size="md"
              src={
                message.senderId === authUser._id
                  ? authUser.profilePic || "/avatar.png"
                  : selectedUser.profilePic || "/avatar.png"
              }
            />
            <VStack align="start" spacing={1}>
              <Text fontSize="xs" color="gray.500">
                {formatMessageTime(message.createdAt)}
              </Text>
              <Box
                bg={message.senderId === authUser._id ? "blue.500" : "gray.600"}
                color="white"
                px={4}
                py={2}
                borderRadius="md"
                maxW="200px"
              >
                {message.image && <Image src={message.image} alt="Attachment" borderRadius="md" mb={2} />}
                {message.text && <Text>{message.text}</Text>}
              </Box>
            </VStack>
          </Flex>
        ))}
        <div ref={messageEndRef} />
      </VStack>

      <MessageInput />
    </VStack>
  );
};

export default ChatContainer;
