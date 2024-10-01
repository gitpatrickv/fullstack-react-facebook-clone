import {
  Box,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FetchAllUserPostsProps } from "../../../entities/Post";
import useFetchAllPostComments from "../../../hooks/user/useFetchAllPostComments";
import useWritePostComment from "../../../hooks/user/useWritePostComment";
import Comments from "./Comments";
import LikeCommentShareButton from "./LikeCommentShareButton";
import PostContent from "./PostContent";
import PostImages from "./PostImages";
import WriteComment from "./WriteComment";

export interface PostProps {
  posts: FetchAllUserPostsProps;
}

const Posts = ({ posts }: PostProps) => {
  const { colorMode } = useColorMode();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, _setPage] = useState<number>(1);
  const pageSize = 25;

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const { data: fetchAllPostComments } = useFetchAllPostComments({
    postId: posts.postId,
    pageNo: page,
    pageSize: pageSize,
  });

  const postCommentSize =
    fetchAllPostComments && fetchAllPostComments?.postCommentList.length >= 2;

  const handleFocusInputClick = () => {
    if (isModalOpen) {
      initialRef.current?.focus();
    } else {
      finalRef.current?.focus();
    }
  };

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    comment,
    setComment,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
  } = useWritePostComment(posts.postId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    if (isModalOpen) {
      fileInputRef.current?.click();
    } else {
      inputRef.current?.click();
    }
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setValue("comment", e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImagePreviewClick = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("file", undefined);
  };

  return (
    <>
      <Card padding={3} mt="10px">
        <PostContent posts={posts} />
        <PostImages posts={posts} />
        <LikeCommentShareButton
          posts={posts}
          onOpen={onOpen}
          handleFocusInputClick={handleFocusInputClick}
        />
        <Divider mt="5px" mb="5px" color="gray.500" />
        {postCommentSize && (
          <Text
            onClick={onOpen}
            cursor="pointer"
            color="gray.500"
            fontWeight="semibold"
          >
            View more comments
          </Text>
        )}
        {fetchAllPostComments?.postCommentList.slice(-1).map((comments) => (
          <Comments key={comments.postCommentId} comments={comments} />
        ))}
        <WriteComment
          isOpen={isModalOpen}
          focusRef={finalRef}
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          loading={loading}
          comment={comment}
          imageFile={imageFile}
          handleInputClick={handleInputClick}
          handleCommentChange={handleCommentChange}
          fileInputRef={inputRef}
          handleFileChange={handleFileChange}
          imagePreview={imagePreview}
          removeImageClick={handleRemoveImagePreviewClick}
        />
      </Card>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent maxWidth={{ base: "90%", lg: "70%", xl: "40%" }}>
          <ModalHeader
            position="sticky"
            top="0"
            zIndex={10}
            textTransform="capitalize"
            textAlign="center"
            bg={colorMode === "dark" ? "gray.700" : "white"}
            borderBottom="1px solid"
            borderColor={colorMode === "dark" ? "gray.500" : "gray.200"}
          >
            {posts.firstName} {posts.lastName}'s Post
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <PostContent posts={posts} />
            <PostImages posts={posts} />
            <LikeCommentShareButton
              posts={posts}
              onOpen={onOpen}
              handleFocusInputClick={handleFocusInputClick}
            />
            <Divider mt="5px" mb="5px" color="gray.500" />
            {fetchAllPostComments?.postCommentList.map((comments) => (
              <Comments key={comments.postCommentId} comments={comments} />
            ))}
          </ModalBody>
          <Divider />
          <Box position="sticky" bottom="0" zIndex={10}>
            <WriteComment
              isOpen={isModalOpen}
              focusRef={initialRef}
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              loading={loading}
              comment={comment}
              imageFile={imageFile}
              handleInputClick={handleInputClick}
              handleCommentChange={handleCommentChange}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              imagePreview={imagePreview}
              removeImageClick={handleRemoveImagePreviewClick}
            />
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Posts;
