import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { Box, Container, Flex } from "@chakra-ui/react";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <Box h="100vh" bg="gray.100" pt="20">
      <Container maxW="6xl" px="4">
        <Box
          bg="white"
          rounded="lg"
          shadow="lg"
          w="full"
          h="calc(100vh - 8rem)"
          overflow="hidden"
        >
          <Flex h="full">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </Flex>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
