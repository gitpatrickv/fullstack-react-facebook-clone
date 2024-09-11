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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { BiLogoMessenger } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaFacebook, FaHome, FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoNotificationsCircle, IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuthQueryStore } from "../../../store/auth-store";
import ColorModeSwitch from "../../ColorModeSwitch";
const Header = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const { logout } = useAuthQueryStore();
  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
  };
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
        <GridItem
          area="content1"
          display="flex"
          justifyContent="space-around"
          flexDirection="row"
          alignItems="center"
        >
          <Link to="/home">
            <FaHome size="35px" />
          </Link>
          <Link to="/friends">
            <FaUserFriends size="35px" />
          </Link>
          <Link to="/watch">
            <MdOndemandVideo size="35px" />
          </Link>
          <Link to="/marketplace">
            <IoStorefrontSharp size="35px" />
          </Link>
          <Link to="/games">
            <IoLogoGameControllerA size="35px" />
          </Link>
        </GridItem>
        <GridItem
          area="asideLeft"
          display="flex"
          justifyContent="start"
          ml="10px"
          alignItems="center"
        >
          <Link to="/home">
            <Box color="blue.500" mb="5px" cursor="pointer" mr="10px">
              <FaFacebook size="35px" />
            </Box>
          </Link>
          <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
            <Input
              ref={ref}
              borderRadius={20}
              placeholder="Search Facebook"
              variant="filled"
              textAlign={{ base: "center", md: "left" }}
              fontSize={["sm", "md", "lg"]}
              w={{ base: "50%" }}
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
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Header;
