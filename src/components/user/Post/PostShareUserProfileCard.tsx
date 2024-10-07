import {
  Avatar,
  Box,
  Button,
  Card,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebookMessenger, FaUserPlus } from "react-icons/fa";
import pic from "../../../assets/profpic.jpeg";
import { ProfileCardProps } from "./PostUserProfileCard";

const PostShareUserProfileCard = ({
  posts,
  setIsHovered,
  handleNavigateClick,
}: ProfileCardProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Card
      padding={5}
      width={{ base: "250px", md: "420px" }}
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
            <Button mr="10px">
              <FaUserPlus size="20px" />
              {isSmallScreen ? null : <Text ml="10px">Add Friend</Text>}
            </Button>
            <Button mr="7px" colorScheme="blue">
              <FaFacebookMessenger size="20px" />
              {isSmallScreen ? null : <Text ml="5px">Message</Text>}
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default PostShareUserProfileCard;
