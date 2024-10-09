import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import FriendRequestCard from "../../components/user/FriendsPage/FriendRequestCard";
import FriendsPageSideBar from "../../components/user/FriendsPage/FriendsPageSideBar";
import useGetCurrentUserInfo from "../../hooks/user/useGetCurrentUserInfo";

const FriendsPage = () => {
  const { data: _getUserInfo } = useGetCurrentUserInfo();
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "0.2fr 1fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `
           "section1"
           "section2"
           `,
    lg: `
          " section1 section2 "
           `,
  });
  const array = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <>
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
      >
        <GridItem area="section1" bg="blue">
          <FriendsPageSideBar />
        </GridItem>
        <GridItem
          area="section2"
          padding={{ base: 2, md: 5, lg: 7 }}
          mt={{ lg: "40px", xl: "0" }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={{ base: "10px", md: "20px" }}
          >
            <Text fontSize="2xl" fontWeight="bold">
              Friend Requests
            </Text>
            <Text fontSize="lg" color="blue.500" cursor="pointer">
              See all
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 7 }} spacing={2}>
            {array.map((card) => (
              <FriendRequestCard key={card} />
            ))}
          </SimpleGrid>
        </GridItem>
      </Grid>
    </>
  );
};

export default FriendsPage;
