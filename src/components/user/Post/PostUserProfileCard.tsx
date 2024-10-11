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
import Post from "../../../entities/Post";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useAddToFriend from "../../../hooks/user/useAddToFriend";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useUserStore } from "../../../store/user-store";
import UserProfileCardButton from "./UserProfileCardButton";

export interface ProfileCardProps {
  posts: Post;
  setIsHovered: (value: boolean) => void;
  handleNavigateClick: () => void;
}

const PostUserProfileCard = ({
  posts,
  setIsHovered,
  handleNavigateClick,
}: ProfileCardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { userId } = useUserStore();
  const { mutation, isLoading, setIsLoading } = useAddToFriend();
  const { data: friendshipStatus } = useGetFriendshipStatus(posts.userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(posts.userId);

  const handleAddFriendClick = () => {
    mutation.mutate(posts.userId);
    setIsLoading(true);
  };

  const {
    mutation: unfriend,
    isLoading: unfriendIsLoading,
    setIsLoading: setUnfriendIsLoading,
  } = useUnfriend();

  const handleUnfriendClick = () => {
    unfriend.mutate(posts.userId);
    setUnfriendIsLoading(true);
  };

  const {
    mutation: acceptRequest,
    isLoading: acceptRequestIsLoading,
    setIsLoading: setAcceptRequestIsLoading,
  } = useAcceptFriendRequest();
  const handleAcceptFriendRequestClick = () => {
    acceptRequest.mutate(posts.userId);
    setAcceptRequestIsLoading(true);
  };

  return (
    <Card
      padding={5}
      position="absolute"
      zIndex={100}
      left="10px"
      top="-125px"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      border="1px solid"
      borderColor="gray.500"
      boxShadow="0 0 5px 0px rgba(160, 160, 160, 0.5)"
    >
      <Box display="flex">
        <Avatar
          src={posts.profilePicture || pic}
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
            {posts.firstName} {posts.lastName}
          </Text>
          <Box display="flex" mt={{ base: "5px", md: "20px" }}>
            {userId === posts.userId ? (
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

export default PostUserProfileCard;
