import {
  Box,
  Card,
  Grid,
  GridItem,
  Show,
  SimpleGrid,
  Skeleton,
  Spacer,
  Spinner,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";
import ImageCard from "../../components/user/ProfilePage/ImageCard";
import ProfilePageHeader from "../../components/user/ProfilePage/ProfilePageHeader";
import useFetchAllPhotos from "../../hooks/user/useFetchAllPhotos";
import useFetchAllUserPosts from "../../hooks/user/useFetchAllUserPosts";
import useGetUserProfileInfo from "../../hooks/user/useGetUserProfileInfo";
import ErrorPage from "./ErrorPage";

const ProfilePage = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { isLoading } = useGetUserProfileInfo(userId);
  if (
    typeof userId !== "number" ||
    isNaN(userId) ||
    typeof userId === "string"
  ) {
    return <ErrorPage />;
  }
  const { data, fetchNextPage, hasNextPage } = useFetchAllUserPosts({
    userId: userId,
    pageSize: 5,
  });

  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const location = useLocation();

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "0.2fr 1fr 0.2fr",
    lg: "0.4fr 0.6fr",
    xl: "0.3fr 0.4fr 0.6fr 0.3fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `
           "section1"
           "section2"
           `,
    md: `
           " asideLeft section1 asideRight"
           " asideLeft section2 asideRight"
           `,
    lg: `
          " section1 section2 "
           `,
    xl: `
         "asideLeft section1 section2 asideRight"
         `,
  });

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const sliceLength = isSmallScreen ? 4 : 9;

  const { data: fetchAllPhotos } = useFetchAllPhotos({
    userId: userId,
    pageSize: 9,
  });

  return (
    <>
      <ProfilePageHeader />
      {location.pathname === `/profile/${userId}` ? (
        <>
          <Grid
            templateColumns={gridTemplateColumns}
            templateAreas={gridTemplateAreas}
            padding={3}
          >
            <Show above="xl">
              <GridItem area="asideLeft" />
            </Show>
            <Show above="xl">
              <GridItem area="asideRight" />
            </Show>
            <GridItem
              area="section1"
              mr={{ base: "0px", lg: "10px", xl: "5px" }}
              mb={{ base: "10px", lg: "0px" }}
            >
              <Card
                padding={{ base: 2, xl: 4 }}
                mr={{ base: "0px", xl: "5px" }}
              >
                <Box display="flex" alignItems="center" mb="10px">
                  <Text fontSize="xl" fontWeight="semibold">
                    Photos
                  </Text>
                  <Spacer />
                  <Link to={`/profile/${userId}/photos`}>
                    <Text fontSize="lg" color="blue.500" cursor="pointer">
                      See all photos
                    </Text>
                  </Link>
                </Box>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={1}>
                  {fetchAllPhotos &&
                    fetchAllPhotos.pages.map((page, pageIndex) =>
                      pageIndex === 0
                        ? page.postImageModels
                            .slice(0, sliceLength)
                            .map((image) => (
                              <Box key={image.postImageId} mb="5px">
                                <ImageCard
                                  images={image}
                                  imageList={page.postImageModels}
                                />
                              </Box>
                            ))
                        : null
                    )}
                </SimpleGrid>
              </Card>
            </GridItem>
            <GridItem area="section2">
              <InfiniteScroll
                dataLength={fetchedPostData}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Spinner />}
              >
                {isLoading ? (
                  <Skeleton width="100%" height="100px" />
                ) : (
                  <CreatePost />
                )}
                {data?.pages.map((page) =>
                  page.postList.map((posts) => (
                    <Posts key={posts.postId} posts={posts} />
                  ))
                )}
              </InfiniteScroll>
            </GridItem>
          </Grid>
        </>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "0.1fr 1fr 0.1fr",
            xl: "0.3fr 1fr 0.3fr",
          }}
          templateAreas={{ base: "'main'", lg: "'asideLeft main asideRight'" }}
          padding={3}
        >
          <GridItem area="main">
            <Outlet />
          </GridItem>
          <Show above="lg">
            <GridItem area="asideLeft" />
          </Show>
          <Show above="lg">
            <GridItem area="asideRight" />
          </Show>
        </Grid>
      )}
    </>
  );
};

export default ProfilePage;
