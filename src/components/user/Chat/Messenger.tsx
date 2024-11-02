import {
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

import { useState } from "react";
import ChatCard from "./ChatCard";
import MessengerChatList from "./MessengerChatList";

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

  const handleAddToChatArray = (chatId: number) => {
    if (chatArray.some((arr) => arr.chatId === chatId)) {
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
      console.log(newChatArray);
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
      console.log(newChatArray);
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
      console.log(newChatArray);
      return newChatArray;
    });
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

      <Box position="fixed" bottom="0" zIndex={100}>
        {chatArray.map((chat) => (
          <ChatCard
            key={chat.chatId}
            chatId={chat.chatId}
            index={chat.index}
            userId={userId}
            isMaximized={chat.isMaximized}
            minimizeChat={() => minimizeChat(chat.index)}
            maximizeChat={() => maximizeChat(chat.index)}
            closeChat={() => closeChat(chat.index)}
          />
        ))}
      </Box>
    </>
  );
};

export default Messenger;
// rightValue: ${80 + chatArray.length * 340}px
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
