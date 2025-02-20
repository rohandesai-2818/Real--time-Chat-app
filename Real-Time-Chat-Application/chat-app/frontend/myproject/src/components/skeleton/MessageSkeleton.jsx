import { Box, Flex, Skeleton, VStack } from "@chakra-ui/react";

const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <VStack flex="1" overflowY="auto" p={4} spacing={4}>
      {skeletonMessages.map((_, idx) => (
        <Flex key={idx} align="center" gap={3} alignSelf={idx % 2 === 0 ? "flex-start" : "flex-end"}>
          <Skeleton boxSize={10} borderRadius="full" />
          <Box>
            <Skeleton h={4} w={16} mb={1} />
            <Skeleton h={16} w="200px" borderRadius="md" />
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};

export default MessageSkeleton;
