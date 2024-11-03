import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import MessageModel from "../../../entities/Message";
import pic from "../../../assets/profpic.jpeg";

interface Props {
  message: MessageModel;
  isSender: boolean;
}

const Messages = ({ message, isSender }: Props) => {
  const chatBottom = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (chatBottom.current) {
      chatBottom.current.scrollIntoView();
    }
  }, [message.message]);
  return (
    <Box
      display="flex"
      flexDirection={isSender ? "row-reverse" : "row"}
      alignItems="center"
      mb={2}
      mr="10px"
      ml="10px"
    >
      {!isSender && (
        <Avatar src={message.sender.profilePicture || pic} size="sm" mr="5px" />
      )}
      <Box
        bg={
          isSender ? "#1877F2" : colorMode === "dark" ? "#303030" : "gray.100"
        }
        color="black"
        p={2}
        borderRadius="20px"
      >
        <Text
          whiteSpace="pre-wrap"
          color={isSender || colorMode === "dark" ? "white" : "black"}
          maxWidth="180px"
        >
          {message.message}
        </Text>
        {/* <Text textAlign="end" fontSize="xs">
          1h
        </Text> */}
      </Box>
      <Box ref={chatBottom}></Box>
    </Box>
  );
};

export default Messages;
