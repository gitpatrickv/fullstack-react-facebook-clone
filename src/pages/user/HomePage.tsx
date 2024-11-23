import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Show,
  Skeleton,
  Spinner,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import Contacts from "../../components/user/HomePage/Contacts";
import Sidebar from "../../components/user/HomePage/Sidebar";
import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";
import NoAvailablePost from "../../components/user/ProfilePage/NoAvailablePost";
import CreateStoryCard from "../../components/user/HomePage/CreateStoryCard";
import StoryCard from "../../components/user/HomePage/StoryCard";
import useFetchAllPosts from "../../hooks/user/useFetchAllPosts";
import useFetchAllStories from "../../hooks/user/useFetchAllStories";
import { useUserStore } from "../../store/user-store";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchAllPosts({
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const array = [1, 2, 3];
  const storiesArray = [1, 2, 3, 4, 5, 6];
  const { firstName, userId } = useUserStore();
  const [name, setName] = useState<string>("");
  const { data: fetchAllStories, isLoading: isStoriesLoading } =
    useFetchAllStories(userId ?? 0);
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (firstName) {
      setName(firstName);
    }
  }, [firstName]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const storiesLength = fetchAllStories?.length ?? 0;

  const storiesBreakpoint = useBreakpointValue({
    base: 2,
    md: 5,
    lg: 4,
    xl: 5,
  });

  const showButtons = storiesLength >= (storiesBreakpoint ?? 0);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const nextButton = (direction: "left" | "right") => (
    <IconButton
      isRound={true}
      aria-label={direction === "left" ? "Left" : "Right"}
      bg={colorMode === "dark" ? "#303030" : "white"}
      _hover={{ bg: colorMode === "dark" ? "#383838" : "gray.100" }}
      _active={{ bg: colorMode === "dark" ? "#404040" : "gray.200" }}
      icon={
        direction === "left" ? (
          <FaChevronLeft size="20px" />
        ) : (
          <FaChevronRight size="20px" />
        )
      }
      onClick={() => handleScroll(direction)}
    />
  );

  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "0.6fr 0.4fr",
          xl: "0.2fr 0.2fr 0.5fr 0.2fr 0.2fr",
        }}
        templateAreas={{
          base: `"section"`,
          lg: `"section asideRight"`,
          xl: `"asideLeft left section right asideRight"`,
        }}
        mt={{ base: "55px", md: "35px", lg: "55px", xl: "5px" }}
        padding={{ base: 2, md: 7, lg: 2 }}
        as="main"
      >
        <GridItem
          area="section"
          as="section"
          overflow="hidden"
          position="relative"
        >
          {isLoading ? (
            <Skeleton height="100px" />
          ) : (
            <CreatePost firstName={name || null} />
          )}
          {showButtons && (
            <>
              <Box position="absolute" top="210px" left="5px" zIndex={5}>
                {nextButton("left")}
              </Box>
              <Box position="absolute" top="210px" right="5px" zIndex={5}>
                {nextButton("right")}
              </Box>
            </>
          )}
          <Flex
            ref={scrollRef}
            overflowX="auto"
            sx={{
              "&::-webkit-scrollbar": {
                display: "none",
              },
              scrollbarWidth: "none",
            }}
          >
            {isStoriesLoading ? (
              <>
                {storiesArray.map((skeleton) => (
                  <Skeleton
                    height="200px"
                    minWidth="120px"
                    maxWidth="120px"
                    mt="10px"
                    mr="10px"
                    borderRadius="5px"
                    key={skeleton}
                  />
                ))}
              </>
            ) : (
              <>
                <CreateStoryCard />
                {fetchAllStories
                  ?.filter((id) => id.userId === userId)
                  .map((story) => (
                    <StoryCard key={story.userId} story={story} />
                  ))}
                {fetchAllStories
                  ?.filter((id) => id.userId !== userId)
                  .map((story) => (
                    <StoryCard key={story.userId} story={story} />
                  ))}
              </>
            )}
          </Flex>

          <InfiniteScroll
            dataLength={fetchedPostData}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<Spinner />}
          >
            {isLoading ? (
              <>
                {array.map((skeleton) => (
                  <Skeleton height="300px" mt="10px" key={skeleton} />
                ))}
              </>
            ) : postLength < 1 ? (
              <NoAvailablePost />
            ) : (
              <>
                {data?.pages.map((page) =>
                  page.postList.map((posts) => (
                    <Posts key={posts.postId} posts={posts} />
                  ))
                )}
              </>
            )}
          </InfiniteScroll>
        </GridItem>
        <Show above="xl">
          <GridItem area="asideLeft" as="aside" position="fixed">
            <Sidebar />
          </GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="asideRight" as="aside" position="fixed" right="5">
            <Contacts />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
