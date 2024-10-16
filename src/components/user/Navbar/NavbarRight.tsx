import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { BiLogoMessenger } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { IoLogoGameControllerA } from "react-icons/io";
import {
  IoLogOutSharp,
  IoNotificationsCircle,
  IoStorefrontSharp,
} from "react-icons/io5";
import { MdOndemandVideo } from "react-icons/md";
import { RiNewsFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useGetCurrentUserInfo from "../../../hooks/user/useGetCurrentUserInfo";
import { useAuthQueryStore } from "../../../store/auth-store";
import { useUserStore } from "../../../store/user-store";
import ColorModeSwitch from "../../ColorModeSwitch";

const NavbarRight = () => {
  const { resetUser } = useUserStore();
  const { data: getUserInfo } = useGetCurrentUserInfo();
  const queryClient = useQueryClient();
  const { logout } = useAuthQueryStore();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout(navigate);
    queryClient.setQueryData(["user"], null);
    resetUser();
  };
  return (
    <Box display="flex" justifyContent="end" mr="10px" alignItems="center">
      <ColorModeSwitch />
      <Box mr="5px">
        <BiLogoMessenger size="43px" />
      </Box>
      <Box mr="5px">
        <IoNotificationsCircle size="38px" />
      </Box>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<Avatar src={getUserInfo?.profilePicture || pic} size="sm" />}
          variant="none"
        />

        <MenuList>
          <Link to={`/profile/${getUserInfo?.userId}`}>
            <MenuItem paddingBottom={3} paddingTop={3}>
              <Avatar
                src={getUserInfo?.profilePicture || pic}
                size="xs"
                ml="3px"
              />
              <Text ml="12px" textTransform="capitalize">
                {getUserInfo?.firstName} {getUserInfo?.lastName}
              </Text>
            </MenuItem>
          </Link>
          <Link to="/home">
            <MenuItem>
              <RiNewsFill size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  News Feed
                </Text>
                <Text fontSize="xs" ml="10px">
                  See relevant posts from people and Pages you follow.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/friends">
            <MenuItem>
              <FaUserFriends size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Friends
                </Text>
                <Text fontSize="xs" ml="10px">
                  Search for friends or people you may know.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/watch">
            <MenuItem>
              <MdOndemandVideo size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Videos
                </Text>
                <Text fontSize="xs" ml="10px">
                  A video destination personalized to your interests and
                  connections.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/marketplace">
            <MenuItem>
              <IoStorefrontSharp size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Marketplace
                </Text>
                <Text fontSize="xs" ml="10px">
                  Buy and sell in your community.
                </Text>
              </Box>
            </MenuItem>
          </Link>
          <Link to="/games">
            <MenuItem>
              <IoLogoGameControllerA size="30px" />
              <Box flexDirection="row">
                <Text fontSize="sm" ml="10px">
                  Play Games
                </Text>
                <Text fontSize="xs" ml="10px">
                  Play your favorite games.
                </Text>
              </Box>
            </MenuItem>
          </Link>

          <MenuItem onClick={handleLogout}>
            <IoLogOutSharp size="30px" />
            <Text ml="10px">Logout</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NavbarRight;
