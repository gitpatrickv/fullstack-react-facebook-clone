import { Avatar, Box, Button, Spacer, Text } from "@chakra-ui/react";
import { UserData } from "../../../entities/User";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  users: UserData;
}

const UserListModel = ({ users }: Props) => {
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate(`/profile/${users.userId}`);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      mt="15px"
      onClick={handleNavigateClick}
      cursor="pointer"
    >
      <Avatar
        src={
          users.profilePicture ||
          "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
        }
        width="40px"
        height="40px"
        mr="10px"
      />

      <Text fontSize="md" textTransform="capitalize" fontWeight="semibold">
        {users.firstName} {users.lastName}
      </Text>
      <Spacer />
      <Button>
        <FaUserPlus size="20px" /> <Text ml="10px">Add Friend</Text>
      </Button>
    </Box>
  );
};

export default UserListModel;
