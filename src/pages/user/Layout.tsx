import {
  Box,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Navbar/Navbar";
import { useAuthQueryStore } from "../../store/auth-store";

const Layout = () => {
  const location = useLocation();
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    xl: "0.2fr 1fr 0.2fr",
  });
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  const gridTemplateAreas = useBreakpointValue({
    base: `"content1"`,
    xl: `"sidebar content1 sidebar1"`,
  });
  return (
    <>
      {jwtToken && <Navbar />}
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        padding={{ base: 5, md: 10, lg: 15, xl: 20 }}
      >
        <GridItem area="content1" as="section">
          <Box>
            <Outlet />
            <ScrollRestoration />
          </Box>
        </GridItem>
        <Show above="xl">
          <GridItem area="sidebar" />
        </Show>
        <Show above="xl">
          <GridItem area="sidebar1" />
        </Show>
      </Grid>
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
