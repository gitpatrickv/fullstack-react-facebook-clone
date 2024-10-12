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
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoTrashOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import useDeletePost from "../../../hooks/user/useDeletePost";
import { useUserStore } from "../../../store/user-store";
import PostUserProfileCard from "./PostUserProfileCard";

interface PostContentProps {
  firstName: string;
  lastName: string;
  postUserId: number;
  profilePicture?: string;
  timestamp: string;
  postId: number;
  content: string;
}

const PostContent = ({
  firstName,
  lastName,
  postUserId,
  profilePicture,
  timestamp,
  postId,
  content,
}: PostContentProps) => {
  const time = new Date(timestamp);
  const { mutate: deletePost } = useDeletePost();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/profile/${userId}`);
  };

  const handleDeletePostClick = () => {
    deletePost(postId);
  };

  const { userId } = useUserStore();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {isHovered && (
        <PostUserProfileCard
          firstName={firstName}
          lastName={lastName}
          postUserId={postUserId}
          profilePicture={profilePicture}
          setIsHovered={setIsHovered}
          handleNavigateClick={handleNavigateClick}
        />
      )}
      <Box display="flex" alignItems="center">
        <Box
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Avatar
            src={profilePicture || pic}
            size="sm"
            mr="10px"
            cursor="pointer"
            onClick={handleNavigateClick}
          />
        </Box>
        <Box flexDirection="column">
          <Text
            fontSize="sm"
            textTransform="capitalize"
            fontWeight="semibold"
            cursor="pointer"
            onClick={handleNavigateClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {firstName} {lastName}
          </Text>
          <Text fontSize="xs" color="gray.500" fontWeight="semibold">
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
        </Box>
        <Spacer />
        {userId === postUserId && (
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
        {content}
      </Text>
    </>
  );
};

export default PostContent;
