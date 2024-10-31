import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import pic from "../../../assets/profpic.jpeg";
import Messages from "./Messages";
const ChatCard = () => {
  const { colorMode } = useColorMode();
  const boxStyle = {
    cursor: "pointer",
    height: "30px",
    width: "30px",
    borderRadius: "full",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bg: "transparent",
    _hover: { bg: colorMode === "dark" ? "gray.500" : "gray.100" },
    _active: { bg: colorMode === "dark" ? "gray.600" : "gray.200" },
    _focus: { boxShadow: "outline" },
  };

  return (
    <>
      <Card width="330px" height="450px" borderRadius="6px 6px 0 0">
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            _hover={{
              bg: colorMode === "dark" ? "gray.600" : "gray.100",
            }}
            cursor="pointer"
            padding="8px"
            borderTopLeftRadius="6px"
          >
            <Avatar src={pic} cursor="pointer" size="sm" />
            <Text ml="5px">FULL NAME HERE</Text>
          </Flex>
          <Spacer />
          <Box {...boxStyle}>
            <VscChromeMinimize size="20px" />
          </Box>
          <Box {...boxStyle} mr="3px">
            <IoClose size="30px" />
          </Box>
        </Flex>
        <Divider color={colorMode === "dark" ? "#383838" : "gray.200"} />
        <Messages />
      </Card>
    </>
  );
};

export default ChatCard;
