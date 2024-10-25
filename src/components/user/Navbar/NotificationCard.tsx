import { Avatar, Box, Card, Flex, Text, useColorMode } from "@chakra-ui/react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import pic from "../../../assets/profpic.jpeg";

import { useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";

const NotificationCard = () => {
  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsHover(!isHover);
  };
  const { colorMode } = useColorMode();
  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Flex alignItems="center">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
      >
        <Avatar src={pic} cursor="pointer" height="55px" width="55px" />
        <Box
          border="1px solid"
          borderRadius="full"
          width="30px"
          height="30px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderColor="#1877F2"
          bg="#1877F2"
          mr="5px"
          cursor="pointer"
          position="absolute"
          bottom="-5px"
          right="-10px"
        >
          <BiSolidLike size="20px" />
        </Box>
      </Box>
      <Box ml="15px">
        <Text fontSize="sm">
          <Text as="span" fontWeight="semibold" textTransform="capitalize">
            Patrick pogi{" "}
          </Text>
          likes your post:
        </Text>
        <Text fontSize="sm">post content</Text>
        <Text fontSize="sm">1hr ago</Text>
      </Box>
      <Box
        onClick={handleButtonClick}
        onMouseLeave={() => setIsHover(false)}
        position="relative"
        mr="15px"
        ml="15px"
      >
        <HiOutlineDotsHorizontal size="25px" />
        {isHover && (
          <Card
            position="absolute"
            right="0px"
            top="20px"
            padding={2}
            zIndex={100}
            onClick={handleButtonClick}
          >
            <Flex
              _hover={{
                bg: colorMode === "dark" ? "gray.600" : "gray.200",
              }}
              minWidth="200px"
              padding={2}
              alignItems="center"
            >
              <Box mr="10px">
                <FaCheck size="20px" />
              </Box>
              <Text fontWeight="semibold">Mark as read</Text>
            </Flex>
          </Card>
        )}
      </Box>
      <Box h="10px" w="10px" bg="#1877F2" borderRadius="full" />
    </Flex>
  );
};

export default NotificationCard;
