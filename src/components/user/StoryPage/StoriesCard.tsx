import { Avatar, Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import { StoryModel, StoryResponse } from "../../../entities/Story";
import { useStoryStore } from "../../../store/story-store";
import StorySelector from "./StorySelector";

interface Props {
  fetchAllStories: StoryResponse[] | [];
  activeStory: StoryModel | null;
  setActiveStory: (value: StoryModel) => void;
  nextStoryIndex: number;
  setNextStoryIndex: (value: number) => void;
  progress: number;
  setProgress: (value: number) => void;
}

const StoriesCard = ({
  fetchAllStories,
  activeStory,
  setActiveStory,
  nextStoryIndex,
  setNextStoryIndex,
  progress,
  setProgress,
}: Props) => {
  const { activeUser } = useStoryStore();

  const time = activeStory?.timestamp ? new Date(activeStory.timestamp) : null;
  const handleStoryClick = (index: number) => {
    if (!activeUser?.storyModels) {
      return;
    }
    setNextStoryIndex(index);
    setActiveStory(activeUser?.storyModels[index]);
    setProgress(0);
    console.log("Current Index", index);
  };

  return (
    <>
      <Card
        bg={
          // "#262626"
          "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
        }
        height="90%"
        width={{ base: "90%", md: "80%", lg: "90%", xl: "85%" }}
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
          {activeUser?.storyModels.map((story, index) => (
            <StorySelector
              key={story.storyId}
              story={story}
              handleStoryClick={() => handleStoryClick(index)}
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
            <Flex flexDirection="column">
              <Text ml="10px" textTransform="capitalize" fontWeight="semibold">
                {activeUser?.firstName} {activeUser?.lastName}
              </Text>
              <Text ml="10px" fontSize="sm">
                {time && <ReactTimeAgo date={time} locale="en-US" />}
              </Text>
            </Flex>
          </Flex>
          <Flex
            // position="relative"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Text
              // position={activeStory?.storyImage ? "absolute" : "static"}
              // padding={4}
              fontSize={{ base: "md", md: "x-large" }}
              color="black"
              textTransform="uppercase"
              textAlign="center"
            >
              {activeStory?.text}
            </Text>
            <Image src={activeStory?.storyImage} />
          </Flex>
        </Box>
      </Card>
    </>
  );
};

export default StoriesCard;
