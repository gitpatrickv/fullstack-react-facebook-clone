import {
  Box,
  SimpleGrid,
  Spacer,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import FriendListCard from "../../components/user/ProfilePage/FriendListCard";
import useFetchAllUserFriends from "../../hooks/user/useFetchAllUserFriends";
import InfiniteScroll from "react-infinite-scroll-component";

const ProfileFriendListPage = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const {
    data: fetchAllFriends,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllUserFriends({
    userId: userId,
    pageSize: 6,
  });

  const fetchFriendsData =
    fetchAllFriends?.pages.reduce(
      (total, page) => total + page.userList.length,
      0
    ) || 0;

  return (
    <>
      <Box display="flex" alignItems="center" mb="10px">
        <Text fontSize="xl" fontWeight="semibold">
          Friends
        </Text>
        <Spacer />
        {!isSmallScreen && (
          <>
            <Link to="/friends/requests">
              <Text
                fontSize="md"
                color="blue.500"
                cursor="pointer"
                fontWeight="semibold"
                mr="20px"
              >
                Friend requests
              </Text>
            </Link>
            <Link to="/friends">
              <Text
                fontSize="md"
                color="blue.500"
                cursor="pointer"
                fontWeight="semibold"
              >
                Find Friends
              </Text>
            </Link>
          </>
        )}
      </Box>
      <InfiniteScroll
        dataLength={fetchFriendsData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
          {fetchAllFriends &&
            fetchAllFriends.pages.map((page) =>
              page.userList.map((list) => (
                <FriendListCard key={list.uniqueId} friend={list} />
              ))
            )}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default ProfileFriendListPage;
