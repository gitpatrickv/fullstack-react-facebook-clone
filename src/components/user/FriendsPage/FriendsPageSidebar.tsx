import {
  Box,
  Button,
  Card,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaChevronRight, FaUserFriends, FaUserPlus } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { RiUserSearchFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const FriendsPageSideBar = () => {
  const { colorMode } = useColorMode();
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isMediumScreen = useBreakpointValue({
    base: false,
    md: true,
    lg: false,
  });
  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "gray.600" : "gray.200",
    },
  };
  return (
    <Card
      borderRadius="none"
      height="100%"
      minHeight={{ base: "0", lg: "100vh" }}
    >
      <Box padding={3} position="sticky" top="60px">
        <Text
          fontSize="2xl"
          fontWeight="bold"
          mb="10px"
          mt={{ base: "50px", lg: "0" }}
        >
          Friends
        </Text>
        {isSmallScreen ? (
          <>
            <Link to="/friends">
              <Button mr="5px">
                {isMediumScreen && <FaUserFriends size="30px" />}
                <Text ml={{ base: "0", md: "10px", lg: "0" }}>Home</Text>
              </Button>
            </Link>
            <Link to="/friends/requests">
              <Button mr="5px">
                <FaUserPlus size="30px" />
                {isMediumScreen && <Text ml="10px">Friend Request</Text>}
              </Button>
            </Link>
            <Link to="/friends/suggestions">
              <Button mr="5px">
                <RiUserSearchFill size="30px" />
                {isMediumScreen && <Text ml="10px">Suggestions</Text>}
              </Button>
            </Link>
            <Link to="/friends/list">
              <Button>
                <FaUsers size="30px" />
                {isMediumScreen && <Text ml="10px"> All friends</Text>}
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/friends">
              <Box {...boxStyles} cursor="pointer">
                <FaUserFriends size="30px" />
                <Text
                  ml="10px"
                  fontSize="xl"
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                >
                  Home
                </Text>
              </Box>
            </Link>
            <Link to="/friends/requests">
              <Box {...boxStyles} cursor="pointer">
                <FaUserPlus size="30px" />
                <Text
                  ml="10px"
                  fontSize="xl"
                  fontWeight="semibold"
                  whiteSpace="nowrap"
                  mr="10px"
                >
                  Friend Request
                </Text>
                <Spacer />
                <FaChevronRight size="20px" />
              </Box>
            </Link>
            <Link to="/friends/suggestions">
              <Box {...boxStyles} cursor="pointer">
                <RiUserSearchFill size="30px" />
                <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                  Suggestions
                </Text>
                <Spacer />
                <FaChevronRight size="20px" />
              </Box>
            </Link>
            <Link to="/friends/list">
              <Box {...boxStyles} cursor="pointer">
                <FaUsers size="30px" />
                <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                  All friends
                </Text>
                <Spacer />
                <FaChevronRight size="20px" />
              </Box>
            </Link>
          </>
        )}
      </Box>
    </Card>
  );
};

export default FriendsPageSideBar;
