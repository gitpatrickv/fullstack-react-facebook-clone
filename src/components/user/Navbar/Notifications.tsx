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
import { IoMdNotificationsOff } from "react-icons/io";
import { IoNotificationsCircle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import useFetchAllNotifications from "../../../hooks/user/useFetchAllNotifications";
import NotificationCard from "./NotificationCard";
import useGetNotificationCount from "../../../hooks/user/useGetNotificationCount";

interface Props {
  userId: number;
}

const Notifications = ({ userId }: Props) => {
  const { data: getNotificationCount } = useGetNotificationCount(userId);

  const {
    data: fetchAllNotifications,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllNotifications({
    userId: userId,
    pageSize: 6,
  });

  const fetchNotificationsData =
    fetchAllNotifications?.pages.reduce(
      (total, page) => total + page.notificationModels.length,
      0
    ) || 0;

  const notificationsLength =
    fetchAllNotifications?.pages?.flatMap(
      (page) => page.notificationModels || []
    ).length || 0;

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
            <Box ml="10px" mb="5px">
              <Text fontWeight="bold" fontSize="x-large" ml="5px">
                Notifications
              </Text>
            </Box>
            {notificationsLength < 1 ? (
              <Box
                height="150px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="250px"
              >
                <Flex flexDirection="column" alignItems="center">
                  <IoMdNotificationsOff size="50px" />
                  <Text mt="10px" fontSize="x-large">
                    No notifications yet
                  </Text>
                </Flex>
              </Box>
            ) : (
              <Box
                maxHeight="400px"
                overflowY="auto"
                id="scrollable-notification"
              >
                <InfiniteScroll
                  dataLength={fetchNotificationsData}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={<Spinner />}
                  scrollableTarget="scrollable-notification"
                >
                  {fetchAllNotifications?.pages.map((page) =>
                    page.notificationModels.map((list) => (
                      <MenuItem key={list.notificationId}>
                        <NotificationCard notification={list} />
                      </MenuItem>
                    ))
                  )}
                </InfiniteScroll>
              </Box>
            )}
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
            {getNotificationCount?.count}
          </Text>
        </Box>
      </Flex>
    </>
  );
};

export default Notifications;
