import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { BiLogoMessenger } from "react-icons/bi";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllUserChats from "../../../hooks/user/useFetchAllUserChats";

import MessengerChatList from "./MessengerChatList";
import ChatCard from "./ChatCard";
import { useState } from "react";

interface Props {
  userId: number;
}

interface ArrayItem {
  chatId: number;
  index: number;
  isMaximized: boolean;
}

const Messenger = ({ userId }: Props) => {
  const {
    data: fetchAllChat,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllUserChats({
    userId: userId,
    pageSize: 6,
  });

  const fetchChatData =
    fetchAllChat?.pages.reduce(
      (total, page) => total + page.chatModels.length,
      0
    ) || 0;

  const [chatArray, setChatArray] = useState<ArrayItem[]>([]);
  const [isMaximized, setIsMaximized] = useState<boolean>();

  const handleAddToChatArray = (chatId: number) => {
    if (chatArray.some((arr) => arr.chatId === chatId)) {
      console.log(`Chat ID ${chatId} is already in the array`);
      return;
    }

    const newArrayItem: ArrayItem = {
      chatId,
      index: chatArray.length,
      isMaximized: true,
    };

    let newArray = [...chatArray, newArrayItem];

    if (newArray.length > 3) {
      newArray.shift();
    }

    newArray = newArray.map((item, index) => ({
      ...item,
      index,
    }));

    setChatArray(newArray);
    console.log(newArray);
  };

  return (
    <>
      <Flex justifyContent="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="chats"
            icon={<BiLogoMessenger size="43px" />}
            variant="none"
          />
          <MenuList border="none">
            <Box ml="10px" mb="5px">
              <Text fontWeight="bold" fontSize="x-large" ml="5px">
                Chats
              </Text>
            </Box>
            <Box maxHeight="400px" overflowY="auto" id="scrollable-chat">
              <InfiniteScroll
                dataLength={fetchChatData}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={<Spinner />}
                scrollableTarget="scrollable-chat"
              >
                {fetchAllChat?.pages.map((page) =>
                  page.chatModels.map((chat) => (
                    <MenuItem
                      key={chat.chatId}
                      onClick={() => handleAddToChatArray(chat.chatId)}
                    >
                      <MessengerChatList chat={chat} />
                    </MenuItem>
                  ))
                )}
              </InfiniteScroll>
            </Box>
          </MenuList>
        </Menu>
        <Box
          h="22px"
          w="22px"
          bg="red"
          borderRadius="full"
          position="absolute"
          top="7px"
          right="103px"
        >
          <Text
            textAlign="center"
            color="white"
            fontSize="sm"
            fontWeight="semibold"
          >
            1
          </Text>
        </Box>
      </Flex>
      <Box position="fixed" bottom="0" right="80px" zIndex={10} display="flex">
        {chatArray.map((chat) => (
          <ChatCard
            key={chat.chatId}
            chatId={chat.chatId}
            index={chat.index}
            userId={userId}
          />
        ))}
      </Box>
    </>
  );
};

export default Messenger;

{
  /* <Box
              height="150px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="250px"
            >
              <Flex flexDirection="column" alignItems="center">
                <Text mt="10px" fontSize="x-large">
                  No chats yet
                </Text>
              </Flex>
            </Box> */
}
