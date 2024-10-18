import {
  Avatar,
  Box,
  Card,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FaUserXmark } from "react-icons/fa6";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
interface Props {
  friend: UserDataModelList;
}

const FriendsList = ({ friend }: Props) => {
  const { userId } = useUserStore();
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

  return (
    <>
      <Card
        padding={2}
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
          <Spacer />
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HiOutlineDotsHorizontal size="25px" />}
                variant="ghost"
                borderRadius="full"
                aria-label="menu"
              />
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
            </Menu>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default FriendsList;
