import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import pic from "../../../assets/profpic.jpeg";
import MessageModel from "../../../entities/Message";

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
  }, []);
  return (
    <>
      {message.message && (
        <Box
          display="flex"
          flexDirection={isSender ? "row-reverse" : "row"}
          alignItems="center"
          mb={2}
          mr="10px"
          ml="10px"
          overflow="visible"
        >
          {!isSender && (
            <Box>
              <Avatar
                src={message.sender.profilePicture || pic}
                size="sm"
                mr="5px"
              />
            </Box>
          )}

          <Box
            bg={
              isSender
                ? "#1877F2"
                : colorMode === "dark"
                ? "#303030"
                : "gray.100"
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
        </Box>
      )}
      {message.messageUpdate && (
        <Box mb="5px">
          <Text textAlign="center" fontSize="xs" userSelect="none">
            {message.messageUpdate}
          </Text>
        </Box>
      )}
      <Box ref={chatBottom}></Box>
    </>
  );
};

export default Messages;
