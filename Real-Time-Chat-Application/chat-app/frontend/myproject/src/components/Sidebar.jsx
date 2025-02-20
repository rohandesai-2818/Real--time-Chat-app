import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { Users } from "lucide-react";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Icon,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <Box
      as="aside"
      h="full"
      w={{ base: "20", lg: "72" }}
      borderRight="1px solid"
      borderColor="gray.300"
      display="flex"
      flexDirection="column"
      transition="all 0.2s"
    >
      {/* Header */}
      <Box borderBottom="1px solid" borderColor="gray.300" p={5}>
        <Flex align="center" gap={2}>
          <Icon as={Users} boxSize={6} />
          <Text fontWeight="medium" display={{ base: "none", lg: "block" }}>
            Contacts
          </Text>
        </Flex>

        
        <Flex mt={3} gap={2} align="center" display={{ base: "none", lg: "flex" }}>
          <Checkbox
            size="sm"
            isChecked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
          >
            <Text fontSize="sm">Show online only</Text>
          </Checkbox>
          <Text fontSize="xs" color="gray.500">
            ({onlineUsers.length - 1} online)
          </Text>
        </Flex>
      </Box>

      
      <Box overflowY="auto" py={3}>
        {filteredUsers.map((user) => (
          <Button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            variant="ghost"
            w="full"
            py={3}
            px={4}
            justifyContent="flex-start"
            alignItems="center"
            gap={3}
            bg={selectedUser?._id === user._id ? useColorModeValue("gray.200", "gray.700") : "transparent"}
            _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          >
            <Box position="relative" mx={{ base: "auto", lg: "0" }}>
              <Image
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                boxSize="12"
                objectFit="cover"
                borderRadius="full"
              />
              {onlineUsers.includes(user._id) && (
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  boxSize={3}
                  bg="green.500"
                  borderRadius="full"
                  border="2px solid"
                  borderColor="white"
                />
              )}
            </Box>

           
            <Box display={{ base: "none", lg: "block" }} textAlign="left" minW={0}>
              <Text fontWeight="medium" isTruncated>
                {user.fullName}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </Text>
            </Box>
          </Button>
        ))}

        {filteredUsers.length === 0 && (
          <Text textAlign="center" color="gray.500" py={4}>
            No online users
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
