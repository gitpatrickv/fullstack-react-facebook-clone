import { Avatar, Box, Text } from "@chakra-ui/react";
import { PostProps } from "./Posts";
import ReactTimeAgo from "react-time-ago";

const PostShareContent = ({ posts }: PostProps) => {
  const time = new Date(
    posts.sharedPost?.timestamp ?? new Date().toISOString()
  );

  return (
    <Box padding={3}>
      <Box display="flex" alignItems="center">
        <Avatar
          src={
            posts.sharedPost?.profilePicture ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
          }
          size="sm"
          mr="10px"
        />
        <Box flexDirection="column">
          <Text fontSize="sm" textTransform="capitalize" fontWeight="semibold">
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
  );
};

export default PostShareContent;
