import { Box, Divider, Text } from "@chakra-ui/react";
import useFetchAllUserChats from "../../../hooks/user/useFetchAllUserChats";
import { useUserStore } from "../../../store/user-store";
import ChatList from "./ChatList";

const Contacts = () => {
  const { userId } = useUserStore();

  const { data: fetchAllChat } = useFetchAllUserChats({
    userId: userId,
    pageSize: 10,
  });

  return (
    <Box width="300px" mt="5px">
      <Text fontWeight="semibold" ml="10px" fontSize="lg" color="gray.500">
        Contacts
      </Text>
      {fetchAllChat?.pages.map((page) =>
        page.chatModels
          .filter((chat) => chat.chatType === "PRIVATE_CHAT")
          .map((chat) => <ChatList key={chat.chatId} chat={chat} />)
      )}
      <Divider mt="10px" mb="10px" ml="10px" />
      <Text fontWeight="semibold" ml="10px" fontSize="lg" color="gray.500">
        Group chats
      </Text>
      {fetchAllChat?.pages.map((page) =>
        page.chatModels
          .filter((chat) => chat.chatType === "GROUP_CHAT")
          .map((chat) => <ChatList key={chat.chatId} chat={chat} />)
      )}
    </Box>
  );
};

export default Contacts;
