import {
  Avatar,
  Box,
  Button,
  Card,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebookMessenger, FaPlus, FaUserPlus } from "react-icons/fa";
import pic from "../../../assets/profpic.jpeg";
import Post from "../../../entities/Post";
import useAddToFriend from "../../../hooks/user/useAddToFriend";
import { useUserStore } from "../../../store/user-store";
import { MdModeEdit } from "react-icons/md";

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

  const handleAddFriendClick = () => {
    mutation.mutate(posts.userId);
    setIsLoading(true);
  };

  return (
    <Card
      padding={5}
      width={{ base: "250px", md: "430px" }}
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
                  colorScheme="blue"
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
              <>
                <Button
                  mr="10px"
                  onClick={handleAddFriendClick}
                  isLoading={isLoading}
                >
                  <FaUserPlus size="20px" />
                  {isSmallScreen ? null : <Text ml="10px">Add Friend</Text>}
                </Button>
                <Button mr="7px" colorScheme="blue">
                  <FaFacebookMessenger size="20px" />
                  {isSmallScreen ? null : <Text ml="5px">Message</Text>}
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostUserProfileCard;
