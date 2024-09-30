import {
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
import { useEffect, useRef, useState } from "react";
import { FetchAllUserPostsProps } from "../../../entities/Post";
import Comments from "./Comments";
import LikeCommentShareButton from "./LikeCommentShareButton";
import PostContent from "./PostContent";
import PostImages from "./PostImages";
import WriteComment from "./WriteComment";
import useFetchAllPostComments from "../../../hooks/user/useFetchAllPostComments";

export interface PostProps {
  posts: FetchAllUserPostsProps;
}

const Posts = ({ posts }: PostProps) => {
  const { colorMode } = useColorMode();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
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

  return (
    <>
      <Card padding={3} mt="10px">
        <PostContent posts={posts} />
        <PostImages posts={posts} />
        <LikeCommentShareButton posts={posts} onOpen={onOpen} isOpen={isOpen} />
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
        <WriteComment posts={posts} isOpen={isModalOpen} />
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
              isOpen={isModalOpen}
            />
            <Divider mt="5px" mb="5px" color="gray.500" />
            {fetchAllPostComments?.postCommentList.map((comments) => (
              <Comments key={comments.postCommentId} comments={comments} />
            ))}
          </ModalBody>
          <Divider />
          <WriteComment posts={posts} isOpen={isModalOpen} />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Posts;
