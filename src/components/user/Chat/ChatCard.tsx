import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Portal,
  Spacer,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEdit, FaUserPlus, FaUsers } from "react-icons/fa";
import { IoChevronDown, IoClose, IoExitOutline } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { VscChromeMinimize } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useFetchAllChatMessages from "../../../hooks/user/useFetchAllChatMessages";
import usesGetChatById from "../../../hooks/user/usesGetChatById";
import useUploadGroupChatImage from "../../../hooks/user/useUploadGroupChatImage";
import { useChatStore } from "../../../store/chat-store";
import { useMessageStore } from "../../../store/message-store";
import UserListModel from "../Post/UserListModel";
import Messages from "./Messages";
import WriteMessage from "./WriteMessage";
import useUpdateGroupChatName, {
  UpdateGroupChatNameProps,
} from "../../../hooks/user/useUpdateGroupChatName";
import { useForm } from "react-hook-form";
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
  const { data: fetchMessages } = useFetchAllChatMessages({
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
  const {
    isOpen: isOpenUpdateName,
    onOpen: onOpenUpdateName,
    onClose: onCloseUpdateName,
  } = useDisclosure();

  const { mutate: uploadPhoto } = useUploadGroupChatImage(chatId);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto({ file: file });
    }
  };
  const { handleSubmit, setValue } = useForm<UpdateGroupChatNameProps>();

  const [name, setName] = useState<string>("");
  const { mutate: updateGroupChatName } = useUpdateGroupChatName();
  const initialRef = useRef<HTMLInputElement | null>(null);
  const [loading, setIsLoading] = useState<boolean>(false);
  const handleUpdateNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setValue("name", e.target.value);
  };

  const onSubmit = (data: UpdateGroupChatNameProps) => {
    setIsLoading(true);
    updateGroupChatName(
      { chatId: chatId, name: data.name },
      {
        onSuccess: () => {
          setIsLoading(false);
          setName("");
          onCloseUpdateName();
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

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
                        <>
                          <MenuItem onClick={onOpenUpdateName}>
                            <FaEdit size="20px" />
                            <Text ml="10px">Conversation Name</Text>
                          </MenuItem>
                          <MenuItem onClick={handleInputClick}>
                            <MdAddPhotoAlternate size="20px" />
                            <Text ml="10px">Change photo</Text>
                          </MenuItem>
                          <input
                            type="file"
                            accept=".jpeg, .png"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleUploadImage}
                          />
                          <MenuItem>
                            <FaUserPlus size="20px" />
                            <Text ml="10px">Add people</Text>
                          </MenuItem>
                          <MenuItem onClick={onOpen}>
                            <FaUsers size="20px" />
                            <Text ml="10px">Members</Text>
                          </MenuItem>
                          <MenuItem>
                            <IoExitOutline size="20px" />
                            <Text ml="10px">Leave group</Text>
                          </MenuItem>
                        </>
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
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
        finalFocusRef={focusRef}
      >
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

      <Modal
        isOpen={isOpenUpdateName}
        onClose={onCloseUpdateName}
        size="xl"
        isCentered
        initialFocusRef={initialRef}
        finalFocusRef={focusRef}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Change chat name</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody>
              <Text>
                Changing the name of a group chat changes it for everyone.
              </Text>
              <Input
                ref={initialRef}
                mt="10px"
                onChange={handleUpdateNameChange}
                value={name}
                placeholder={"Group Chat Name"}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onCloseUpdateName}
                variant="ghost"
                mr="5px"
                width="100px"
              >
                Cancel
              </Button>
              <Button
                isLoading={loading}
                type="submit"
                isDisabled={name === "" ? true : false}
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
                width="100px"
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default ChatCard;
