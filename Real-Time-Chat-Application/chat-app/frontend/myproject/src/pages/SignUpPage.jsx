import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";


import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        p={8}
        boxShadow="lg"
        bg="white"
        borderRadius="lg"
      >
        
        <Stack align="center" mb={6}>
          <Flex align="center" justify="center" w={12} h={12} bg="blue.100" borderRadius="md">
            <MessageSquare size={24} color="#3182ce" />
          </Flex>
          <Heading fontSize="2xl">Create Account</Heading>
          <Text color="gray.500">Get started with your free account</Text>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
           
            <FormControl>
              <FormLabel>Full Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User size={20} color="gray" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </InputGroup>
            </FormControl>

            
            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Mail size={20} color="gray" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </InputGroup>
            </FormControl>

            
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock size={20} color="gray" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <InputRightElement>
                  <IconButton
                    size="sm"
                    icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    aria-label="Toggle Password Visibility"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

           
            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              isLoading={isSigningUp}
              spinner={<Loader2 size={20} className="animate-spin" />}
            >
              Create Account
            </Button>
          </Stack>
        </form>

      
        <Text textAlign="center" mt={4}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#3182ce", fontWeight: "bold" }}>
            Sign in
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default SignUpPage;
