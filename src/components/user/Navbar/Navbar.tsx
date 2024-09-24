import {
  Avatar,
  Box,
  Card,
  Grid,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { BiLogoMessenger } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaFacebook, FaHome, FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import {
  IoClose,
  IoLogOutSharp,
  IoNotificationsCircle,
  IoStorefrontSharp,
} from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiNewsFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";
import ColorModeSwitch from "../../ColorModeSwitch";
const Navbar = () => {
  const { firstName, lastName, profilePicture } = useUserStore();
  const location = useLocation();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { logout } = useAuthQueryStore();
  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
  const [showInput, setShowInput] = useState(false);
  const [selectedPage, setSelectedPage] = useState<string | null>(
    location.pathname
  );

  useEffect(() => {
    setSelectedPage(location.pathname);
  }, [location.pathname]);

  return (
    <Card
      borderRadius="none"
      position="fixed"
      top="0"
      width="100%"
      zIndex={10}
      as="header"
      padding={2}
    >
      <Grid
        templateColumns="0.5fr 0.5fr 0.5fr"
        templateAreas={`"asideLeft content1 asideRight"`}
        alignItems="center"
        gridGap="25px"
        mt="5px"
      >
        <Show above="md">
          <GridItem
            area="content1"
            display="flex"
            justifyContent="space-around"
            flexDirection="row"
            alignItems="center"
          >
            <Link to="/home">
              <Box color={selectedPage === "/home" ? "blue.500" : "white.500"}>
                <FaHome size="35px" />
              </Box>
            </Link>
            <Link to="/friends">
              <Box
                color={selectedPage === "/friends" ? "blue.500" : "white.500"}
              >
                <FaUserFriends size="35px" />
              </Box>
            </Link>
            <Link to="/watch">
              <Box color={selectedPage === "/watch" ? "blue.500" : "white.500"}>
                <MdOndemandVideo size="35px" />
              </Box>
            </Link>
            <Link to="/marketplace">
              <Box
                color={
                  selectedPage === "/marketplace" ? "blue.500" : "white.500"
                }
              >
                <IoStorefrontSharp size="35px" />
              </Box>
            </Link>
            <Link to="/games">
              <Box color={selectedPage === "/games" ? "blue.500" : "white.500"}>
                <IoLogoGameControllerA size="35px" />
              </Box>
            </Link>
          </GridItem>
        </Show>
        <GridItem
          area="asideLeft"
          display="flex"
          justifyContent="start"
          ml="10px"
          alignItems="center"
        >
          <Link to="/home">
            <Box
              color="blue.500"
              mb="5px"
              cursor="pointer"
              mr={{ base: "5px", md: "10px" }}
            >
              <FaFacebook size="35px" />
            </Box>
          </Link>
          {isSmallScreen ? (
            <IconButton
              aria-label="Search"
              icon={<BsSearch />}
              type="submit"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              border="1px solid"
              borderRadius="20px"
              size="sm"
              onClick={() => setShowInput(!showInput)}
            />
          ) : (
            <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
              <Input
                ref={ref}
                borderRadius={20}
                placeholder="Search Facebook"
                variant="filled"
                textAlign={{ base: "center", md: "left" }}
                fontSize={["sm", "md", "lg"]}
                w={{ base: "50%", md: "100%", lg: "100%", xl: "50%" }}
              />
              <InputLeftElement>
                <IconButton
                  aria-label="Search"
                  icon={<BsSearch />}
                  type="submit"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                />
              </InputLeftElement>
            </InputGroup>
          )}
          {isSmallScreen && showInput && (
            <Card
              position="absolute"
              // top="60px"
              top="0"
              left="0"
              right="0"
              p="4"
              zIndex="dropdown"
              borderRadius="none"
            >
              <Box display="flex">
                <Box
                  position="absolute"
                  right="0"
                  top="5px"
                  onClick={() => setShowInput(!showInput)}
                >
                  <IoClose size="20px" />
                </Box>
                <InputGroup>
                  <Input
                    ref={ref}
                    borderRadius={20}
                    placeholder="Search Facebook"
                    variant="filled"
                    fontSize={["sm", "md"]}
                    w="100%"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Search"
                      icon={<BsSearch />}
                      type="submit"
                      bg="transparent"
                      _hover={{ bg: "transparent" }}
                    />
                  </InputRightElement>
                </InputGroup>
              </Box>
            </Card>
          )}
        </GridItem>
        <GridItem
          area="asideRight"
          display="flex"
          justifyContent="end"
          mr="10px"
          alignItems="center"
        >
          <ColorModeSwitch />
          <Box mr="5px">
            <BiLogoMessenger size="43px" />
          </Box>
          <Box mr="5px">
            <IoNotificationsCircle size="38px" />
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={
                <Avatar
                  src={
                    "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                  }
                  size="sm"
                />
              }
              variant="none"
            />

            <MenuList>
              <Link to="/profile">
                <MenuItem paddingBottom={3} paddingTop={3}>
                  <Avatar
                    src={
                      profilePicture ||
                      "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                    }
                    size="xs"
                    ml="3px"
                  />
                  <Text ml="12px" textTransform="capitalize">
                    {firstName} {lastName}
                  </Text>
                </MenuItem>
              </Link>
              <Link to="/home">
                <MenuItem>
                  <RiNewsFill size="30px" />
                  <Box flexDirection="row">
                    <Text fontSize="sm" ml="10px">
                      News Feed
                    </Text>
                    <Text fontSize="xs" ml="10px">
                      See relevant posts from people and Pages you follow.
                    </Text>
                  </Box>
                </MenuItem>
              </Link>
              <Link to="/friends">
                <MenuItem>
                  <FaUserFriends size="30px" />
                  <Box flexDirection="row">
                    <Text fontSize="sm" ml="10px">
                      Friends
                    </Text>
                    <Text fontSize="xs" ml="10px">
                      Search for friends or people you may know.
                    </Text>
                  </Box>
                </MenuItem>
              </Link>
              <Link to="/watch">
                <MenuItem>
                  <MdOndemandVideo size="30px" />
                  <Box flexDirection="row">
                    <Text fontSize="sm" ml="10px">
                      Videos
                    </Text>
                    <Text fontSize="xs" ml="10px">
                      A video destination personalized to your interests and
                      connections.
                    </Text>
                  </Box>
                </MenuItem>
              </Link>
              <Link to="/marketplace">
                <MenuItem>
                  <IoStorefrontSharp size="30px" />
                  <Box flexDirection="row">
                    <Text fontSize="sm" ml="10px">
                      Marketplace
                    </Text>
                    <Text fontSize="xs" ml="10px">
                      Buy and sell in your community.
                    </Text>
                  </Box>
                </MenuItem>
              </Link>
              <Link to="/games">
                <MenuItem>
                  <IoLogoGameControllerA size="30px" />
                  <Box flexDirection="row">
                    <Text fontSize="sm" ml="10px">
                      Play Games
                    </Text>
                    <Text fontSize="xs" ml="10px">
                      Play your favorite games.
                    </Text>
                  </Box>
                </MenuItem>
              </Link>

              <MenuItem onClick={handleLogout}>
                <IoLogOutSharp size="30px" />
                <Text ml="10px">Logout</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Navbar;
