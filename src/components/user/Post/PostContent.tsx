import { Avatar, Box, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import { PostProps } from "./Posts";

const PostContent = ({ posts }: PostProps) => {
  const time = new Date(posts.timestamp);
  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          src={
            posts.profilePicture ||
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
          mr="10px"
        />
        <Box flexDirection="column">
          <Text fontSize="sm" textTransform="capitalize" fontWeight="semibold">
            {posts.firstName} {posts.lastName}
          </Text>
          <Text fontSize="xs" color="gray.500" fontWeight="semibold">
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Box>
      </Box>
      <Text mt="5px" mb="5px">
        {posts.content}
      </Text>
    </>
  );
};

export default PostContent;
