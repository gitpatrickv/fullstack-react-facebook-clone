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
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";
import { FetchAllUserPostsProps } from "../../../entities/Post";
import Comments from "./Comments";
import PostContent from "./PostContent";
import PostImages from "./PostImages";
import WriteComment from "./WriteComment";

export interface PostProps {
  posts: FetchAllUserPostsProps;
}

const Posts = ({ posts }: PostProps) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
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
    padding: "3px",
  };

  return (
    <>
      <Card padding={3} mt="10px">
        <PostContent posts={posts} />
        <PostImages postImages={posts.postImages} posts={posts} />
        <Box display="flex" mt="5px">
          <Text>Likes</Text>
          <Spacer />
          <Box
            display="flex"
            mr="15px"
            alignItems="center"
            onClick={onOpen}
            cursor="pointer"
            userSelect="none"
          >
            <Text mr="3px">99</Text>
            {isSmallScreen ? <FaRegComment /> : <Text>comments</Text>}
          </Box>
          <Box display="flex" alignItems="center">
            <Text mr="3px">50</Text>
            {isSmallScreen ? <PiShareFatLight /> : <Text>shares</Text>}
          </Box>
        </Box>
        <Divider mt="5px" mb="5px" color="gray.500" />
        <Box display="flex" justifyContent="space-around">
          <Box {...boxStyles}>
            <BiLike size="20px" />
            <Text ml="5px">Like</Text>
          </Box>
          <Box {...boxStyles} onClick={onOpen}>
            <FaRegComment size="20px" />
            <Text ml="5px">Comment</Text>
          </Box>
          <Box {...boxStyles}>
            <PiShareFatLight size="20px" />
            <Text ml="5px">Share</Text>
          </Box>
        </Box>
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
            <PostImages postImages={posts.postImages} posts={posts} />
            <Box display="flex" mt="5px">
              <Text>Likes</Text>
              <Spacer />
              <Box display="flex" mr="15px" alignItems="center">
                <Text mr="3px">99</Text>
                {isSmallScreen ? <FaRegComment /> : <Text>comments</Text>}
              </Box>
              <Box display="flex" alignItems="center">
                <Text mr="3px">50</Text>
                {isSmallScreen ? <PiShareFatLight /> : <Text>shares</Text>}
              </Box>
            </Box>
            <Divider mt="5px" mb="5px" color="gray.500" />
            <Box display="flex" justifyContent="space-around">
              <Box {...boxStyles}>
                <BiLike size="20px" />
                <Text ml="5px">Like</Text>
              </Box>

              <Box {...boxStyles}>
                <FaRegComment size="20px" />
                <Text ml="5px">Comment</Text>
              </Box>

              <Box {...boxStyles}>
                <PiShareFatLight size="20px" />
                <Text ml="5px">Share</Text>
              </Box>
            </Box>
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
