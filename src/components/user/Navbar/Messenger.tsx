import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { BiLogoMessenger } from "react-icons/bi";
import ChatCard from "../Chat/ChatCard";

const Messenger = () => {
  const array = [1, 2, 3, 4, 5];

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
            <Box maxHeight="400px" overflowY="visible" id="scrollable-chat">
              {array.map((chat) => (
                <MenuItem key={chat}>
                  <ChatCard />
                </MenuItem>
              ))}
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
