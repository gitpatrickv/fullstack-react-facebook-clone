import { Avatar, Box, Text } from "@chakra-ui/react";

const ChatList = () => {
  return (
    <>
      <Box display="flex" alignItems="center" cursor="pointer" mt="15px">
        <Avatar
          src={
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="xs"
          ml="3px"
        />
        <Text ml="13px">Patrick V.</Text>
      </Box>
    </>
  );
};

export default ChatList;
