import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebookMessenger, FaUserCheck, FaUserPlus } from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { FriendshipStatusProps } from "../../../hooks/user/useGetFriendshipStatus";
import AcceptFriendRequestButton from "../Buttons/AcceptFriendRequestButton";
import AddFriendButton from "../Buttons/AddFriendButton";

interface Props {
  friendshipStatus?: FriendshipStatusProps;
  postUserId: number;
  handleUnfriendClick: () => void;
  unfriendIsLoading: boolean;
  friendRequestStatus?: FriendshipStatusProps;
}

const UserProfileCardButton = ({
  friendshipStatus,
  postUserId,
  handleUnfriendClick,
  unfriendIsLoading,
  friendRequestStatus,
}: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {friendshipStatus && friendshipStatus?.status === "FRIENDS" ? (
        <Menu>
          <MenuButton as={Button} mr="7px" isLoading={unfriendIsLoading}>
            <Box display="flex">
              <FaUserCheck size="20px" />
              {isSmallScreen ? null : <Text ml="10px">Friends</Text>}
            </Box>
          </MenuButton>

          <MenuList>
            <MenuItem onClick={handleUnfriendClick}>
              <FaUserXmark size="20px" />
              <Text ml="10px">Unfriend</Text>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : friendRequestStatus && friendRequestStatus?.status === "PENDING" ? (
        <>
          <AcceptFriendRequestButton userId={postUserId} mr="7px">
            <FaUserPlus size="20px" />
            {isSmallScreen ? null : <Text ml="10px">Respond</Text>}
          </AcceptFriendRequestButton>
        </>
      ) : (
        <Box mr="7px">
          <AddFriendButton
            userId={postUserId}
            friendshipStatus={friendshipStatus?.status}
          >
            {friendshipStatus && friendshipStatus?.status === "PENDING" ? (
              <>
                <FaUserXmark size="20px" />
                {isSmallScreen ? null : <Text ml="10px">Cancel request</Text>}
              </>
            ) : (
              <>
                <FaUserPlus size="20px" />
                {isSmallScreen ? null : <Text ml="10px">Add friend</Text>}
              </>
            )}
          </AddFriendButton>
        </Box>
      )}
      <Button mr="7px" color="#1877F2">
        <FaFacebookMessenger size="20px" />
        {isSmallScreen ? null : <Text ml="5px">Message</Text>}
      </Button>
    </>
  );
};

export default UserProfileCardButton;
