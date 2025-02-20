import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <Box p={2.5} borderBottom="1px solid" borderColor="gray.300">
      <Flex align="center" justify="space-between">
        
        <Flex align="center" gap={3}>
          
          <Avatar
            size="md"
            name={selectedUser.fullName}
            src={selectedUser.profilePic || "/avatar.png"}
          />

          
          <Box>
            <Text fontWeight="medium">{selectedUser.fullName}</Text>
            <Text fontSize="sm" color="gray.500">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </Text>
          </Box>
        </Flex>

        
        <IconButton
          aria-label="Close chat"
          icon={<X size={20} />}
          size="sm"
          colorScheme="gray"
          variant="ghost"
          onClick={() => setSelectedUser(null)}
        />
      </Flex>
    </Box>
  );
};

export default ChatHeader;
