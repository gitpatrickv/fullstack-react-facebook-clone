import {
  Avatar,
  Box,
  Button,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { UserData } from "../../../entities/User";

import { CgProfile } from "react-icons/cg";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaUserPlus, FaUserXmark } from "react-icons/fa6";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import AddFriendButton from "../Buttons/AddFriendButton";

interface Props {
  users: UserData;
}

const UserListModel = ({ users }: Props) => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { setIsProfile } = useProfileStore();
  const { data: friendshipStatus } = useGetFriendshipStatus(users.userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(users.userId);
  const {
    mutation: acceptRequest,
    isLoading: acceptRequestIsLoading,
    setIsLoading: setAcceptRequestIsLoading,
  } = useAcceptFriendRequest();

  const handleAcceptFriendRequestClick = () => {
    acceptRequest.mutate(users.userId);
    setAcceptRequestIsLoading(true);
  };

  const handleNavigateClick = () => {
    navigate(`/profile/${users.userId}`);
    setIsProfile(true);
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Box display="flex" alignItems="center" mt="15px" cursor="pointer">
      <Avatar
        src={users.profilePicture || pic}
        width="40px"
        height="40px"
        mr="10px"
        onClick={handleNavigateClick}
      />

      <Text
        fontSize="md"
        textTransform="capitalize"
        fontWeight="semibold"
        onClick={handleNavigateClick}
      >
        {users.firstName} {users.lastName}
      </Text>
      <Spacer />
      {users.userId === userId ? (
        <Button onClick={handleNavigateClick}>
          <CgProfile size="20px" />
          {isSmallScreen ? null : <Text ml="5px">My Profile</Text>}
        </Button>
      ) : friendshipStatus?.status === "FRIENDS" ? (
        <Button color="#1877F2">
          <FaFacebookMessenger size="20px" />
          {isSmallScreen ? null : <Text ml="5px">Message</Text>}
        </Button>
      ) : friendRequestStatus?.status === "PENDING" ? (
        <Button
          onClick={handleAcceptFriendRequestClick}
          isLoading={acceptRequestIsLoading}
        >
          <IoPersonAddSharp size="20px" />
          {isSmallScreen ? null : <Text ml="10px">Accept Friend Request</Text>}
        </Button>
      ) : (
        <AddFriendButton
          userId={users.userId}
          friendshipStatus={friendshipStatus?.status}
        >
          {friendshipStatus?.status === "PENDING" ? (
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
      )}
    </Box>
  );
};

export default UserListModel;
