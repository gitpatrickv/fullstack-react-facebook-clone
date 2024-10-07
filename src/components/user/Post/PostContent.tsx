import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import ReactTimeAgo from "react-time-ago";
import useDeletePost from "../../../hooks/user/useDeletePost";
import { useUserStore } from "../../../store/user-store";
import { PostProps } from "./Posts";

const PostContent = ({ posts }: PostProps) => {
  const time = new Date(posts.timestamp);
  const { mutate: deletePost } = useDeletePost();

  const handleDeletePostClick = () => {
    deletePost(posts.postId);
  };

  const { userId } = useUserStore();

  return (
    <>
      <Box display="flex" alignItems="center">
        <Avatar
          src={
            posts.profilePicture ||
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
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
        <Spacer />
        {userId === posts.userId && (
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiOutlineDotsHorizontal size="25px" />}
                variant="ghost"
                borderRadius="full"
                aria-label="menu"
              />
              <MenuList>
                <MenuItem padding={2} onClick={handleDeletePostClick}>
                  <IoTrashOutline size="25px" />
                  <Text ml="10px" fontSize="lg" fontWeight="semibold">
                    Delete Post
                  </Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        )}
      </Box>
      <Text mt="5px" mb="5px">
        {posts.content}
      </Text>
    </>
  );
};

export default PostContent;
