import { Avatar, Box, Card, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { GoTrash } from "react-icons/go";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import pic from "../../../assets/profpic.jpeg";

const ChatCard = () => {
  const { colorMode } = useColorMode();
  const [isClick, setIsClick] = useState<boolean>(false);
  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsClick(!isClick);
  };
  return (
    <Box position="relative" mb="5px" mt="5px">
      <Flex alignItems="center">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Avatar src={pic} cursor="pointer" height="55px" width="55px" />
        </Box>

        <Box ml="15px" maxWidth="200px">
          <Text fontSize="sm">Name here</Text>
          <Box display="flex">
            <Text fontSize="sm" isTruncated={true}>
              last message here asdf asdf asdf asd f
            </Text>
            <Text ml="7px">·</Text>
            <Text fontSize="sm" fontWeight="semibold" ml="2px">
              1hr
            </Text>
          </Box>
        </Box>

        <Box
          onClick={handleButtonClick}
          // onMouseLeave={() => setIsHover(false)}
          // position="relative"
          mr="10px"
          ml="15px"
          height="30px"
          width="30px"
          borderRadius="full"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bg="transparent"
          _hover={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _active={{ bg: colorMode === "dark" ? "gray.600" : "gray.300" }}
          _focus={{ boxShadow: "outline" }}
        >
          <HiOutlineDotsHorizontal size="25px" />
          {isClick && (
            <Card
              position="absolute"
              right="55px"
              top="-9px"
              padding={2}
              zIndex={100}
              onClick={handleButtonClick}
            >
              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <FaCheck size="20px" />
                </Box>
                <Text fontWeight="semibold">Mark as read</Text>
              </Flex>

              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <GoTrash size="20px" />
                </Box>
                <Text fontWeight="semibold">Delete chat</Text>
              </Flex>

              <Flex
                _hover={{
                  bg: colorMode === "dark" ? "gray.600" : "gray.200",
                }}
                minWidth="200px"
                padding={1}
                alignItems="center"
              >
                <Box mr="10px">
                  <GoTrash size="20px" />
                </Box>
                <Text fontWeight="semibold">View Profile</Text>
              </Flex>
            </Card>
          )}
        </Box>

        <Box h="10px" w="10px" bg="#1877F2" borderRadius="full" />
      </Flex>
    </Box>
  );
};

export default ChatCard;
