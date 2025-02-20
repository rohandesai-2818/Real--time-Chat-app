import { ChakraProvider, Box, Center, Spinner } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"; 
function App() {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore(); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser, onlineUsers }); 

  if (isCheckingAuth && !authUser)
    return (
      <Center height="100vh">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );

  return (
    <Box p={4} data-theme={theme}> 
      <Navbar />
      <Routes>  
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/setting" element={<SettingPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster /> 
    </Box>
  );
}

export default App;
