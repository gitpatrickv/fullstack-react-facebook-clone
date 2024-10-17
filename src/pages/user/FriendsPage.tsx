import { Grid, GridItem } from "@chakra-ui/react";

import { Outlet, useLocation } from "react-router-dom";
import AllFriends from "../../components/user/FriendsPage/AllFriends";
import FriendsPageSideBar from "../../components/user/FriendsPage/FriendsPageSidebar";
import PeopleYouMayKnow from "../../components/user/FriendsPage/PeopleYouMayKnow";

const FriendsPage = () => {
  const location = useLocation();

  return (
    <>
      <Grid
        templateColumns={{ base: "1fr", lg: "0.25fr 1fr" }}
        templateAreas={{
          base: `
          "section1"
          "section2"
          `,
          lg: `
         " section1 section2 "
          `,
        }}
      >
        <GridItem area="section1" bg="blue">
          {location.pathname === "/friends" ? (
            <FriendsPageSideBar />
          ) : location.pathname === "/friends/list" ? (
            <AllFriends />
          ) : (
            <FriendsPageSideBar />
          )}
        </GridItem>
        <GridItem area="section2" mt={{ lg: "40px", xl: "0" }}>
          {location.pathname === "/friends" ? <PeopleYouMayKnow /> : <Outlet />}
        </GridItem>
      </Grid>
    </>
  );
};

export default FriendsPage;
