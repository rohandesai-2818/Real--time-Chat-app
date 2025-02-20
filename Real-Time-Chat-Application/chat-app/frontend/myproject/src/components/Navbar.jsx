import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <Box
      as="header"
      bg={useColorModeValue("whiteAlpha.800", "gray.800")}
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      position="fixed"
      w="full"
      top={0}
      zIndex={40}
    >
      <Container maxW="container.lg" px={4} h={16}>
        <Flex align="center" justify="space-between" h="full">
      /* Logo */
          <Flex align="center" gap={2.5} as={Link} to="/" _hover={{ opacity: 0.8 }}>
            <Flex
              w={9}
              h={9}
              borderRadius="lg"
              bg="blue.100"
              align="center"
              justify="center"
            >
              <Icon as={MessageSquare} boxSize={5} color="blue.500" />
            </Flex>
            <Heading size="md" fontWeight="bold">
              Chatty
            </Heading>
          </Flex>

        
          <Flex align="center" gap={2}>
            <Button as={Link} to="/settings" size="sm" leftIcon={<Settings size={16} />}>
              <Box display={{ base: "none", sm: "inline" }}>Settings</Box>
            </Button>

            {authUser && (
              <>
                <Button as={Link} to="/profile" size="sm" leftIcon={<User size={18} />}>
                  <Box display={{ base: "none", sm: "inline" }}>Profile</Box>
                </Button>

                <IconButton
                  aria-label="Logout"
                  icon={<LogOut size={18} />}
                  size="sm"
                  onClick={logout}
                  display={{ base: "flex", sm: "none" }}
                />

                <Button
                  onClick={logout}
                  size="sm"
                  leftIcon={<LogOut size={18} />}
                  display={{ base: "none", sm: "inline-flex" }}
                >
                  Logout
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
