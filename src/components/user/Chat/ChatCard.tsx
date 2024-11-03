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
import useFetchAllChatMessages from "../../../hooks/user/useFetchAlLChatMessages";
import usesGetChatById from "../../../hooks/user/usesGetChatById";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";

interface Props {
  chatId: number;
  index: number;
  userId: number;
  isMaximized: boolean;
  minimizeChat: () => void;
  maximizeChat: () => void;
  closeChat: () => void;
}

const ChatCard = ({
  chatId,
  index,
  userId,
  isMaximized,
  minimizeChat,
  maximizeChat,
  closeChat,
}: Props) => {
  const { colorMode } = useColorMode();

  const { data: getChatById } = usesGetChatById(chatId, userId);
  const [isHover, setIsHover] = useState<boolean>(false);

  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (focusRef.current && getChatById) {
      focusRef.current.focus();
    }
  }, [getChatById]);

  const handleMinimizeClick = () => {
    minimizeChat();
    setIsHover(false);
  };

  const {
    data: fetchMessages,
    // fetchNextPage,
    // hasNextPage,
    // refetch: refetchMessages,
  } = useFetchAllChatMessages({
    chatId: chatId,
    pageSize: 30,
  });

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
                  onClick={closeChat}
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
              {fetchMessages?.pages.map((page) =>
                page.messageModels.map((msg) => (
                  <Messages
                    key={msg.messageId}
                    message={msg}
                    isSender={msg.sender.userId === userId}
                  />
                ))
              )}
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
                    onClick={closeChat}
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
            <Avatar src={picture} onClick={maximizeChat} cursor="pointer" />
          </Box>
        </>
      )}
    </>
  );
};

export default ChatCard;
