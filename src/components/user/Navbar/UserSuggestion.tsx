import { Avatar, Flex, Text, useColorMode } from "@chakra-ui/react";
import { UserDataModelList } from "../../../entities/User";
import pic from "../../../assets/profpic.jpeg";
import { useNavigate } from "react-router-dom";
interface Props {
  user: UserDataModelList;
  setShowSuggestions: (value: boolean) => void;
}

const UserSuggestion = ({ user, setShowSuggestions }: Props) => {
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const handleNavigateClick = () => {
    navigate(`/profile/${user.userId}`);
    setShowSuggestions(false);
  };
  return (
    <>
      <Flex
        alignItems="center"
        padding="10px"
        _hover={{
          bg: colorMode === "dark" ? "gray.600" : "gray.200",
        }}
        cursor="pointer"
        onClick={handleNavigateClick}
      >
        <Avatar src={user.profilePicture || pic} height="30px" width="30px" />

        <Text
          ml="10px"
          textTransform="capitalize"
          fontWeight="semibold"
          fontSize={{ base: "sm", md: "md" }}
          isTruncated={true}
        >
          {user.firstName} {user.lastName}
        </Text>
      </Flex>
    </>
  );
};

export default UserSuggestion;
