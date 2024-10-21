import {
  Box,
  Card,
  Skeleton,
  SkeletonText,
  Spinner,
  Text,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllUserFriends from "../../../hooks/user/useFetchAllUserFriends";
import useGetUserFriendListCount from "../../../hooks/user/useGetUserFriendListCount";
import { useUserStore } from "../../../store/user-store";
import FriendsList from "./FriendsList";
import SidebarHeader from "./SidebarHeader";
const AllFriends = () => {
  const { userId } = useUserStore();
  const { data: getFriendListCount, isLoading: countIsLoading } =
    useGetUserFriendListCount(userId ?? 0);

  const {
    data: fetchAllFriends,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllUserFriends({
    userId: userId,
    pageSize: 10,
  });

  const fetchFriendsData =
    fetchAllFriends?.pages.reduce(
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
        {countIsLoading ? (
          <SkeletonText />
        ) : (
          <Text fontSize="lg" fontWeight="semibold">
            {getFriendListCount?.count} friends
          </Text>
        )}

        <InfiniteScroll
          dataLength={fetchFriendsData}
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
              {fetchAllFriends &&
                fetchAllFriends.pages.map((page) =>
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

export default AllFriends;
