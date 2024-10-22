import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Show,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaCamera,
  FaFacebookMessenger,
  FaPlus,
  FaUserCheck,
  FaUserPlus,
} from "react-icons/fa";
import { FaUserXmark } from "react-icons/fa6";
import { IoTrashOutline } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import useAddToFriend from "../../../hooks/user/useAddToFriend";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import useFetchAllUserFriends from "../../../hooks/user/useFetchAllUserFriends";
import useGetFriendRequestStatus from "../../../hooks/user/useGetFriendRequestStatus";
import useGetFriendshipStatus from "../../../hooks/user/useGetFriendshipStatus";
import useGetUserFriendListCount from "../../../hooks/user/useGetUserFriendListCount";
import useGetUserProfileInfo from "../../../hooks/user/useGetUserProfileInfo";
import useUnfriend from "../../../hooks/user/useUnfriend";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";
import ProfilePageHeaderSkeleton from "./ProfilePageHeaderSkeleton";
import ProfileTabList from "./ProfileTabList";
import UploadUserImageModal from "./UploadUserImageModal";

const ProfilePageHeader = () => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { userId: currentUserId } = useUserStore();
  const { data: getUserProfile, isLoading } = useGetUserProfileInfo(userId);
  const { colorMode } = useColorMode();
  const [imageType, setImageType] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: friendshipStatus } = useGetFriendshipStatus(userId);
  const { data: friendRequestStatus } = useGetFriendRequestStatus(userId);
  const {
    mutation,
    isLoading: addFriendIsLoading,
    setIsLoading: setAddFriendIsLoading,
  } = useAddToFriend();
  const {
    mutation: unfriend,
    isLoading: deleteIsLoading,
    setIsLoading: setDeleteIsLoading,
  } = useUnfriend(currentUserId ?? 0);

  const handleAddFriendClick = () => {
    mutation.mutate(userId);
    setAddFriendIsLoading(true);
  };

  const handleUnfriendClick = () => {
    unfriend.mutate(userId);
    setDeleteIsLoading(true);
  };

  const {
    mutation: acceptRequest,
    isLoading: acceptRequestIsLoading,
    setIsLoading: setAcceptRequestIsLoading,
  } = useAcceptFriendRequest();

  const handleAcceptFriendRequestClick = () => {
    acceptRequest.mutate(userId);
    setAcceptRequestIsLoading(true);
  };

  const {
    mutation: deleteRequest,
    isLoading: deleteRequestIsLoading,
    setIsLoading: setDeleteRequestIsLoading,
  } = useDeleteFriendRequest(currentUserId ?? 0);

  const handleDeleteFriendRequestClick = () => {
    deleteRequest.mutate(userId);
    setDeleteRequestIsLoading(true);
  };

  const handleOpenModalClick = (image: string) => {
    setImageType(image);
    onOpen();
  };

  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isMobileScreen = useBreakpointValue({ base: true, md: false });

  const { data: fetchAllFriends } = useFetchAllUserFriends({
    userId: userId,
    pageSize: 10,
  });

  const { data: getFriendListCount } = useGetUserFriendListCount(userId);

  const { setIsProfile } = useProfileStore();
  const navigate = useNavigate();
  const handleNavigateProfileClick = (userId: number) => {
    navigate(`/profile/${userId}`);
    setIsProfile(true);
  };

  return (
    <Card>
      <UploadUserImageModal
        isOpen={isOpen}
        onClose={onClose}
        imageType={imageType}
      />
      <Grid
        templateColumns={{ base: "1fr", xl: "0.2fr 1fr 0.2fr" }}
        templateAreas={{
          base: `"header"`,
          xl: `"asideLeft header asideRight"`,
        }}
      >
        <GridItem area="header">
          {isLoading ? (
            <ProfilePageHeaderSkeleton />
          ) : (
            <Box
              width="100%"
              height={{ base: "250px", md: "330px", lg: "400px", xl: "450px" }}
              bg={colorMode === "dark" ? "#181818" : "gray.100"}
              _hover={{ bg: colorMode === "dark" ? "#282828" : "gray.200" }}
              borderBottomLeftRadius="10px"
              borderBottomRightRadius="10px"
              display="flex"
              flexDirection="column"
              justifyContent="flex-end"
              position="relative"
            >
              {getUserProfile?.coverPhoto && (
                <Image
                  src={getUserProfile.coverPhoto}
                  width="100%"
                  height="450px"
                  objectFit="cover"
                  borderBottomLeftRadius="10px"
                  borderBottomRightRadius="10px"
                />
              )}
              {currentUserId === userId && (
                <Box
                  display="flex"
                  justifyContent="end"
                  mb="20px"
                  mr={{ base: "10px", md: "30px" }}
                  position="absolute"
                  right="0"
                >
                  <Button
                    color="black"
                    bg="white"
                    _hover={{ bg: "white" }}
                    onClick={() => handleOpenModalClick("COVER_PHOTO")}
                  >
                    <FaCamera size={isSmallScreen ? "20px" : "15px"} />
                    {isSmallScreen ? (
                      ""
                    ) : (
                      <Text ml="5px">
                        {getUserProfile?.coverPhoto
                          ? "Edit Cover Photo"
                          : "Add Cover Photo"}
                      </Text>
                    )}
                  </Button>
                </Box>
              )}
            </Box>
          )}

          <Box
            display="flex"
            alignItems={{ base: "center", lg: "flex-start" }}
            flexDirection={isSmallScreen ? "column" : "row"}
          >
            <Box display="flex">
              <Box
                position="relative"
                bottom={{ base: "100px", lg: "25px" }}
                left={{ base: "20px", md: "30px" }}
                mr={currentUserId === userId ? "0px" : "36px"}
              >
                {isLoading ? (
                  <SkeletonCircle
                    width="180px"
                    height="180px"
                    borderWidth="6px"
                    borderColor={colorMode === "dark" ? "gray.700" : "white"}
                  />
                ) : (
                  <Avatar
                    src={getUserProfile?.profilePicture || pic}
                    borderWidth="6px"
                    borderColor={colorMode === "dark" ? "gray.700" : "white"}
                    width="180px"
                    height="180px"
                  />
                )}
              </Box>
              {currentUserId === userId && (
                <>
                  <Box
                    height="36px"
                    width="36px"
                    bg={colorMode === "dark" ? "gray.600" : "gray.200"}
                    borderRadius="full"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    top={{ base: "15px", md: "25px", lg: "100px" }}
                    right="14px"
                    cursor="pointer"
                    onClick={() => handleOpenModalClick("PROFILE_PICTURE")}
                  >
                    <FaCamera size="20px" />
                  </Box>
                </>
              )}
            </Box>

            <Box
              ml={{
                base: "0px",
                lg: "10px",
              }}
              mt={{ base: "0px", lg: "20px" }}
              textAlign={{ base: "center", lg: "start" }}
              position={{ base: "relative", lg: "static" }}
              bottom={{ base: "80px", lg: "0" }}
            >
              {isLoading ? (
                <SkeletonText />
              ) : (
                <Text
                  fontSize="xx-large"
                  fontWeight="bold"
                  textTransform="capitalize"
                >
                  {getUserProfile?.firstName} {getUserProfile?.lastName}
                </Text>
              )}

              {getFriendListCount && (
                <Text fontSize="md" fontWeight="semibold" mb="5px">
                  {getFriendListCount.count}{" "}
                  <Text as="span">
                    {getFriendListCount.count > 1 ? "friends" : "friend"}
                  </Text>
                </Text>
              )}
              {fetchAllFriends?.pages.map((page, pageIndex) =>
                pageIndex === 0
                  ? page.userList.map((list, index) => (
                      <Avatar
                        key={list.uniqueId}
                        src={list.profilePicture || pic}
                        height="40px"
                        width="40px"
                        ml={index === 0 ? 0 : "-10px"}
                        zIndex={page.userList.length - index}
                        borderWidth="2px"
                        borderColor={
                          colorMode === "dark" ? "gray.700" : "white"
                        }
                        onClick={() => handleNavigateProfileClick(list.userId)}
                        cursor="pointer"
                      />
                    ))
                  : null
              )}
            </Box>
            <Spacer />
            <Box
              mt={{ md: "20px", lg: "95px" }}
              mr={{ base: "0px", lg: "30px" }}
              textAlign={{ base: "center", lg: "start" }}
              position={{ base: "relative", lg: "static" }}
              bottom={{ base: "50px", md: "70px", lg: "0" }}
            >
              {isLoading ? (
                <>
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                  <Skeleton height="40px" />
                </>
              ) : (
                <>
                  {currentUserId === userId ? (
                    <>
                      <Button
                        mr="7px"
                        bg="#1877F2"
                        _hover={{ bg: "#165BB7" }}
                        ml={{ base: "10px", md: "0px" }}
                      >
                        <FaPlus size="15px" />
                        <Text ml="5px">Add to Story</Text>
                      </Button>
                      <Button mr="7px">
                        <MdModeEdit size="20px" />
                        <Text ml="5px">Edit profile</Text>
                      </Button>
                    </>
                  ) : (
                    <>
                      {friendshipStatus &&
                      friendshipStatus?.status === "FRIENDS" ? (
                        <Menu>
                          <MenuButton
                            as={Button}
                            mr="7px"
                            isLoading={deleteIsLoading}
                          >
                            <Box display="flex">
                              <FaUserCheck size="20px" />
                              <Text ml="10px">Friends</Text>
                            </Box>
                          </MenuButton>

                          <MenuList>
                            <MenuItem onClick={handleUnfriendClick}>
                              <FaUserXmark size="20px" />
                              <Text ml="10px">Unfriend</Text>
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      ) : friendRequestStatus &&
                        friendRequestStatus?.status === "PENDING" ? (
                        <>
                          <Button
                            mr="7px"
                            onClick={handleAcceptFriendRequestClick}
                            isLoading={acceptRequestIsLoading}
                          >
                            <FaUserPlus size="20px" />
                            <Text ml="10px">Respond</Text>
                          </Button>
                        </>
                      ) : (
                        <Button
                          mr="7px"
                          onClick={handleAddFriendClick}
                          isLoading={addFriendIsLoading}
                        >
                          {friendshipStatus &&
                          friendshipStatus?.status === "PENDING" ? (
                            <>
                              <FaUserXmark size="20px" />
                              <Text ml="10px">Cancel request</Text>
                            </>
                          ) : (
                            <>
                              <FaUserPlus size="20px" />
                              <Text ml="10px">Add friend</Text>
                            </>
                          )}
                        </Button>
                      )}

                      <Button mr="7px" bg="#1877F2" _hover={{ bg: "#165BB7" }}>
                        <FaFacebookMessenger size="20px" />
                        <Text ml="5px">Message</Text>
                      </Button>
                    </>
                  )}
                  {/* <Button
                    width={{ base: "80%", md: "0" }}
                    mt={{ base: "10px", md: "0px" }}
                  >
                    <FaChevronDown />
                  </Button> */}
                </>
              )}
            </Box>
          </Box>
          {friendRequestStatus && friendRequestStatus?.status === "PENDING" && (
            <Card
              width="100%"
              padding={{ base: 2, md: 3 }}
              position="relative"
              bottom="25px"
              bg={colorMode === "dark" ? "gray.800" : "gray.100"}
            >
              <Box display="flex" alignItems="center">
                <Text
                  fontSize={{ base: "xs", md: "lg" }}
                  textTransform="capitalize"
                  mr="5px"
                >
                  {getUserProfile?.firstName}
                </Text>
                <Text fontSize={{ base: "xs", md: "lg" }} whiteSpace="nowrap">
                  sent you a friend request
                </Text>
                <Spacer />
                <Button
                  mr="7px"
                  bg="#1877F2"
                  _hover={{ bg: "#165BB7" }}
                  onClick={handleAcceptFriendRequestClick}
                  isLoading={acceptRequestIsLoading}
                >
                  <FaUserPlus size="20px" />
                  {isMobileScreen ? null : (
                    <Text ml="10px">Confirm Request</Text>
                  )}
                </Button>
                <Button
                  onClick={handleDeleteFriendRequestClick}
                  isLoading={deleteRequestIsLoading}
                >
                  <IoTrashOutline size="20px" />{" "}
                  {isMobileScreen ? null : (
                    <Text ml="10px">Delete Request</Text>
                  )}
                </Button>
              </Box>
            </Card>
          )}
          <Divider />
          <Box>
            <ProfileTabList />
          </Box>
        </GridItem>
        <Show above="xl">
          <GridItem area="asideLeft" />
        </Show>
        <Show above="xl">
          <GridItem area="asideRight" />
        </Show>
      </Grid>
    </Card>
  );
};

export default ProfilePageHeader;
