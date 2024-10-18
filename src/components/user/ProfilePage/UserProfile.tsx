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
import useFetchAllPhotos from "../../../hooks/user/useFetchAllPhotos";
import useFetchAllUserPosts from "../../../hooks/user/useFetchAllUserPosts";
import useGetUserProfileInfo from "../../../hooks/user/useGetUserProfileInfo";
import ErrorPage from "../../../pages/user/ErrorPage";
import { useProfileStore } from "../../../store/profile-store";
import CreatePost from "../Post/CreatePost";
import Posts from "../Post/Posts";
import ImageCard from "./ImageCard";
import NoAvailablePhotos from "./NoAvailablePhotos";
import NoAvailablePost from "./NoAvailablePost";
import ProfilePageHeader from "./ProfilePageHeader";

const UserProfile = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { isLoading: isUserInfoLoading } = useGetUserProfileInfo(userId);
  if (
    typeof userId !== "number" ||
    isNaN(userId) ||
    typeof userId === "string"
  ) {
    return <ErrorPage />;
  }
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isPostLoading,
  } = useFetchAllUserPosts({
    userId: userId,
    pageSize: 5,
  });
  const postLength = data?.pages.flatMap((list) => list.postList).length || 0;
  const fetchedPostData =
    data?.pages.reduce((total, page) => total + page.postList.length, 0) || 0;
  const location = useLocation();

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const sliceLength = isSmallScreen ? 4 : 9;

  const { data: fetchAllPhotos, isLoading: isPhotosLoading } =
    useFetchAllPhotos({
      userId: userId,
      pageSize: 9,
    });
  const { isProfile } = useProfileStore();
  const photosLength =
    fetchAllPhotos?.pages.flatMap((list) => list.postImageModels).length || 0;

  return (
    <>
      <ProfilePageHeader />
      {location.pathname === `/profile/${userId}` ? (
        <>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "0.2fr 1fr 0.2fr",
              lg: "0.4fr 0.6fr",
              xl: isProfile
                ? "0.3fr 0.4fr 0.6fr 0.3fr"
                : "0.2fr 0.4fr 0.6fr 0.2fr",
            }}
            templateAreas={{
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
            }}
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
              {isPhotosLoading ? (
                <Skeleton height="300px" />
              ) : (
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
                  {photosLength < 1 ? (
                    <NoAvailablePhotos />
                  ) : (
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={1}>
                      {fetchAllPhotos &&
                        fetchAllPhotos.pages.map((page, pageIndex) =>
                          pageIndex === 0
                            ? page.postImageModels
                                .slice(0, sliceLength)
                                .map((image) => (
                                  <Box key={image.postImageId}>
                                    <ImageCard
                                      images={image}
                                      imageList={page.postImageModels}
                                    />
                                  </Box>
                                ))
                            : null
                        )}
                    </SimpleGrid>
                  )}
                </Card>
              )}
            </GridItem>
            <GridItem area="section2">
              {isUserInfoLoading ? <Skeleton height="100px" /> : <CreatePost />}

              <InfiniteScroll
                dataLength={fetchedPostData}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Spinner />}
              >
                {isPostLoading ? (
                  <Skeleton height="300px" mt="10px" />
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
          </Grid>
        </>
      ) : (
        <Grid
          templateColumns={{
            base: "1fr",
            lg: "0.1fr 1fr 0.1fr",
            xl: isProfile ? "0.3fr 1fr 0.3fr" : "0.2fr 1fr 0.2fr",
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

export default UserProfile;
