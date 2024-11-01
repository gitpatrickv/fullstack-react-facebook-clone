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
import { useChatStore } from "../../../store/chat-store";
import MessengerChatList from "./MessengerChatList";

interface Props {
  userId: number;
}

const Messenger = ({ userId }: Props) => {
  const { maximizeChat, addToQueue } = useChatStore();

  const handleAddToChatArray = (index: number) => {
    addToQueue(index);
    maximizeChat();
  };

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
                  page.chatModels.map((chat, index) => (
                    <MenuItem
                      key={chat.chatId}
                      onClick={() => handleAddToChatArray(index)}
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
