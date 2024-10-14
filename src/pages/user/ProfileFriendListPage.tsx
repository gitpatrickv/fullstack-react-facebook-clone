import {
  Box,
  SimpleGrid,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import FriendListCard from "../../components/user/ProfileFriendListPage/FriendListCard";
import useFetchAllUserFriends from "../../hooks/user/useFetchAllUserFriends";

const ProfileFriendListPage = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { data: fetchAllFriends } = useFetchAllUserFriends({
    userId: userId,
    pageSize: 6,
  });
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
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={1}>
        {fetchAllFriends &&
          fetchAllFriends.pages.map((page) =>
            page.userList.map((list) => (
              <FriendListCard key={list.uniqueId} friend={list} />
            ))
          )}
      </SimpleGrid>
    </>
  );
};

export default ProfileFriendListPage;
