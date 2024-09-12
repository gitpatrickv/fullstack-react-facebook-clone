import { Avatar, Box, Text } from "@chakra-ui/react";
import { BiLogoMessenger } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import { IoStorefrontSharp } from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiNewsFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const boxStyles = {
    display: "flex",
    alignItems: "center",
    _hover: {
      color: "blue.500",
    },
  };

  return (
    <Box mt="5px">
      {/* <Link to="/profile"> */}
      <Box {...boxStyles} cursor="pointer">
        <Avatar
          src={
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="xs"
          ml="3px"
        />
        <Text ml="13px">Patrick V.</Text>
      </Box>
      {/* </Link> */}
      <Link to="/friends">
        <Box {...boxStyles} mt="15px">
          <FaUserFriends size="30px" />
          <Text ml="10px">Friends</Text>
        </Box>
      </Link>
      <Link to="/watch">
        <Box {...boxStyles} mt="15px">
          <MdOndemandVideo size="30px" />
          <Text ml="10px">Video</Text>
        </Box>
      </Link>
      <Link to="/marketplace">
        <Box {...boxStyles} mt="15px">
          <IoStorefrontSharp size="30px" />
          <Text ml="10px">Marketplace</Text>
        </Box>
      </Link>
      <Link to="/games">
        <Box {...boxStyles} mt="15px">
          <IoLogoGameControllerA size="30px" />
          <Text ml="10px">Games</Text>
        </Box>
      </Link>
      <Link to="/home">
        <Box {...boxStyles} mt="15px">
          <RiNewsFill size="30px" />
          <Text ml="10px">News Feed</Text>
        </Box>
      </Link>
      <Box {...boxStyles} cursor="pointer" mt="15px">
        <BiLogoMessenger size="30px" />
        <Text ml="10px">Messenger</Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
