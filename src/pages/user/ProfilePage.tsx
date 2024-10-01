import {
  Box,
  Card,
  Grid,
  GridItem,
  Show,
  Skeleton,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";
import useFetchAllUserPosts from "../../hooks/user/useFetchAllUserPosts";
import { useParams } from "react-router-dom";
import useGetCurrentUserInfo from "../../hooks/user/useGetCurrentUserInfo";
import ErrorPage from "./ErrorPage";
import useGetUserProfileInfo from "../../hooks/user/useGetUserProfileInfo";
import Photos from "../../components/user/ProfilePage/Photos";
import ProfilePageHeader from "../../components/user/ProfilePage/ProfilePageHeader";

const ProfilePage = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
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

  const [page, _setPage] = useState<number>(1);
  const pageSize = 25;
  const { data: _getUserInfo } = useGetCurrentUserInfo();
  const { data: fetchAllUserPosts } = useFetchAllUserPosts({
    userId: userId,
    pageNo: page,
    pageSize,
  });

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "0.1fr 1fr 0.1fr",
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

  return (
    <>
      <ProfilePageHeader />
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        // mt={{ base: "60px", md: "40px", lg: "65px", xl: "5px" }}
        padding={{ base: 2, md: 7, lg: 2 }}
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
          <Card padding={{ base: 2, xl: 4 }} mr={{ base: "0px", xl: "5px" }}>
            <Box display="flex" alignItems="center" mb="10px">
              <Text fontSize="xl" fontWeight="semibold">
                Photos
              </Text>
              <Spacer />
              <Text fontSize="lg" color="blue.500" cursor="pointer">
                See all photos
              </Text>
            </Box>
            <Box display="flex" flexWrap="wrap">
              {array.map((index) => (
                <Box
                  key={index}
                  mr={index % 3 === 0 ? "0px" : "5px"}
                  flexBasis="calc(33.33% - 5px)"
                  flexGrow={1}
                  mb="5px"
                >
                  <Photos />
                </Box>
              ))}
            </Box>
          </Card>
        </GridItem>
        <GridItem area="section2">
          {isLoading ? (
            <Skeleton width="100%" height="100px" />
          ) : (
            <CreatePost />
          )}
          {fetchAllUserPosts?.postList.map((posts) => (
            <Posts key={posts.postId} posts={posts} />
          ))}
        </GridItem>
      </Grid>
    </>
  );
};

export default ProfilePage;
