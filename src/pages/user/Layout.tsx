import { Box } from "@chakra-ui/react";
import { Outlet, ScrollRestoration } from "react-router-dom";

const Layout = () => {
  return (
    <Box padding={5}>
      <Outlet />
      <ScrollRestoration />
    </Box>
  );
};

export default Layout;
