import { Grid, GridItem, Show, useBreakpointValue } from "@chakra-ui/react";
import Contacts from "../../components/user/HomePage/Contacts";
import Sidebar from "../../components/user/HomePage/Sidebar";
import CreatePost from "../../components/user/Post/CreatePost";
import Posts from "../../components/user/Post/Posts";

const HomePage = () => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "0.6fr 0.4fr",
    xl: "0.2fr 0.6fr 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"main"`,
    lg: `"main right"`,
    xl: `"left main right"`,
  });
  return (
    <>
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        mt={{ base: "60px", md: "40px", lg: "65px", xl: "5px" }}
      >
        <GridItem area="main">
          <CreatePost />
          <Posts />
        </GridItem>
        <Show above="xl">
          <GridItem area="left">
            <Sidebar />
          </GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="right">
            <Contacts />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
