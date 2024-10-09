import { Grid, GridItem, Show, useBreakpointValue } from "@chakra-ui/react";
import Contacts from "../../components/user/HomePage/Contacts";
import Sidebar from "../../components/user/HomePage/Sidebar";
import CreatePost from "../../components/user/Post/CreatePost";

const HomePage = () => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "0.6fr 0.4fr",
    xl: "0.2fr 0.2fr 0.5fr 0.2fr 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"section"`,
    lg: `"section asideRight"`,
    xl: `"asideLeft left section right asideRight"`,
  });
  return (
    <>
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        mt={{ base: "55px", md: "35px", lg: "55px", xl: "5px" }}
        padding={{ base: 2, md: 7, lg: 2 }}
      >
        <GridItem area="section" as="section">
          <CreatePost />
          {/* <Posts /> */}
        </GridItem>
        <Show above="xl">
          <GridItem area="asideLeft" as="aside">
            <Sidebar />
          </GridItem>
        </Show>
        <Show above="lg">
          <GridItem area="asideRight" as="aside">
            <Contacts />
          </GridItem>
        </Show>
      </Grid>
    </>
  );
};

export default HomePage;
