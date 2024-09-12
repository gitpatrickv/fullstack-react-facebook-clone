import { Box, Divider, Text } from "@chakra-ui/react";
import ChatList from "./ChatList";
import GroupChatList from "./GroupChatList";

const Chat = () => {
  return (
    <Box>
      <Text fontWeight="semibold">Contacts</Text>
      <ChatList />
      <Divider mt="10px" mb="10px" />
      <Text fontWeight="semibold">Group chats</Text>
      <GroupChatList />
    </Box>
  );
};

export default Chat;
