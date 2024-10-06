import {
  Box,
  Card,
  Divider,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import PostImage from "../../../entities/PostImage";
import useGetPostImageCommentCount from "../../../hooks/user/useGetPostImageCommentCount";
import useGetPostImageLike from "../../../hooks/user/useGetPostImageLike";
import useGetPostImageLikeCount from "../../../hooks/user/useGetPostImageLikeCount";
import useGetPostImageLikeUserList from "../../../hooks/user/useGetPostImageLikeUserList";
import useLikePostImage from "../../../hooks/user/useLikePostImage";
import useSharePostImage from "../../../hooks/user/useSharePostImage";
import SharePostModal from "./SharePostModal";

export interface PostImageProps {
  activeImage: PostImage | null;
  focusInputClick: () => void;
  postId: number;
}

const PostImagesButtons = ({
  activeImage,
  focusInputClick,
  postId,
}: PostImageProps) => {
  const postImageId = activeImage?.postImageId ?? 0;
  const { colorMode } = useColorMode();
  const { mutate: likePostImage } = useLikePostImage();
  const { data: postImageLike } = useGetPostImageLike(postImageId);
  const { data: postImageLikeCount } = useGetPostImageLikeCount(postImageId);
  const { data: postImageLikeUserList } =
    useGetPostImageLikeUserList(postImageId);
  const { data: postImageCommentCount } =
    useGetPostImageCommentCount(postImageId);

  const handleLikePostImageClick = () => {
    likePostImage(postImageId);
  };
  const {
    register,
    loading,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccessful,
    setIsSuccessful,
  } = useSharePostImage(postId, postImageId);

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
      <Box display="flex" alignItems="center" ml="12px" mr="12px">
        {postImageLikeCount && postImageLikeCount.postLikeCount >= 1 && (
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
              {postImageLike?.liked
                ? postImageLikeCount.postLikeCount > 1
                  ? `You and ${postImageLikeCount.postLikeCount - 1} others`
                  : "You"
                : postImageLikeCount.postLikeCount > 0
                ? `${postImageLikeCount.postLikeCount} ${
                    postImageLikeCount.postLikeCount === 1 ? "like" : "likes"
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
            {postImageLikeUserList?.map((user) => (
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
        {postImageCommentCount &&
          postImageCommentCount?.postCommentCount >= 1 && (
            <Box display="flex" alignItems="center" mr="10px">
              <Text mr="5px">{postImageCommentCount?.postCommentCount}</Text>
              <FaComment />
            </Box>
          )}
        <Box display="flex" alignItems="center">
          <Text mr="3px">50</Text>
          <IoIosShareAlt />
        </Box>
      </Box>
      <Divider mt="5px" mb="5px" color="gray.500" />
      <Box display="flex" justifyContent="space-around">
        <Box
          {...boxStyles}
          onClick={handleLikePostImageClick}
          color={postImageLike?.liked ? "blue.500" : "white.500"}
        >
          {postImageLike ? <BiSolidLike size="20px" /> : <BiLike size="20px" />}
          <Text ml="5px">Like</Text>
        </Box>
        <Box {...boxStyles} onClick={focusInputClick}>
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
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          setValue={setValue}
          isSuccessful={isSuccessful}
          setIsSuccessful={setIsSuccessful}
        />
      </Box>
    </>
  );
};

export default PostImagesButtons;
