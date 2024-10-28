import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaUserCheck } from "react-icons/fa";
import { FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useUserStore } from "../../../store/user-store";
import AddFriendButton from "../Buttons/AddFriendButton";

interface Props {
  user: UserDataModelList;
}

const SearchList = ({ user }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const { userId: currentUserId } = useUserStore();
  const handleNavigateClick = () => {
    navigate(`/profile/${user.userId}`);
  };

  const { data: friendshipStatus } = useGetFriendshipStatus(user.userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(user.userId);

  const {
    mutation: acceptRequest,
    isLoading: acceptRequestIsLoading,
    setIsLoading: setAcceptRequestIsLoading,
  } = useAcceptFriendRequest();

  const handleAcceptFriendRequestClick = () => {
    acceptRequest.mutate(user.userId);
    setAcceptRequestIsLoading(true);
  };

  return (
    <Flex justifyContent="space-between" alignItems="center" padding={2}>
      <Flex alignItems="center">
        <Avatar
          src={user.profilePicture || pic}
          cursor="pointer"
          height={{ base: "45px", md: "60px" }}
          width={{ base: "45px", md: "60px" }}
          onClick={handleNavigateClick}
        />

        <Text
          ml="10px"
          textTransform="capitalize"
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "lg" }}
          isTruncated={true}
          width={{ base: "100px", md: "300px" }}
          onClick={handleNavigateClick}
          cursor="pointer"
          _hover={{ textDecoration: "underline" }}
        >
          {user.firstName} {user.lastName}
        </Text>
      </Flex>
      {currentUserId === user.userId ? (
        <Button
          onClick={handleNavigateClick}
          bg="#1877F2"
          _hover={{ bg: "#165BB7" }}
        >
          <Text fontSize={{ base: "sm", md: "md" }}>View Profile</Text>
        </Button>
      ) : (
        <>
          {friendshipStatus && friendshipStatus?.status === "FRIENDS" ? (
            <Button bg="#1877F2" _hover={{ bg: "#165BB7" }}>
              <Box display="flex">
                {!isSmallScreen && (
                  <Box mr="10px">
                    <FaUserCheck size="20px" />
                  </Box>
                )}
                <Text fontSize={{ base: "sm", md: "md" }}>Friends</Text>
              </Box>
            </Button>
          ) : friendRequestStatus &&
            friendRequestStatus?.status === "PENDING" ? (
            <>
              <Button
                onClick={handleAcceptFriendRequestClick}
                isLoading={acceptRequestIsLoading}
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
              >
                {!isSmallScreen && (
                  <Box mr="10px">
                    <FaUserPlus size="20px" />
                  </Box>
                )}
                <Text fontSize={{ base: "sm", md: "md" }}>Accept</Text>
              </Button>
            </>
          ) : (
            <AddFriendButton
              userId={user.userId}
              friendshipStatus={friendshipStatus?.status}
            >
              {friendshipStatus && friendshipStatus?.status === "PENDING" ? (
                <>
                  <Box mr="10px">
                    <FaUserXmark size="20px" />
                  </Box>

                  <Text fontSize={{ base: "sm", md: "md" }}>Cancel</Text>
                </>
              ) : (
                <>
                  {!isSmallScreen && (
                    <Box mr="10px">
                      <FaUserPlus size="20px" />
                    </Box>
                  )}
                  <Text fontSize={{ base: "sm", md: "md" }}>Add Friend</Text>
                </>
              )}
            </AddFriendButton>
          )}
        </>
      )}
    </Flex>
  );
};

export default SearchList;
