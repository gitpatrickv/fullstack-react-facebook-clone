import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Header from "../../components/user/Navbar/Header";
import Footer from "../../components/user/Footer/Footer";

const Layout = () => {
  const location = useLocation();
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    md: "0.2fr 1fr 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"content1"`,
    md: `"sidebar content1 sidebar1"`,
  });
  return (
    <>
      {location.pathname === "/" ? "" : <Header />}
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
        padding={{ base: 5, md: 10, lg: 15, xl: 20 }}
      >
        <GridItem area="content1" as="section">
          <Box padding={5}>
            <Outlet />
            <ScrollRestoration />
          </Box>
        </GridItem>
      </Grid>
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
