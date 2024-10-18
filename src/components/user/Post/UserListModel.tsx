import { Avatar, Box, Button, Spacer, Text } from "@chakra-ui/react";
import { UserData } from "../../../entities/User";
import { FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { useProfileStore } from "../../../store/profile-store";

interface Props {
  users: UserData;
}

const UserListModel = ({ users }: Props) => {
  const navigate = useNavigate();
  const { setIsProfile } = useProfileStore();
  const handleNavigateClick = () => {
    navigate(`/profile/${users.userId}`);
    setIsProfile(true);
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
        src={users.profilePicture || pic}
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
