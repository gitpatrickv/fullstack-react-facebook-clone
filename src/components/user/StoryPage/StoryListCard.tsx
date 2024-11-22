import {
  Avatar,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import pic from "../../../assets/profpic.jpeg";
import { StoryResponse } from "../../../entities/Story";
import { useStoryStore } from "../../../store/story-store";

interface Props {
  story: StoryResponse;
  storyByUser?: boolean;
}

const StoryListCard = ({ story, storyByUser }: Props) => {
  const { colorMode } = useColorMode();
  const { onOpen } = useStoryStore();
  return (
    <>
      <Flex
        alignItems="center"
        _hover={{
          bg: colorMode === "dark" ? "#303030" : "gray.100",
        }}
        padding={2}
        cursor="pointer"
        borderRadius="5px"
      >
        <Avatar
          src={story.profilePicture || pic}
          cursor="pointer"
          height="60px"
          width="60px"
        />
        <Flex flexDirection="column" ml="10px">
          <Text fontWeight="semibold" textTransform="capitalize">
            {story.firstName} {story.lastName}
          </Text>
          <Text color="gray.500">1h</Text>
        </Flex>
        {storyByUser && (
          <>
            <Spacer />
            <IconButton
              aria-label="story"
              icon={<FiPlus size="25px" />}
              color="#1877F2"
              isRound
              height="60px"
              width="60px"
              onClick={onOpen}
            />
          </>
        )}
      </Flex>
    </>
  );
};

export default StoryListCard;
