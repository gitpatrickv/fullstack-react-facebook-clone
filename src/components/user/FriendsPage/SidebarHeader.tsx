import { Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFriendStore } from "../../../store/friend-store";

const SidebarHeader = () => {
  const {
    setIsAllFriends,
    setIsSuggestions,
    setIsFriendsRequest,
    isAllFriends,
    isFriendRequest,
    isSuggestions,
  } = useFriendStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/friends");
    setIsAllFriends(false);
    setIsSuggestions(false);
    setIsFriendsRequest(false);
  };
  return (
    <>
      <Flex alignItems="center">
        <IconButton
          icon={<IoMdArrowRoundBack size="25px" />}
          aria-label="Back"
          variant="ghost"
          size="md"
          isRound
          mr="10px"
          mb="15px"
          onClick={handleNavigateClick}
        />

        <Box>
          <Text
            _hover={{ textDecoration: "underline" }}
            fontSize="sm"
            cursor="pointer"
            onClick={handleNavigateClick}
          >
            Friends
          </Text>

          <Text fontSize="2xl" fontWeight="bold" mb="10px">
            {isAllFriends
              ? "All Friends"
              : isFriendRequest
              ? "Friend Requests"
              : isSuggestions
              ? "Suggestions"
              : null}
          </Text>
        </Box>
      </Flex>
      {/* {isAllFriends && (
        <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
          <Input
            ref={ref}
            borderRadius={20}
            placeholder="Search friends"
            variant="filled"
            textAlign={{ base: "center", md: "left" }}
            fontSize={["sm", "md", "lg"]}
            width="100%"
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
      )} */}

      <Divider mb="15px" />
    </>
  );
};

export default SidebarHeader;
