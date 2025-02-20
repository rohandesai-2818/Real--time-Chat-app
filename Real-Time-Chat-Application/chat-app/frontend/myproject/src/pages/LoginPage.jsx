import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <Flex height="100vh" align="center" justify="center" bg="gray.100">
      <Box
        maxW="md"
        w="full"
        p={8}
        borderRadius="lg"
        bg="white"
        boxShadow="md"
      >
        <VStack spacing={6} align="center">
          {/* Logo */}
          <Flex direction="column" align="center">
            <IconButton
              icon={<MessageSquare size={24} />}
              size="lg"
              isRound
              variant="ghost"
              colorScheme="blue"
            />
            <Heading size="lg" mt={2}>
              Welcome Back
            </Heading>
            <Text color="gray.600">Sign in to your account</Text>
          </Flex>

       
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Mail size={18} />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement>
                    <Lock size={18} />
                  </InputLeftElement>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isLoading={isLoggingIn}
                spinner={<Spinner size="sm" />}
              >
                Sign in
              </Button>
            </VStack>
          </form>

          <Text color="gray.600">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#3182ce", fontWeight: "bold" }}>
              Create account
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default LoginPage;
