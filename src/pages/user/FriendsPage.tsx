import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";

import { Outlet, useLocation } from "react-router-dom";
import FriendsPageSideBar from "../../components/user/FriendsPage/FriendsPageSidebar";
import PeopleYouMayKnow from "../../components/user/FriendsPage/PeopleYouMayKnow";

const FriendsPage = () => {
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

  const location = useLocation();

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
          {location.pathname === "/friends" ? <PeopleYouMayKnow /> : <Outlet />}
        </GridItem>
      </Grid>
    </>
  );
};

export default FriendsPage;
