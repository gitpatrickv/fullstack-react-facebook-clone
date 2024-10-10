import { Box, Button, Divider, SimpleGrid, Text } from "@chakra-ui/react";
import useFetchAllFriendRequest from "../../../hooks/user/useFetchAllFriendRequest";
import { useUserStore } from "../../../store/user-store";
import FriendRequestCard from "./FriendRequestCard";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const PeopleYouMayKnow = () => {
  const { userId } = useUserStore();
  const {
    data: fetchAllRequest,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useFetchAllFriendRequest({
    userId: userId,
    pageSize: 10,
  });

  const requestList =
    fetchAllRequest?.pages.flatMap((page) => page.userList) || [];
  const requestListSize = requestList.length > 10;
  const requestSize = requestList.length >= 1;

  return (
    <>
      {requestSize && (
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
            <Link to="/friends/requests">
              <Text fontSize="lg" color="blue.500" cursor="pointer">
                See all
              </Text>
            </Link>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 7 }} spacing={2}>
            {fetchAllRequest?.pages.map((page) =>
              page.userList.map((request) => (
                <FriendRequestCard key={request.uniqueId} request={request} />
              ))
            )}
          </SimpleGrid>
          {requestListSize && (
            <Button
              width="100%"
              mt="10px"
              color="blue.500"
              onClick={() => fetchNextPage()}
              isDisabled={!hasNextPage || isFetchingNextPage}
              isLoading={isFetchingNextPage}
            >
              <Text mr="10px">See More</Text> <FaCaretDown />
            </Button>
          )}

          <Divider mt="20px" mb="10px" />
        </>
      )}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: "10px", md: "20px" }}
      >
        <Text fontSize="2xl" fontWeight="bold">
          People you may know
        </Text>
        <Text fontSize="lg" color="blue.500" cursor="pointer">
          See all
        </Text>
      </Box>
    </>
  );
};

export default PeopleYouMayKnow;
