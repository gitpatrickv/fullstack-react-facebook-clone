import { Box, Card, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import ImageCard from "../../components/user/ProfilePage/ImageCard";
import useFetchAllPhotos from "../../hooks/user/useFetchAllPhotos";

const ProfilePhotosPage = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);

  const {
    data: fetchAllPhotos,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllPhotos({
    userId: userId,
    pageSize: 10,
  });

  const fetchPhotosData =
    fetchAllPhotos?.pages.reduce(
      (total, page) => total + page.postImageModels.length,
      0
    ) || 0;

  return (
    <Card padding={{ base: 2, md: 5 }}>
      <Box display="flex" alignItems="center" mb="10px">
        <Text fontSize="xl" fontWeight="semibold">
          Photos
        </Text>
      </Box>
      <InfiniteScroll
        dataLength={fetchPhotosData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 6 }} spacing={1}>
          {fetchAllPhotos &&
            fetchAllPhotos.pages.map((page) =>
              page.postImageModels.map((image) => (
                <ImageCard
                  key={image.postImageId}
                  images={image}
                  imageList={page.postImageModels}
                />
              ))
            )}
        </SimpleGrid>
      </InfiniteScroll>
    </Card>
  );
};

export default ProfilePhotosPage;
