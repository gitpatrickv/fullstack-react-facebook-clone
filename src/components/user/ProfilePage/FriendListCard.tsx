import {
  Box,
  Card,
  IconButton,
  Image,
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
import { useNavigate, useParams } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useUserStore } from "../../../store/user-store";
import { useProfileStore } from "../../../store/profile-store";

interface Props {
  friend: UserDataModelList;
}

const FriendListCard = ({ friend }: Props) => {
  const params = useParams<{ userId: string }>();
  const paramsUserId = Number(params.userId);
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
  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/profile/${friend.userId}`);
    setIsProfile(true);
  };
  const { colorMode } = useColorMode();

  return (
    <>
      <Card
        padding={4}
        _hover={{
          bg: colorMode === "dark" ? "gray.800" : "gray.200",
        }}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={friend.profilePicture || pic}
            borderRadius="5px"
            width="90px"
            height="90px"
            objectFit="cover"
            onClick={handleNavigateClick}
            cursor="pointer"
          />

          <Text
            ml="10px"
            isTruncated={true}
            onClick={handleNavigateClick}
            cursor="pointer"
            textTransform="capitalize"
            fontWeight="semibold"
            fontSize={{ base: "md", md: "lg" }}
            maxWidth="150px"
          >
            {friend.firstName} {friend.lastName}
          </Text>
          <Spacer />
          {userId === paramsUserId && (
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
          )}
        </Box>
      </Card>
    </>
  );
};

export default FriendListCard;
