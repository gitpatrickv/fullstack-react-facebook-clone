import { Box, Card, Skeleton, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllFriendSuggestions from "../../../hooks/user/useFetchAllFriendSuggestions";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";
import SidebarHeader from "./SidebarHeader";

const FriendSuggestions = () => {
  const { userId } = useUserStore();

  const {
    data: fetchFriendSuggestions,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllFriendSuggestions({
    userId: userId,
    pageSize: 20,
  });

  const fetchFriendSuggestionsData =
    fetchFriendSuggestions?.pages.reduce(
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
          People you may know
        </Text>

        <InfiniteScroll
          dataLength={fetchFriendSuggestionsData}
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
              {fetchFriendSuggestions &&
                fetchFriendSuggestions.pages.map((page) =>
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

export default FriendSuggestions;
