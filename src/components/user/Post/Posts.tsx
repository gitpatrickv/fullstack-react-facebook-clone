import {
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { FetchAllUserPostsProps } from "../../../entities/Post";
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
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Card padding={3} mt="10px">
        <PostContent posts={posts} />
        <PostImages posts={posts} />
        <LikeCommentShareButton postId={posts.postId} onOpen={onOpen} />
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
            <LikeCommentShareButton postId={posts.postId} onOpen={onOpen} />
            <Divider mt="5px" mb="5px" color="gray.500" />
            <Comments />
            <Comments />
          </ModalBody>
          <Divider />
          <WriteComment />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Posts;
