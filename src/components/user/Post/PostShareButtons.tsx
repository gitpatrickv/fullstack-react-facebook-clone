import {
  Box,
  Divider,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import PostImage from "../../../entities/PostImage";
import useLikePostImage from "../../../hooks/user/useLikePostImage";
import useGetPostImageLike from "../../../hooks/user/useGetPostImageLike";

interface Props {
  activeImage: PostImage | null;
}

const PostShareButtons = ({ activeImage }: Props) => {
  const postImageId = activeImage?.postImageId ?? 0;
  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { mutate: likePostImage } = useLikePostImage();
  const { data: postImageLike } = useGetPostImageLike(postImageId);

  const handleLikePostImageClick = () => {
    likePostImage(postImageId);
  };

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

  return (
    <>
      {console.log(activeImage?.postImageId)}
      <Box display="flex" alignItems="center" ml="12px" mr="12px">
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
          >
            <BiSolidLike size="14px" />
          </Box>
        </>

        {/* <Card
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
        </Card> */}
        <Spacer />
        <Box display="flex" alignItems="center" mr="10px">
          <Text mr="3px">1</Text>
          <FaComment />
        </Box>
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
        <Box {...boxStyles}>
          <FaComment size="20px" />
          <Text ml="5px">Comment</Text>
        </Box>
        <Box {...boxStyles}>
          <IoIosShareAlt size="25px" />
          <Text ml="5px">Share</Text>
        </Box>
      </Box>
    </>
  );
};

export default PostShareButtons;
