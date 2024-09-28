import { Avatar, Box, Card, Text, useColorMode } from "@chakra-ui/react";
import { PostComment } from "../../../entities/PostComment";
import ReactTimeAgo from "react-time-ago";
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

  return (
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
        <Card
          bg={colorMode === "dark" ? "gray.600" : "gray.100"}
          borderRadius="20px"
          padding="6px 12px 6px 12px"
        >
          <Text fontSize="sm" fontWeight="semibold" textTransform="capitalize">
            {comments.firstName} {comments.lastName}
          </Text>
          <Text>{comments.comment}</Text>
        </Card>
      </Box>
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
  );
};

export default Comments;
