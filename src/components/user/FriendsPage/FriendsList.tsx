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
import { FaUserXmark } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useAddToFriend from "../../../hooks/user/useAddToFriend";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useFriendStore } from "../../../store/friend-store";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
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

  const { mutation, isLoading, setIsLoading } = useAcceptFriendRequest();

  const handleAcceptFriendRequestClick = () => {
    mutation.mutate(friend.userId);
    setIsLoading(true);
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

  const {
    mutation: addFriend,
    isLoading: addFriendIsLoading,
    setIsLoading: setAddFriendIsLoading,
  } = useAddToFriend();

  const handleAddFriendClick = () => {
    addFriend.mutate(friend.userId);
    setAddFriendIsLoading(true);
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
                <Button
                  width="100%"
                  mr="5px"
                  bg="#1877F2"
                  _hover={{ bg: "#165BB7" }}
                  isLoading={isLoading}
                  onClick={handleAcceptFriendRequestClick}
                  height="35px"
                >
                  Confirm
                </Button>
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
              <Button
                ml="10px"
                mt="5px"
                width="150px"
                mr="5px"
                bg="#1877F2"
                _hover={{ bg: "#165BB7" }}
                height="35px"
                onClick={handleAddFriendClick}
                isLoading={addFriendIsLoading}
              >
                {friendshipStatus && friendshipStatus?.status === "PENDING" ? (
                  <Text>Cancel</Text>
                ) : (
                  <Text>Add friend</Text>
                )}
              </Button>
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
