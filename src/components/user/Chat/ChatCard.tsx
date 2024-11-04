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
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import pic from "../../../assets/profpic.jpeg";

import usesGetChatById from "../../../hooks/user/usesGetChatById";
import { useMessageStore } from "../../../store/message-store";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
import useFetchAllChatMessages from "../../../hooks/user/useFetchAllChatMessages";
import { useChatStore } from "../../../store/chat-store";

interface Props {
  chatId: number;
  index: number;
  userId: number;
  isMaximized: boolean;
}

const ChatCard = ({ chatId, index, userId, isMaximized }: Props) => {
  const { colorMode } = useColorMode();
  const { setChatArray } = useChatStore();
  const { messagesByChatId, setMessageModels } = useMessageStore();
  const { data: getChatById } = usesGetChatById(chatId, userId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const focusRef = useRef<HTMLInputElement | null>(null);

  const {
    data: fetchMessages,
    // fetchNextPage,
    // hasNextPage,
    // refetch: refetchMessages,
  } = useFetchAllChatMessages({
    chatId: chatId,
    pageSize: 1000,
  });

  useEffect(() => {
    if (fetchMessages) {
      const allChatMessages = fetchMessages.pages.flatMap(
        (page) => page.messageModels
      );
      setMessageModels(chatId, allChatMessages);
    }
  }, [fetchMessages, setMessageModels, chatId]);

  const messages = messagesByChatId[chatId] || [];

  useEffect(() => {
    if (focusRef.current && getChatById) {
      focusRef.current.focus();
    }
  }, [getChatById]);

  const minimizeChat = (index: number) => {
    setChatArray((prevArray) => {
      const updatedArray = prevArray.map((chat, i) =>
        i === index ? { ...chat, isMaximized: false } : chat
      );

      const minimizedChat = updatedArray[index];
      const remainingChat = updatedArray.filter((_, i) => i !== index);
      const newChatArray = [...remainingChat, minimizedChat].map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const maximizeChat = (index: number) => {
    setChatArray((prevArray) => {
      const updatedArray = prevArray.map((chat, i) =>
        i === index ? { ...chat, isMaximized: true } : chat
      );

      const maximizeChat = updatedArray[index];
      const remainingChat = updatedArray.filter((_, i) => i !== index);
      const newChatArray = [maximizeChat, ...remainingChat].map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const closeChat = (index: number) => {
    setChatArray((prevArray) => {
      const filteredArray = prevArray.filter((chat) => chat.index !== index);
      const newChatArray = filteredArray.map((chat, i) => ({
        ...chat,
        index: i,
      }));
      return newChatArray;
    });
  };

  const handleMinimizeClick = () => {
    minimizeChat(index);
    setIsHover(false);
  };

  const picture =
    getChatById?.chatType === "PRIVATE_CHAT"
      ? getChatById?.privateChatUser?.profilePicture
      : getChatById?.chatType === "GROUP_CHAT"
      ? getChatById?.groupChatImage
      : pic;

  const chatName =
    getChatById?.chatType === "PRIVATE_CHAT"
      ? `${getChatById?.privateChatUser?.firstName}` +
        " " +
        `${getChatById?.privateChatUser?.lastName}`
      : getChatById?.groupChatName;

  return (
    <>
      {isMaximized ? (
        <Box
          position="fixed"
          bottom="0"
          right={
            index === 0
              ? "85px"
              : index === 1
              ? "425px"
              : index === 2
              ? "765px"
              : undefined
          }
          display="flex"
        >
          <Card width="330px" height="450px" borderRadius="6px 6px 0 0">
            <Box>
              <Flex alignItems="center">
                <Flex
                  alignItems="center"
                  _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
                  _active={{
                    bg: colorMode === "dark" ? "#383838" : "gray.200",
                  }}
                  cursor="pointer"
                  padding="8px"
                  borderTopLeftRadius="6px"
                >
                  <Avatar src={picture} cursor="pointer" size="sm" />
                  <Text
                    ml="5px"
                    textTransform="capitalize"
                    fontWeight="semibold"
                    isTruncated={true}
                    maxWidth="200px"
                  >
                    {chatName}
                  </Text>
                </Flex>
                <Spacer />
                <IconButton
                  aria-label="minimize"
                  icon={<VscChromeMinimize size="20px" />}
                  bg="transparent"
                  _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
                  _active={{
                    bg: colorMode === "dark" ? "#383838" : "gray.200",
                  }}
                  isRound
                  size="sm"
                  onClick={handleMinimizeClick}
                />
                <IconButton
                  aria-label="close"
                  icon={<IoClose size="25px" />}
                  bg="transparent"
                  _hover={{ bg: colorMode === "dark" ? "#303030" : "gray.100" }}
                  _active={{
                    bg: colorMode === "dark" ? "#383838" : "gray.200",
                  }}
                  isRound
                  size="sm"
                  mr="3px"
                  onClick={() => closeChat(index)}
                />
              </Flex>
              <Divider color={colorMode === "dark" ? "#383838" : "gray.200"} />
            </Box>

            <Box overflowY="auto" height="410px">
              <Flex
                justifyContent="center"
                alignItems="center"
                mt="20px"
                flexDirection="column"
              >
                <Avatar src={picture} size="lg" />
                <Text
                  fontSize="lg"
                  textTransform="capitalize"
                  fontWeight="semibold"
                  mt="10px"
                  mb="20px"
                >
                  {chatName}
                </Text>
              </Flex>

              {messages.map((msg: any) => (
                <Messages
                  key={msg.messageId}
                  message={msg}
                  isSender={msg.sender.userId === userId}
                />
              ))}
            </Box>

            <Box height="65px">
              <WriteMessage chatId={chatId} focusRef={focusRef} />
            </Box>
          </Card>
        </Box>
      ) : (
        <>
          <Box
            position="relative"
            bottom="30px"
            right="-85px"
            display="flex"
            flexDirection="column"
            mt="12px"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover && (
              <>
                <Box
                  position="absolute"
                  right="-13px"
                  bottom="32px"
                  zIndex={10}
                >
                  <IconButton
                    aria-label="close"
                    icon={<IoClose size="20px" />}
                    bg={colorMode === "dark" ? "#303030" : "gray.200"}
                    _hover={{
                      bg: colorMode === "dark" ? "#484848" : "gray.300",
                    }}
                    isRound
                    size="xs"
                    mr="3px"
                    onClick={() => closeChat(index)}
                  />
                </Box>
                <Card
                  position="absolute"
                  right="55px"
                  bottom="5px"
                  padding={2}
                  zIndex={10}
                >
                  <Text
                    textTransform="capitalize"
                    fontWeight="bold"
                    isTruncated={true}
                    maxWidth="200px"
                    fontSize="sm"
                  >
                    {chatName}
                  </Text>
                </Card>
              </>
            )}
            <Avatar
              src={picture}
              onClick={() => maximizeChat(index)}
              cursor="pointer"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default ChatCard;
