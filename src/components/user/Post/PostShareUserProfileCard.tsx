import {
  Avatar,
  Box,
  Button,
  Card,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import pic from "../../../assets/profpic.jpeg";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useAddToFriend from "../../../hooks/user/useAddToFriend";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useUserStore } from "../../../store/user-store";
import { ProfileCardProps } from "./PostUserProfileCard";
import UserProfileCardButton from "./UserProfileCardButton";

const PostShareUserProfileCard = ({
  posts,
  setIsHovered,
  handleNavigateClick,
}: ProfileCardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { userId } = useUserStore();
  const { mutation, isLoading, setIsLoading } = useAddToFriend();
  const { data: friendshipStatus } = useGetFriendshipStatus(
    posts.sharedPost?.userId ?? 0
  );
  const { data: friendRequestStatus } = useGetFriendRequestStatus(
    posts.sharedPost?.userId ?? 0
  );

  const handleAddFriendClick = () => {
    if (posts.sharedPost) {
      mutation.mutate(posts.sharedPost?.userId);
      setIsLoading(true);
    }
  };

  const {
    mutation: unfriend,
    isLoading: unfriendIsLoading,
    setIsLoading: setUnfriendIsLoading,
  } = useUnfriend();

  const handleUnfriendClick = () => {
    if (posts.sharedPost) unfriend.mutate(posts.sharedPost?.userId);
    setUnfriendIsLoading(true);
  };

  const {
    mutation: acceptRequest,
    isLoading: acceptRequestIsLoading,
    setIsLoading: setAcceptRequestIsLoading,
  } = useAcceptFriendRequest();
  const handleAcceptFriendRequestClick = () => {
    if (posts.sharedPost) acceptRequest.mutate(posts.sharedPost?.userId);
    setAcceptRequestIsLoading(true);
  };

  return (
    <Card
      padding={5}
      position="absolute"
      zIndex={100}
      left="10px"
      bottom="80px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      border="1px solid"
      borderColor="gray.500"
      boxShadow="0 0 5px 0px rgba(160, 160, 160, 0.5)"
    >
      <Box display="flex">
        <Avatar
          src={posts.sharedPost?.profilePicture || pic}
          height={{ base: "75px", md: "100px" }}
          width={{ base: "75px", md: "100px" }}
          mr="10px"
          cursor="pointer"
          onClick={handleNavigateClick}
        />
        <Box display="flex" flexDirection="column">
          <Text
            fontSize={{ base: "lg", md: "2xl" }}
            textTransform="capitalize"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleNavigateClick}
          >
            {posts.sharedPost?.firstName} {posts.sharedPost?.lastName}
          </Text>
          <Box display="flex" mt={{ base: "5px", md: "20px" }}>
            {userId === posts.sharedPost?.userId ? (
              <>
                <Button
                  mr="7px"
                  bg="blue.500"
                  _hover={{ bg: "blue.600" }}
                  ml={{ base: "10px", md: "0px" }}
                >
                  <FaPlus size="15px" />
                  {isSmallScreen ? null : <Text ml="5px">Add to Story</Text>}
                </Button>
                <Button mr="7px">
                  <MdModeEdit size="20px" />
                  {isSmallScreen ? null : <Text ml="5px">Edit profile</Text>}
                </Button>
              </>
            ) : (
              <UserProfileCardButton
                friendshipStatus={friendshipStatus}
                handleAddFriendClick={handleAddFriendClick}
                handleUnfriendClick={handleUnfriendClick}
                isLoading={isLoading}
                unfriendIsLoading={unfriendIsLoading}
                friendRequestStatus={friendRequestStatus}
                handleAcceptFriendRequestClick={handleAcceptFriendRequestClick}
                acceptRequestIsLoading={acceptRequestIsLoading}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostShareUserProfileCard;
