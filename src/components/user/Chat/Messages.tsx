import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { useRef, useState } from "react";
import pic from "../../../assets/profpic.jpeg";

const Messages = () => {
  const [isSender, setIsSender] = useState(true);
  const chatBottom = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  return (
    <Box
      display="flex"
      flexDirection={isSender ? "row-reverse" : "row"}
      alignItems="center"
      mb={2}
      mr="10px"
      ml="10px"
    >
      {!isSender && <Avatar src={pic} size="sm" mr="5px" />}
      <Box
        bg={
          isSender ? "#1877F2" : colorMode === "dark" ? "#303030" : "gray.100"
        }
        color="black"
        p={2}
        borderRadius="10px"
      >
        <Text
          whiteSpace="pre-wrap"
          color={isSender || colorMode === "dark" ? "white" : "black"}
        >
          message here
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
