import {
  Box,
  Card,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaFacebook, FaHome, FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import NavbarRight from "./NavbarRight";
import Search from "./Search";
const Navbar = () => {
  const location = useLocation();

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const [selectedPage, setSelectedPage] = useState<string | null>(
    location.pathname
  );

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Card
        borderRadius="none"
        position="fixed"
        top="0"
        width="100%"
        zIndex={100}
        as="header"
        padding={2}
      >
        <Grid
          templateColumns="0.5fr 0.5fr 0.5fr"
          templateAreas={`"asideLeft content1 asideRight"`}
          alignItems="center"
          mt="5px"
        >
          <GridItem
            area="asideLeft"
            display="flex"
            justifyContent="start"
            ml="10px"
            alignItems="center"
            position={isSmallScreen ? undefined : "relative"}
          >
            <Link to="/home">
              <Box
                color="#1877F2"
                cursor="pointer"
                mr={{ base: "5px", md: "10px" }}
              >
                <FaFacebook size="35px" />
              </Box>
            </Link>
            <Search />
          </GridItem>

          {isSmallScreen && (
            <GridItem area="content1">
              <Box w="35px"></Box>
            </GridItem>
          )}
          <Show above="md">
            <GridItem
              area="content1"
              display="flex"
              justifyContent="space-around"
              flexDirection="row"
              alignItems="center"
            >
              <Link to="/home">
                <Box color={selectedPage === "/home" ? "#1877F2" : "white.500"}>
                  <FaHome size="35px" />
                </Box>
              </Link>
              <Link to="/friends">
                <Box
                  color={selectedPage === "/friends" ? "#1877F2" : "white.500"}
                >
                  <FaUserFriends size="35px" />
                </Box>
              </Link>
              <Link to="/watch">
                <Box
                  color={selectedPage === "/watch" ? "#1877F2" : "white.500"}
                >
                  <MdOndemandVideo size="35px" />
                </Box>
              </Link>
              <Link to="/marketplace">
                <Box
                  color={
                    selectedPage === "/marketplace" ? "#1877F2" : "white.500"
                  }
                >
                  <IoStorefrontSharp size="35px" />
                </Box>
              </Link>
              <Link to="/games">
                <Box
                  color={selectedPage === "/games" ? "#1877F2" : "white.500"}
                >
                  <IoLogoGameControllerA size="35px" />
                </Box>
              </Link>
            </GridItem>
          </Show>
          <GridItem area="asideRight">
            <NavbarRight />
          </GridItem>
        </Grid>
      </Card>
    </>
  );
};

export default Navbar;
