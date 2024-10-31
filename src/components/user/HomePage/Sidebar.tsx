import { Avatar, Box, Text, useColorMode } from "@chakra-ui/react";
import { BiLogoMessenger } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiNewsFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { useUserStore } from "../../../store/user-store";
import { useProfileStore } from "../../../store/profile-store";

const Sidebar = () => {
  const { colorMode } = useColorMode();
  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "gray.700" : "gray.200",
    },
  };
  const { firstName, lastName, profilePicture, userId } = useUserStore();
  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/profile/${userId}`);
    setIsProfile(true);
  };

  return (
    <Box width="300px">
      <Box {...boxStyles} cursor="pointer" onClick={handleNavigateClick}>
        <Avatar src={profilePicture || pic} height="30px" width="30px" />
        <Text ml="10px" textTransform="capitalize">
          {firstName} {lastName}
        </Text>
      </Box>

      <Link to="/friends">
        <Box {...boxStyles}>
          <FaUserFriends size="30px" />
          <Text ml="10px">Friends</Text>
        </Box>
      </Link>
      <Link to="/watch">
        <Box {...boxStyles}>
          <MdOndemandVideo size="30px" />
          <Text ml="10px">Video</Text>
        </Box>
      </Link>
      <Link to="/marketplace">
        <Box {...boxStyles}>
          <IoStorefrontSharp size="30px" />
          <Text ml="10px">Marketplace</Text>
        </Box>
      </Link>
      <Link to="/games">
        <Box {...boxStyles}>
          <IoLogoGameControllerA size="30px" />
          <Text ml="10px">Games</Text>
        </Box>
      </Link>
      <Link to="/home">
        <Box {...boxStyles}>
          <RiNewsFill size="30px" />
          <Text ml="10px">News Feed</Text>
        </Box>
      </Link>
      <Box {...boxStyles} cursor="pointer">
        <BiLogoMessenger size="30px" />
        <Text ml="10px">Messenger</Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
