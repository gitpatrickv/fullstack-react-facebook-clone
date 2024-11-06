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
import { useEffect } from "react";
import { IoMdNotificationsOff } from "react-icons/io";
import { IoNotificationsCircle } from "react-icons/io5";
import InfiniteScroll from "react-infinite-scroll-component";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import useFetchAllNotifications from "../../../hooks/user/useFetchAllNotifications";
import useGetNotificationCount from "../../../hooks/user/useGetNotificationCount";
import { useNotificationStore } from "../../../store/notification-store";
import NotificationCard from "./NotificationCard";
import { useMessageStore } from "../../../store/message-store";

interface Props {
  userId: number;
  email: string;
}

const Notifications = ({ userId, email }: Props) => {
  const { data: getNotificationCount, refetch: refetchNotificationCount } =
    useGetNotificationCount(userId);
  const {
    addNotification,
    stompClientRef,
    setNotificationModels,
    notificationModels,
    setIsConnected,
  } = useNotificationStore();

  const { addMessage } = useMessageStore();

  const {
    data: fetchAllNotifications,
    fetchNextPage,
    hasNextPage,
    refetch: refetchNotifications,
  } = useFetchAllNotifications({
    userId: userId,
    pageSize: 6,
  });

  const fetchNotificationsData =
    fetchAllNotifications?.pages.reduce(
      (total, page) => total + page.notificationModels.length,
      0
    ) || 0;

  useEffect(() => {
    if (fetchAllNotifications) {
      const allNotifications = fetchAllNotifications.pages.flatMap(
        (page) => page.notificationModels
      );
      setNotificationModels(allNotifications);
    }
  }, [fetchAllNotifications, setNotificationModels]);

  useEffect(() => {
    if (email && stompClientRef.current === null) {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);

      client.connect(
        {},
        () => {
          stompClientRef.current = client;
          setIsConnected(true);
          console.log(`Connected to WebSocket for user email: ${email}`);

          stompClientRef.current.subscribe(
            `/user/${email}/notifications`,
            (message) => {
              const notification = JSON.parse(message.body);
              addNotification(notification);
            }
          );

          stompClientRef.current.subscribe(`/user/${email}/chat`, (message) => {
            const text = JSON.parse(message.body);
            addMessage(text.chatId, text);
          });
        },
        (error) => {
          console.error("WebSocket connection error:", error);
        }
      );
      return () => {
        if (stompClientRef.current) {
          stompClientRef.current.disconnect(() => {
            console.log("Disconnected from WebSocket");
            stompClientRef.current = null;
            setIsConnected(false);
          });
        }
      };
    }
  }, [email]);

  useEffect(() => {
    refetchNotificationCount();
    refetchNotifications();
  }, [notificationModels]);

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
            {notificationModels.length === 0 ? (
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
                  {notificationModels.map((notification) => (
                    <MenuItem key={notification.notificationId}>
                      <NotificationCard notification={notification} />
                    </MenuItem>
                  ))}
                </InfiniteScroll>
              </Box>
            )}
          </MenuList>
        </Menu>
        {getNotificationCount && getNotificationCount.count >= 1 && (
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
              color="white"
              fontSize="sm"
              fontWeight="semibold"
            >
              {getNotificationCount?.count}
            </Text>
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Notifications;
