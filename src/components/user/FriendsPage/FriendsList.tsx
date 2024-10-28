import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useFriendStore } from "../../../store/friend-store";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";
interface Props {
  friend: UserDataModelList;
}

const FriendsList = ({ friend }: Props) => {
  const { userId } = useUserStore();
  const { isAllFriends, isFriendRequest, isSuggestions } = useFriendStore();
  const {
    mutation: unfriend,
    isLoading: unfriendIsLoading,
    setIsLoading: setUnfriendIsLoading,
  } = useUnfriend(userId ?? 0);

  const handleUnfriendClick = () => {
    setUnfriendIsLoading(true);
    unfriend.mutate(friend.userId);
  };
  const navigate = useNavigate();

  const { colorMode } = useColorMode();

  const { setIsProfile } = useProfileStore();
  const handleNavigateProfileClick = () => {
    navigate(`/profile/${friend.userId}`);
    setIsProfile(false);
  };

  const {
    mutation: deleteRequest,
    isLoading: deleteRequestIsLoading,
    setIsLoading: setDeleteRequestIsLoading,
  } = useDeleteFriendRequest(userId ?? 0);

  const handleDeleteFriendRequestClick = () => {
    deleteRequest.mutate(friend.userId);
    setDeleteRequestIsLoading(true);
  };

  const { data: friendshipStatus } = useGetFriendshipStatus(friend.userId);

  return (
    <>
      <Card
        padding={isAllFriends ? 2 : 4}
        _hover={{
          bg: colorMode === "dark" ? "gray.800" : "gray.200",
        }}
      >
        <Box display="flex" alignItems="center">
          <Avatar
            src={friend.profilePicture || pic}
            onClick={handleNavigateProfileClick}
            cursor="pointer"
            size="lg"
          />
          <Box width="100%">
            <Text
              ml="10px"
              isTruncated={true}
              onClick={handleNavigateProfileClick}
              cursor="pointer"
              textTransform="capitalize"
              fontWeight="semibold"
              fontSize={{ base: "md", md: "lg" }}
              maxWidth="150px"
            >
              {friend.firstName} {friend.lastName}
            </Text>
            {isFriendRequest && (
              <Flex ml="10px" mt="5px">
                <AcceptFriendRequestButton
                  userId={friend.userId}
                  width="100%"
                  mr="5px"
                  height="35px"
                >
                  <Text>Confirm</Text>
                </AcceptFriendRequestButton>
                <Button
                  width="100%"
                  onClick={handleDeleteFriendRequestClick}
                  isLoading={deleteRequestIsLoading}
                  height="35px"
                >
                  Delete
                </Button>
              </Flex>
            )}
            {isSuggestions && (
              <Box ml="10px" mt="5px">
                <AddFriendButton
                  userId={friend.userId}
                  friendshipStatus={friendshipStatus?.status}
                >
                  {friendshipStatus &&
                  friendshipStatus?.status === "PENDING" ? (
                    <>
                      <FaUserXmark size="20px" />
                      <Text ml="10px">Cancel request</Text>
                    </>
                  ) : (
                    <>
                      <FaUserPlus size="20px" />
                      <Text ml="10px">Add friend</Text>
                    </>
                  )}
                </AddFriendButton>
              </Box>
            )}
          </Box>
          <Spacer />
          {isAllFriends && (
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<HiOutlineDotsHorizontal size="25px" />}
                  variant="ghost"
                  borderRadius="full"
                  aria-label="menu"
                />
                <Portal>
                  <MenuList>
                    <MenuItem
                      padding={2}
                      onClick={handleUnfriendClick}
                      isDisabled={unfriendIsLoading}
                    >
                      <FaUserXmark size="25px" />
                      <Text ml="10px" fontSize="lg" fontWeight="semibold">
                        Unfriend
                      </Text>
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          )}
        </Box>
      </Card>
    </>
  );
};

export default FriendsList;
