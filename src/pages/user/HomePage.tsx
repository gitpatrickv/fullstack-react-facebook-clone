import { Grid, GridItem, Show, Skeleton, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import Contacts from "../../components/user/HomePage/Contacts";
import Sidebar from "../../components/user/HomePage/Sidebar";
import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";
import NoAvailablePost from "../../components/user/ProfilePage/NoAvailablePost";
import useFetchAllPosts from "../../hooks/user/useFetchAllPosts";

const HomePage = () => {
  const { data, fetchNextPage, hasNextPage, isLoading } = useFetchAllPosts({
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const array = [1, 2, 3];
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
        <GridItem area="section" as="section">
          {isLoading ? <Skeleton height="100px" /> : <CreatePost />}

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
