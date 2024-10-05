import {
  Box,
  Card,
  Divider,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { PiShareFatLight } from "react-icons/pi";
import Post from "../../../entities/Post";
import useGetPostCommentCount from "../../../hooks/user/useGetPostCommentCount";
import useGetPostLike from "../../../hooks/user/useGetPostLike";
import useGetPostLikeCount from "../../../hooks/user/useGetPostLikeCount";
import useGetPostLikeUserList from "../../../hooks/user/useGetPostLikeUserList";
import useLikePost from "../../../hooks/user/useLikePost";
import SharePostModal from "./SharePostModal";
import useGetPostShareCount from "../../../hooks/user/useGetPostShareCount";

interface Props {
  posts: Post;
  onOpen: () => void;
  handleFocusInputClick: () => void;
}

const LikeCommentShareButton = ({
  posts,
  onOpen,
  handleFocusInputClick,
}: Props) => {
  const { data: postLike } = useGetPostLike(posts.postId);
  const { data: postLikeCount } = useGetPostLikeCount(posts.postId);
  const { data: postLikeUserList } = useGetPostLikeUserList(posts.postId);
  const { data: postCommentCount } = useGetPostCommentCount(posts.postId);
  const { data: postShareCount } = useGetPostShareCount(posts.postId);
  const { mutate: likePost } = useLikePost();

  const handleLikePostClick = () => {
    likePost(posts.postId);
  };
  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const boxStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    _hover: {
      bg: colorMode === "dark" ? "gray.600" : "gray.100",
    },
    borderRadius: "5px",
  };
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const {
    isOpen: isOpenShareModal,
    onOpen: onOpenShareModal,
    onClose: onCloseShareModal,
  } = useDisclosure();

  return (
    <>
      <Box display="flex" mt="5px" alignItems="center">
        {postLikeCount && postLikeCount.postLikeCount >= 1 && (
          <>
            <Box
              border="1px solid"
              borderRadius="full"
              width="20px"
              height="20px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderColor="blue.500"
              bg="blue.500"
              mr="5px"
              cursor="pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <BiSolidLike size="14px" />
            </Box>
            <Text>
              {postLike?.liked
                ? postLikeCount.postLikeCount > 1
                  ? `You and ${postLikeCount.postLikeCount - 1} others`
                  : "You"
                : postLikeCount.postLikeCount > 0
                ? `${postLikeCount.postLikeCount} ${
                    postLikeCount.postLikeCount === 1 ? "like" : "likes"
                  }`
                : ""}
            </Text>
          </>
        )}
        {isHovered && (
          <Card
            bg="gray.100"
            width="fit-content"
            height="auto"
            padding={2}
            color="black"
            zIndex={100}
            position="absolute"
            mb="100px"
          >
            <Text fontWeight="semibold" fontSize="md">
              Like
            </Text>
            {postLikeUserList?.map((user) => (
              <Text
                key={user.postLikeId}
                fontSize="sm"
                textTransform="capitalize"
              >
                {user.firstName} {user.lastName}
              </Text>
            ))}
          </Card>
        )}

        <Spacer />
        {postCommentCount && postCommentCount?.postCommentCount >= 1 && (
          <Box
            display="flex"
            mr="15px"
            alignItems="center"
            onClick={
              postCommentCount.postCommentCount > 1
                ? onOpen
                : handleFocusInputClick
            }
            cursor="pointer"
            userSelect="none"
          >
            <Text mr="3px">{postCommentCount?.postCommentCount}</Text>
            {isSmallScreen ? (
              <FaComment />
            ) : (
              <Text>
                {postCommentCount.postCommentCount > 1 ? "comments" : "comment"}
              </Text>
            )}
          </Box>
        )}
        {postShareCount && postShareCount.sharedPostCount >= 1 && (
          <Box display="flex" alignItems="center">
            <Text mr="3px">{postShareCount?.sharedPostCount}</Text>
            {isSmallScreen ? (
              <PiShareFatLight />
            ) : (
              <Text>
                {postShareCount?.sharedPostCount > 1 ? "shares" : "share"}
              </Text>
            )}
          </Box>
        )}
      </Box>
      <Divider mt="5px" mb="5px" color="gray.500" />
      <Box display="flex" justifyContent="space-around">
        <Box
          {...boxStyles}
          onClick={handleLikePostClick}
          color={postLike?.liked ? "blue.500" : "white.500"}
        >
          {postLike ? <BiSolidLike size="20px" /> : <BiLike size="20px" />}
          <Text ml="5px">Like</Text>
        </Box>
        <Box {...boxStyles} onClick={handleFocusInputClick}>
          <FaComment size="20px" />
          <Text ml="5px">Comment</Text>
        </Box>
        <Box {...boxStyles} onClick={onOpenShareModal}>
          <IoIosShareAlt size="25px" />
          <Text ml="5px">Share</Text>
        </Box>
        <SharePostModal
          isOpen={isOpenShareModal}
          onClose={onCloseShareModal}
          posts={posts}
        />
      </Box>
    </>
  );
};

export default LikeCommentShareButton;
