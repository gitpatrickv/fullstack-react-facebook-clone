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
import { Link, useNavigate } from "react-router-dom";
import { useFriendStore } from "../../../store/friend-store";

const FriendsPageSideBar = () => {
  const { colorMode } = useColorMode();

  const isSmallScreen = useBreakpointValue(
    { base: true, lg: false },
    { fallback: "lg" }
  );

  const isMediumScreen = useBreakpointValue(
    { base: false, md: true, lg: false },
    { fallback: "lg" }
  );

  const { setIsAllFriends, setIsSuggestions, setIsFriendsRequest } =
    useFriendStore();
  const navigate = useNavigate();
  const handleNavigateFriendRequestClick = () => {
    navigate("/friends/requests");
    setIsFriendsRequest(true);
    setIsSuggestions(false);
    setIsAllFriends(false);
  };

  const handleNavigateSuggestionsClick = () => {
    navigate("/friends/suggestions");
    setIsSuggestions(true);
    setIsFriendsRequest(false);
    setIsAllFriends(false);
  };

  const handleNavigateAllFriendsClick = () => {
    navigate("/friends/list");
    setIsAllFriends(true);
    setIsSuggestions(false);
    setIsFriendsRequest(false);
  };

  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "#303030" : "gray.100",
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

            <Button mr="5px" onClick={handleNavigateFriendRequestClick}>
              <FaUserPlus size="30px" />
              {isMediumScreen && <Text ml="10px">Friend Request</Text>}
            </Button>

            <Button mr="5px" onClick={handleNavigateSuggestionsClick}>
              <RiUserSearchFill size="30px" />
              {isMediumScreen && <Text ml="10px">Suggestions</Text>}
            </Button>

            <Button onClick={handleNavigateAllFriendsClick}>
              <FaUsers size="30px" />
              {isMediumScreen && <Text ml="10px"> All friends</Text>}
            </Button>
          </>
        ) : (
          <>
            <Link to="/friends">
              <Box {...boxStyles} cursor="pointer" color="#1877F2">
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

            <Box
              {...boxStyles}
              cursor="pointer"
              onClick={handleNavigateFriendRequestClick}
            >
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

            <Box
              {...boxStyles}
              cursor="pointer"
              onClick={handleNavigateSuggestionsClick}
            >
              <RiUserSearchFill size="30px" />
              <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                Suggestions
              </Text>
              <Spacer />
              <FaChevronRight size="20px" />
            </Box>

            <Box
              {...boxStyles}
              cursor="pointer"
              onClick={handleNavigateAllFriendsClick}
            >
              <FaUsers size="30px" />
              <Text ml="10px" fontSize="xl" fontWeight="semibold" mr="10px">
                All friends
              </Text>
              <Spacer />
              <FaChevronRight size="20px" />
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default FriendsPageSideBar;
