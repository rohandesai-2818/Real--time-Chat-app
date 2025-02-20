import { Users } from "lucide-react";
import { Box, Flex, Skeleton, VStack, useColorModeValue } from "@chakra-ui/react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <Box
      as="aside"
      h="full"
      w={{ base: "20", lg: "72" }}
      borderRight="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      display="flex"
      flexDirection="column"
      transition="all 0.2s"
    >
      <Box borderBottom="1px solid" borderColor={useColorModeValue("gray.300", "gray.700")} p={5}>
        <Flex align="center" gap={2}>
          <Users size={24} />
          <Box fontWeight="medium" display={{ base: "none", lg: "block" }}>
            Contacts
          </Box>
        </Flex>
      </Box>

      <VStack spacing={3} overflowY="auto" py={3} w="full">
        {skeletonContacts.map((_, idx) => (
          <Flex key={idx} w="full" p={3} align="center" gap={3}>
            <Skeleton boxSize={12} borderRadius="full" mx={{ base: "auto", lg: "0" }} />
            <Box display={{ base: "none", lg: "block" }} flex="1">
              <Skeleton h="4" w="32" mb={2} />
              <Skeleton h="3" w="16" />
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SidebarSkeleton;
