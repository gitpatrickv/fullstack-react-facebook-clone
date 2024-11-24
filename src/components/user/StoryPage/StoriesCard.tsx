import { Avatar, Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import pic from "../../../assets/profpic.jpeg";
import { StoryModel, StoryResponse } from "../../../entities/Story";
import StorySelector from "./StorySelector";

interface Props {
  activeUser: StoryResponse | null;
}

const StoriesCard = ({ activeUser }: Props) => {
  const [activeStory, setActiveStory] = useState<StoryModel | null>(null);
  const [nextStory, setNextStory] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleStoryClick = (story: StoryModel) => {
    setActiveStory(story);
    // setNextStory(0);
    setProgress(0);
    console.log("Selected Story", story);
  };

  useEffect(() => {
    if (activeUser?.storyModels) {
      setActiveStory(activeUser.storyModels[0]);
      setNextStory(0);
    }
  }, [activeUser]);

  useEffect(() => {
    if (!activeUser?.storyModels || activeUser.storyModels.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          const nextIndex = (nextStory + 1) % activeUser.storyModels.length;
          setActiveStory(activeUser.storyModels[nextIndex]);
          setNextStory(nextIndex);
          return 0;
        }
        return prevProgress + 100 / 30;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [activeUser, nextStory]);

  return (
    <>
      <Card
        bg={
          // "#262626"
          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
        }
        height="90%"
        width={{ base: "90%", md: "55%", lg: "55%", xl: "30%" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        position="relative"
      >
        <Flex
          position="absolute"
          top="0"
          flexDirection="row"
          width="100%"
          display="flex"
          justifyContent="space-evenly"
          padding={3}
          gap={1}
        >
          {activeUser?.storyModels.map((story) => (
            <StorySelector
              key={story.storyId}
              story={story}
              handleStoryClick={() => handleStoryClick(story)}
              activeStory={activeStory}
              progress={activeStory?.storyId === story.storyId ? progress : 0}
            />
          ))}
        </Flex>
        <Box>
          <Flex alignItems="center" position="absolute" top="7" left="3">
            <Avatar
              src={activeUser?.profilePicture || pic}
              cursor="pointer"
              height="45px"
              width="45px"
            />
            <Text ml="10px" textTransform="capitalize">
              {activeUser?.firstName} {activeUser?.lastName}
            </Text>
          </Flex>
          <Flex position="relative" justifyContent="center" alignItems="center">
            <Text
              position="absolute"
              padding={4}
              fontSize={{ base: "md", md: "x-large" }}
              color="black"
            >
              {activeStory?.text}
            </Text>
            <Image src={activeStory?.storyImage || pic} />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default StoriesCard;
