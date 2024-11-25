import {
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Skeleton,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import StoriesCard from "../../components/user/StoryPage/StoriesCard";
import StoryListCard from "../../components/user/StoryPage/StoryListCard";
import { StoryResponse } from "../../entities/Story";
import useFetchAllStories from "../../hooks/user/useFetchAllStories";
import { useStoryStore } from "../../store/story-store";
import { useUserStore } from "../../store/user-store";

const StoryPage = () => {
  const { colorMode } = useColorMode();
  const { onOpen } = useStoryStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/home");
  };
  const { userId } = useUserStore();
  const { data: fetchAllStories, isLoading } = useFetchAllStories(userId ?? 0);
  const array = [1, 2, 3, 4, 5];

  const storyByUser = fetchAllStories?.some((id) => id.userId === userId);
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  const { setActiveUser } = useStoryStore();

  const handleUserClick = (story: StoryResponse) => {
    setActiveUser(story);
    console.log("Active User Story", story);
  };

  return (
    <>
      <Modal isOpen={true} onClose={handleNavigateClick} size="full">
        <ModalOverlay />
        <ModalContent>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "0.3fr 0.7fr",
              xl: "0.2fr 0.8fr",
            }}
            templateAreas={{
              base: `"section1"
            "section2"
            `,
              lg: `"section1 section2"`,
              xl: `"section1 section2"`,
            }}
          >
            <GridItem
              area="section1"
              bg={colorMode === "dark" ? "gray.700" : "white"}
              height={{ base: "auto", lg: "100vh" }}
            >
              <Card
                position="fixed"
                width="100%"
                borderRadius="none"
                zIndex="10"
                boxShadow="none"
              >
                <ModalCloseButton
                  position="fixed"
                  top="10px"
                  left="5px"
                  size="lg"
                  borderRadius="full"
                  bg="gray.800"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                />
                <Box
                  position="fixed"
                  top="10px"
                  left="50px"
                  color="#1877F2"
                  onClick={handleNavigateClick}
                  cursor="pointer"
                >
                  <FaFacebook size="40px" />
                </Box>
                {isSmallScreen && <Box mt="60px" />}
              </Card>

              <Divider />
              <Show above="lg">
                <Flex
                  mt="60px"
                  flexDirection="column"
                  padding="10px"
                  overflowY="auto"
                  height="auto"
                  maxHeight="93%"
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "gray",
                      borderRadius: "8px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                      background: "#555",
                    },
                  }}
                >
                  <Text fontSize="x-large" fontWeight="bold" ml="10px">
                    Stories
                  </Text>
                  <Text mt="20px" fontWeight="semibold" mb="10px" ml="10px">
                    Your Story
                  </Text>
                  {isLoading ? (
                    <Skeleton height="70px" mt="10px" />
                  ) : (
                    <>
                      {fetchAllStories
                        ?.filter((id) => id.userId === userId)
                        .map((story) => (
                          <StoryListCard
                            key={story.userId}
                            story={story}
                            storyByUser={storyByUser}
                            handleUserClick={() => handleUserClick(story)}
                          />
                        ))}
                    </>
                  )}
                  {!storyByUser && (
                    <Flex alignItems="center" ml="5px" mt="5px" mb="5px">
                      <IconButton
                        aria-label="story"
                        icon={<FiPlus size="25px" />}
                        color="#1877F2"
                        isRound
                        height="60px"
                        width="60px"
                        onClick={onOpen}
                      />
                      <Flex flexDirection="column" ml="10px">
                        <Text fontWeight="semibold">Create a story</Text>
                        <Text fontSize="xs" color="gray.500">
                          Share a photo or write something.
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                  <Text mt="10px" fontWeight="semibold" mb="10px" ml="10px">
                    All stories
                  </Text>
                  {isLoading ? (
                    <>
                      {array.map((skeleton) => (
                        <Skeleton height="70px" mt="10px" key={skeleton} />
                      ))}
                    </>
                  ) : (
                    <>
                      {fetchAllStories
                        ?.filter((id) => id.userId !== userId)
                        .map((story) => (
                          <StoryListCard
                            key={story.userId}
                            story={story}
                            handleUserClick={() => handleUserClick(story)}
                          />
                        ))}
                    </>
                  )}
                </Flex>
              </Show>
            </GridItem>
            <GridItem
              area="section2"
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg="black"
              position="relative"
              userSelect="none"
              mt={{ base: "40px", lg: "0" }}
            >
              <StoriesCard />
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoryPage;
