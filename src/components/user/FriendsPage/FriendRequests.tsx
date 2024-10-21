import { Box, Card, Skeleton, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllFriendRequest from "../../../hooks/user/useFetchAllFriendRequest";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";
import SidebarHeader from "./SidebarHeader";

const FriendRequests = () => {
  const { userId } = useUserStore();
  const {
    data: fetchAllRequest,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useFetchAllFriendRequest({
    userId: userId,
    pageSize: 10,
  });

  const fetchFriendRequestsData =
    fetchAllRequest?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5];
  return (
    <Card
      borderRadius="none"
      height={{ base: "100vh", lg: "99vh", xl: "93vh" }}
    >
      <Box
        padding={3}
        position="sticky"
        top="60px"
        mt={{ base: "50px", xl: "0" }}
        height="100%"
        overflowY="auto"
        id="scrollable-box"
      >
        <SidebarHeader />
        <Text fontSize="lg" fontWeight="semibold">
          Friend Requests
        </Text>

        <InfiniteScroll
          dataLength={fetchFriendRequestsData}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={<Spinner />}
          scrollableTarget="scrollable-box"
        >
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <Skeleton height="100px" key={skeleton} mt="10px" />
              ))}
            </>
          ) : (
            <>
              {fetchAllRequest &&
                fetchAllRequest.pages.map((page) =>
                  page.userList.map((list) => (
                    <FriendsList key={list.uniqueId} friend={list} />
                  ))
                )}
            </>
          )}
        </InfiniteScroll>
      </Box>
    </Card>
  );
};

export default FriendRequests;
