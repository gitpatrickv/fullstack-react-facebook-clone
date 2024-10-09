import { Box, SimpleGrid, Text } from "@chakra-ui/react";

import FriendRequestCard from "../../components/user/FriendsPage/FriendRequestCard";

const FriendRequestPage = () => {
  const array = Array.from({ length: 10 }, (_, i) => i + 1);
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "10px", md: "20px" }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Friend Requests
        </Text>
        <Text fontSize="lg" color="blue.500" cursor="pointer">
          See all
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 7 }} spacing={2}>
        {array.map((card) => (
          <FriendRequestCard key={card} />
        ))}
      </SimpleGrid>
    </>
  );
};

export default FriendRequestPage;
