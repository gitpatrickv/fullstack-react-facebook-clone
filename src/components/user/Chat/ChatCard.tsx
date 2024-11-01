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
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
import usesGetChatById from "../../../hooks/user/usesGetChatById";

interface Props {
  chatId: number;
  index: number;
  userId: number;
}

const ChatCard = ({ chatId, index, userId }: Props) => {
  const { colorMode } = useColorMode();
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { data: getChatById } = usesGetChatById(chatId, userId);

  return (
    <>
      <Card width="330px" height="450px" borderRadius="6px 6px 0 0" mr="10px">
        <Flex alignItems="center">
          <Flex
            alignItems="center"
            _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
            _active={{ bg: colorMode === "dark" ? "#383838" : "gray.200" }}
            cursor="pointer"
            padding="8px"
            borderTopLeftRadius="6px"
          >
            <Avatar
              src={
                getChatById?.chatType === "PRIVATE_CHAT"
                  ? getChatById?.privateChatUser?.profilePicture
                  : getChatById?.chatType === "GROUP_CHAT"
                  ? getChatById?.groupChatImage
                  : pic
              }
              cursor="pointer"
              size="sm"
            />
            <Text ml="5px" textTransform="capitalize" fontWeight="semibold">
              {getChatById?.chatType === "PRIVATE_CHAT"
                ? `${getChatById?.privateChatUser?.firstName}` +
                  " " +
                  `${getChatById?.privateChatUser?.lastName}`
                : getChatById?.groupChatName}
            </Text>
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
