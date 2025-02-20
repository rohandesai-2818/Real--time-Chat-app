import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Input,
  IconButton,
  VStack,
  HStack,
  Divider,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <Box minH="100vh" pt={20} bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex maxW="2xl" mx="auto" p={4} py={8} direction="column">
        <Box bg={useColorModeValue("white", "gray.800")} p={6} rounded="xl" shadow="md">
          {/* Title Section */}
          <VStack spacing={2} textAlign="center">
            <Heading fontSize="2xl">Profile</Heading>
            <Text color="gray.500">Your profile information</Text>
          </VStack>

          {/* Avatar Upload Section */}
          <Flex direction="column" align="center" mt={6} gap={4}>
            <Box position="relative">
              <Avatar
                size="xl"
                name={authUser.fullName}
                src={selectedImg || authUser.profilePic || "/avatar.png"}
              />
              <IconButton
                as="label"
                htmlFor="avatar-upload"
                position="absolute"
                bottom="0"
                right="0"
                size="sm"
                bg="blue.500"
                color="white"
                icon={<Camera size={18} />}
                _hover={{ bg: "blue.600" }}
                isDisabled={isUpdatingProfile}
                aria-label="Upload Profile Picture"
              />
              <Input
                type="file"
                id="avatar-upload"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </Box>
            <Text fontSize="sm" color="gray.500">
              {isUpdatingProfile ? <Spinner size="sm" /> : "Click the camera icon to update your photo"}
            </Text>
          </Flex>

          
          <VStack spacing={6} mt={8} align="stretch">
            <Box>
              <HStack spacing={2} color="gray.500">
                <User size={16} />
                <Text fontSize="sm">Full Name</Text>
              </HStack>
              <Text p={3} bg="gray.200" rounded="lg">{authUser?.fullName}</Text>
            </Box>

            <Box>
              <HStack spacing={2} color="gray.500">
                <Mail size={16} />
                <Text fontSize="sm">Email Address</Text>
              </HStack>
              <Text p={3} bg="gray.200" rounded="lg">{authUser?.email}</Text>
            </Box>
          </VStack>

          
          <Box mt={6} p={6} bg={useColorModeValue("gray.100", "gray.700")} rounded="xl">
            <Heading fontSize="lg" mb={4}>
              Account Information
            </Heading>
            <VStack spacing={3} fontSize="sm" align="stretch">
              <HStack justify="space-between">
                <Text>Member Since</Text>
                <Text fontWeight="bold">{authUser.createdAt?.split("T")[0]}</Text>
              </HStack>
              <Divider />
              <HStack justify="space-between">
                <Text>Account Status</Text>
                <Text color="green.500" fontWeight="bold">Active</Text>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfilePage;
