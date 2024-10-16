import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Navbar/Navbar";
import { useAuthQueryStore } from "../../store/auth-store";

const Layout = () => {
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return (
    <>
      {jwtToken && <Navbar />}
      <Grid
        templateColumns="1fr"
        templateAreas={`"main"`}
        // padding={{ base: 1, md: 10, lg: 15, xl: 2 }}
        mt={{ base: "10px", xl: "60px" }}
      >
        <GridItem area="main" as="main">
          <Box>
            <Outlet />
            {/* <ScrollRestoration /> */}
          </Box>
        </GridItem>
      </Grid>
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
