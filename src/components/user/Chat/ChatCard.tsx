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
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import pic from "../../../assets/profpic.jpeg";
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
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const { data: getChatById } = usesGetChatById(chatId, userId);
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMinimizeClick = () => {
    minimizeChat();
    setIsHover(false);
  };

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
                <Text
                  ml="5px"
                  textTransform="capitalize"
                  fontWeight="semibold"
                  isTruncated={true}
                  maxWidth="200px"
                >
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
                onClick={handleMinimizeClick}
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
                onClick={closeChat}
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
                    {getChatById?.chatType === "PRIVATE_CHAT"
                      ? `${getChatById?.privateChatUser?.firstName}` +
                        " " +
                        `${getChatById?.privateChatUser?.lastName}`
                      : getChatById?.groupChatName}
                  </Text>
                </Card>
              </>
            )}
            <Avatar
              src={
                getChatById?.chatType === "PRIVATE_CHAT"
                  ? getChatById?.privateChatUser?.profilePicture
                  : getChatById?.chatType === "GROUP_CHAT"
                  ? getChatById?.groupChatImage
                  : pic
              }
              onClick={maximizeChat}
              cursor="pointer"
            />
          </Box>
        </>
      )}
    </>
  );
};

export default ChatCard;
