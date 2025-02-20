import { MessageSquare } from "lucide-react";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const NoChatSelected = () => {
  return (
    <Flex 
      flex="1" 
      direction="column" 
      align="center" 
      justify="center" 
      p={16} 
      bg="gray.50"
    >
      <Box textAlign="center" maxW="md" spacing={6}>
    
        <Flex justify="center" mb={4}>
          <Box
            w={16}
            h={16}
            bg="blue.100"
            rounded="xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            animation="bounce 1.5s infinite"
          >
            <MessageSquare size={32} color="#3182ce" />
          </Box>
        </Flex>

        
        <Heading size="lg" fontWeight="bold">
          Welcome to Chatty!
        </Heading>
        <Text color="gray.600">
          Select a conversation from the sidebar to start chatting
        </Text>
      </Box>
    </Flex>
  );
};

export default NoChatSelected;
