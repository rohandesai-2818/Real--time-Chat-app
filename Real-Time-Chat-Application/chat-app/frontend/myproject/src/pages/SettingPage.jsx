import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
w
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

const SettingsPage = () => {
  const { theme, setTheme, getThemeColors } = useThemeStore();
  const { bg, text } = getThemeColors(theme);

  return (
    <Box h="100vh" pt="20" bg={bg} color={text}>
      <Container maxW="5xl" px="4">
        <VStack spacing="6" align="start">
          <Box>
            <Heading size="md">Theme</Heading>
            <Text fontSize="sm" color="gray.500">
              Choose a theme for your chat interface
            </Text>
          </Box>

          <Grid templateColumns="repeat(auto-fill, minmax(60px, 1fr))" gap={2}>
            {THEMES.map((t) => (
              <Button
                key={t}
                variant="outline"
                bg={theme === t ? "gray.300" : "transparent"}
                _hover={{ bg: "gray.200" }}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </Button>
            ))}
          </Grid>

          <Heading size="md">Preview</Heading>
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" bg={bg} color={text} boxShadow="lg" w="full">
            <Flex p="4" borderBottomWidth="1px" alignItems="center">
              <Flex w="8" h="8" borderRadius="full" bg="blue.500" align="center" justify="center" color="white" fontWeight="medium">
                J
              </Flex>
              <Box ml="3">
                <Text fontWeight="medium">John Doe</Text>
                <Text fontSize="xs" color="gray.500">Online</Text>
              </Box>
            </Flex>

            <Box p="4" minH="200px" maxH="200px" overflowY="auto">
              {PREVIEW_MESSAGES.map((message) => (
                <Flex key={message.id} justify={message.isSent ? "flex-end" : "flex-start"} mb="2">
                  <Box maxW="80%" borderRadius="xl" p="3" boxShadow="sm" bg={message.isSent ? "blue.500" : "gray.200"} color={message.isSent ? "white" : "black"}>
                    <Text fontSize="sm">{message.content}</Text>
                    <Text fontSize="xs" mt="1" color="gray.400">12:00 PM</Text>
                  </Box>
                </Flex>
              ))}
            </Box>

            <Flex p="4" borderTopWidth="1px">
              <Input placeholder="Type a message..." isReadOnly />
              <IconButton aria-label="Send" icon={<Send size={18} />} colorScheme="blue" ml="2" />
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default SettingsPage;
