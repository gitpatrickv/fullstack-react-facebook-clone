import { Avatar, Box, Card, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import pic from "../../../assets/profpic.jpeg";
import { StoryResponse } from "../../../entities/Story";

interface Props {
  story: StoryResponse;
}

const StoryCard = ({ story }: Props) => {
  const [storyImage, setStoryImage] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (story.storyModels.length >= 1) {
      setStoryImage(story.storyModels[0].storyImage || "");
      setText(story.storyModels[0].text || "");
    }
  }, [story.storyModels]);

  return (
    <>
      <Card
        height="200px"
        width="120px"
        mt="10px"
        cursor="pointer"
        position="relative"
        ml="10px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        bg={
          storyImage
            ? "#262626"
            : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
        }
      >
        <Box position="absolute" top="10px" left="10px">
          <Avatar src={story.profilePicture || pic} size="sm" zIndex={10} />
        </Box>

        <Text
          position="absolute"
          left="10px"
          right="10px"
          top="70px"
          fontSize="10px"
          textTransform="uppercase"
          textAlign="center"
        >
          {text}
        </Text>
        {storyImage && <Image src={storyImage} />}

        <Text
          position="absolute"
          bottom="10px"
          left="10px"
          fontSize="sm"
          fontWeight="bold"
          textTransform="capitalize"
        >
          {story.firstName} {story.lastName}
        </Text>
      </Card>
    </>
  );
};

export default StoryCard;
