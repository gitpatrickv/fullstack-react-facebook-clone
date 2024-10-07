import { Avatar, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { PostProps } from "./Posts";
import PostShareUserProfileCard from "./PostShareUserProfileCard";

const PostShareContent = ({ posts }: PostProps) => {
  const navigate = useNavigate();
  const time = new Date(
    posts.sharedPost?.timestamp ?? new Date().toISOString()
  );

  const handleNavigateClick = () => {
    navigate(`/profile/${posts.sharedPost?.userId}`);
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {isHovered && (
        <PostShareUserProfileCard
          posts={posts}
          setIsHovered={setIsHovered}
          handleNavigateClick={handleNavigateClick}
        />
      )}
      <Box padding={3}>
        <Box display="flex" alignItems="center">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar
              src={posts.sharedPost?.profilePicture || pic}
              size="sm"
              mr="10px"
              cursor="pointer"
              onClick={handleNavigateClick}
            />
          </Box>
          <Box
            flexDirection="column"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Text
              fontSize="sm"
              textTransform="capitalize"
              fontWeight="semibold"
              cursor="pointer"
              onClick={handleNavigateClick}
            >
              {posts.sharedPost?.firstName} {posts.sharedPost?.lastName}
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="semibold">
              <ReactTimeAgo date={time} locale="en-US" />
            </Text>
          </Box>
        </Box>
        <Text mt="5px" mb="5px">
          {posts.sharedPost?.content}
        </Text>
      </Box>
    </>
  );
};

export default PostShareContent;
