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
import { IoNotificationsCircle } from "react-icons/io5";
import NotificationCard from "./NotificationCard";
const Notifications = () => {
  const array = [1, 2, 3, 4, 5];

  return (
    <>
      <Flex justifyContent="center">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Notifications"
            icon={<IoNotificationsCircle size="40px" />}
            variant="none"
          />
          <MenuList border="none">
            {array.map((item) => (
              <MenuItem key={item}>
                <NotificationCard />
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Box
          h="22px"
          w="22px"
          bg="red"
          borderRadius="full"
          position="absolute"
          top="7px"
          right="57px"
        >
          <Text
            textAlign="center"
            color="white.500"
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

export default Notifications;
