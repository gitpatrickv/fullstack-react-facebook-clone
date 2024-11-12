import {
  Avatar,
  Box,
  Card,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Portal,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaUsers } from "react-icons/fa";
import { IoChevronDown, IoClose } from "react-icons/io5";
import { VscChromeMinimize } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useFetchAllChatMessages from "../../../hooks/user/useFetchAllChatMessages";
import usesGetChatById from "../../../hooks/user/usesGetChatById";
import { useChatStore } from "../../../store/chat-store";
import { useMessageStore } from "../../../store/message-store";
import UserListModel from "../Post/UserListModel";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
interface Props {
  chatId: number;
  index: number;
  userId: number;
  isMaximized: boolean;
}

const ChatCard = ({ chatId, index, userId, isMaximized }: Props) => {
  const { colorMode } = useColorMode();
  const { setChatArray, isNewMessageMaximized } = useChatStore();
  const { messagesByChatId, setMessageModels } = useMessageStore();
  const { data: getChatById } = usesGetChatById(chatId, userId);
  const [isHover, setIsHover] = useState<boolean>(false);
  const focusRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
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
      : getChatById?.groupChatName
      ? getChatById?.groupChatName
      : "New Group Chat";

  const handleNavigateClick = () => {
    navigate(`/profile/${getChatById?.privateChatUser?.userId}`);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {isMaximized ? (
        <Box
          position="fixed"
          bottom="0"
          right={
            isNewMessageMaximized
              ? index === 0
                ? "425px"
                : index === 1
                ? "765px"
                : index === 2
                ? "1105px"
                : undefined
              : index === 0
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
                <Menu>
                  <MenuButton
                    alignItems="center"
                    _hover={{
                      bg: colorMode === "dark" ? "#303030" : "gray.100",
                    }}
                    _active={{
                      bg: colorMode === "dark" ? "#383838" : "gray.200",
                    }}
                    cursor="pointer"
                    padding="8px"
                    borderTopLeftRadius="6px"
                    margin="0"
                  >
                    <Flex alignItems="center">
                      <Avatar src={picture} cursor="pointer" size="sm" />
                      <Text
                        ml="5px"
                        textTransform="capitalize"
                        fontWeight="semibold"
                        isTruncated={true}
                        maxWidth="200px"
                        mr="5px"
                      >
                        {chatName}
                      </Text>
                      <Box color="gray.500">
                        <IoChevronDown />
                      </Box>
                    </Flex>
                  </MenuButton>
                  <Portal>
                    <MenuList
                      position="absolute"
                      bottom="5px"
                      left="-230px"
                      border="none"
                      zIndex={1500}
                    >
                      {getChatById?.chatType === "PRIVATE_CHAT" && (
                        <MenuItem onClick={handleNavigateClick}>
                          <CgProfile size="20px" />
                          <Text ml="10px">View Profile</Text>
                        </MenuItem>
                      )}
                      {getChatById?.chatType === "GROUP_CHAT" && (
                        <MenuItem onClick={onOpen}>
                          <FaUsers size="20px" />
                          <Text ml="10px">Members</Text>
                        </MenuItem>
                      )}
                    </MenuList>
                  </Portal>
                </Menu>
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
            bottom="75px"
            right="-85px"
            display="flex"
            flexDirection="column"
            mt="10px"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {isHover && (
              <>
                <Box
                  position="absolute"
                  right="-10px"
                  bottom="30px"
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
                  zIndex={20}
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent height="500px">
          <ModalHeader textAlign="center">Members</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody maxHeight="450px" overflowY="auto">
            {getChatById?.chatType === "GROUP_CHAT" &&
              getChatById.users?.map((users) => (
                <UserListModel key={users.userId} users={users} />
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChatCard;
