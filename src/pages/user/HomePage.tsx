import { Grid, GridItem, Show, useBreakpointValue } from "@chakra-ui/react";
import Post from "../../components/user/Home/Post";

const HomePage = () => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "0.6fr 0.4fr",
    xl: "0.2fr 0.5fr 0.2fr",
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
          <Post />
        </GridItem>
        <Show above="xl">
          <GridItem area="left" bg="red"></GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="right" bg="blue"></GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
