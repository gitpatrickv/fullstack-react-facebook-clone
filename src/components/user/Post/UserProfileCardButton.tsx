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

interface Props {
  friendshipStatus?: FriendshipStatusProps;
  handleAddFriendClick: () => void;
  handleUnfriendClick: () => void;
  isLoading: boolean;
  unfriendIsLoading: boolean;
  friendRequestStatus?: FriendshipStatusProps;
  handleAcceptFriendRequestClick: () => void;
  acceptRequestIsLoading: boolean;
}

const UserProfileCardButton = ({
  friendshipStatus,
  handleAddFriendClick,
  handleUnfriendClick,
  isLoading,
  unfriendIsLoading,
  friendRequestStatus,
  handleAcceptFriendRequestClick,
  acceptRequestIsLoading,
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
          <Button
            mr="7px"
            onClick={handleAcceptFriendRequestClick}
            isLoading={acceptRequestIsLoading}
          >
            <FaUserPlus size="20px" />
            {isSmallScreen ? null : <Text ml="10px">Respond</Text>}
          </Button>
        </>
      ) : (
        <Button mr="7px" onClick={handleAddFriendClick} isLoading={isLoading}>
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
        </Button>
      )}
      <Button mr="7px" bg="blue.500" _hover={{ bg: "blue.600" }}>
        <FaFacebookMessenger size="20px" />
        {isSmallScreen ? null : <Text ml="5px">Message</Text>}
      </Button>
    </>
  );
};

export default UserProfileCardButton;
