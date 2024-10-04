import { Avatar, Box, Image, Text, useColorMode } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import { PostComment } from "../../../entities/PostComment";
interface Props {
  comments: PostComment;
}

const Comments = ({ comments }: Props) => {
  const time = new Date(comments.timestamp);
  const { colorMode } = useColorMode();
  const textStyles = {
    fontSize: "sm",
    cursor: "pointer",
    _hover: { textDecoration: "underline" },
  };

  // const commentBottom = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (commentBottom.current) {
  //     commentBottom.current.scrollIntoView();
  //   }
  // }, [comments.comment, comments.commentImage]);

  return (
    <>
      <Box mt="10px">
        <Box display="flex">
          <Avatar
            src={
              comments.profilePicture ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            size="sm"
            mr="5px"
          />
          <Box
            bg={
              comments.comment
                ? colorMode === "dark"
                  ? "gray.600"
                  : "gray.100"
                : undefined
            }
            borderRadius="20px"
            padding={comments.comment ? "6px 12px 6px 12px" : "4px"}
          >
            <Text
              fontSize="sm"
              fontWeight="semibold"
              textTransform="capitalize"
            >
              {comments.firstName} {comments.lastName}
            </Text>
            <Text>{comments.comment}</Text>
          </Box>
        </Box>
        {comments.commentImage && (
          <Box ml="40px" mt="5px" mb="5px">
            <Image
              src={comments.commentImage}
              objectFit="cover"
              width="50%"
              height="auto"
              borderRadius="10px"
            />
          </Box>
        )}
        <Box display="flex" ml="50px">
          <Text mr="20px" {...textStyles}>
            <ReactTimeAgo date={time} locale="en-US" />
          </Text>
          <Text mr="20px" {...textStyles}>
            Like
          </Text>
          <Text {...textStyles}>Reply</Text>
        </Box>
      </Box>
      {/* <Box ref={commentBottom}></Box> */}
    </>
  );
};

export default Comments;
