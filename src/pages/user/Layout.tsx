import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import ChatCard from "../../components/user/Chat/ChatCard";
import Footer from "../../components/user/Footer/Footer";
import Navbar from "../../components/user/Navbar/Navbar";
import { useAuthQueryStore } from "../../store/auth-store";
import { useChatStore } from "../../store/chat-store";

const Layout = () => {
  const location = useLocation();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { isChatMinimized } = useChatStore();
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
      {isChatMinimized && (
        <Box position="fixed" bottom="0" right="90px" zIndex={10}>
          <ChatCard />
        </Box>
      )}
      {location.pathname === "/" ? <Footer /> : ""}
    </>
  );
};

export default Layout;
