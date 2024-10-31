import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import pic from "../../../assets/profpic.jpeg";
import { useChatStore } from "../../../store/chat-store";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
const ChatCard = () => {
  const { colorMode } = useColorMode();
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { minimizeChat } = useChatStore();
  return (
    <>
      <Card width="330px" height="450px" borderRadius="6px 6px 0 0">
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
            _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
            cursor="pointer"
            padding="8px"
            borderTopLeftRadius="6px"
          >
            <Avatar src={pic} cursor="pointer" size="sm" />
            <Text ml="5px">FULL NAME HERE</Text>
          </Flex>
          <Spacer />
          <IconButton
            aria-label="minimize"
            icon={<VscChromeMinimize size="20px" />}
            bg="transparent"
            _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
            _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
            isRound
            size="sm"
            onClick={minimizeChat}
          />
          <IconButton
            aria-label="close"
            icon={<IoClose size="25px" />}
            bg="transparent"
            _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
            _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
            isRound
            size="sm"
            mr="3px"
            onClick={minimizeChat}
          />
        </Flex>
        <Divider
          color={colorMode === "dark" ? "#383838" : "gray.200"}
          mb="10px"
        />
        <Box overflowY="auto">
          {array.map((arr) => (
            <Messages key={arr} />
          ))}
        </Box>

        <Box height="65px">
          <WriteMessage />
        </Box>
      </Card>
    </>
  );
};

export default ChatCard;
