import { Grid, GridItem, Show, useBreakpointValue } from "@chakra-ui/react";
import Chat from "../../components/user/HomePage/Chat";
import CreatePost from "../../components/user/HomePage/CreatePost";
import Sidebar from "../../components/user/HomePage/Sidebar";

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
        </GridItem>
        <Show above="xl">
          <GridItem area="left">
            <Sidebar />
          </GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="right">
            <Chat />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
