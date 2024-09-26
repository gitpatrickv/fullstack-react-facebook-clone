import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  GridItem,
  Image,
  Show,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCamera, FaChevronDown, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import useUploadUserImage from "../../hooks/user/useUploadUserImage";
import { useAuthQueryStore } from "../../store/auth-store";
import { useUserStore } from "../../store/user-store";
const ProfilePageHeader = () => {
  const { colorMode } = useColorMode();
  const { firstName, lastName, profilePicture, coverPhoto } = useUserStore();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [imageType, setImageType] = useState<string>("");
  const uploadPhoto = useUploadUserImage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = (image: string) => {
    fileInputRef.current?.click();
    setImageType(image);
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadPhoto.mutate({
        file: file,
        jwtToken: jwtToken,
        imageType: imageType,
      });
    }
  };

  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    xl: "0.2fr 1fr 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"header"`,
    xl: `"asideLeft header asideRight"`,
  });

  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  return (
    <Card>
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
      >
        <GridItem area="header">
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
            {coverPhoto && (
              <Image
                src={coverPhoto}
                width="100%"
                height="450px"
                objectFit="cover"
                borderBottomLeftRadius="10px"
                borderBottomRightRadius="10px"
              />
            )}
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
                onClick={() => handleInputClick("COVER_PHOTO")}
              >
                <FaCamera size={isSmallScreen ? "20px" : "15px"} />
                {isSmallScreen ? (
                  ""
                ) : (
                  <Text ml="5px">
                    {coverPhoto ? "Edit Cover Photo" : "Add Cover Photo"}
                  </Text>
                )}
              </Button>
              <input
                type="file"
                accept=".jpeg, .png"
                ref={fileInputRef}
                onChange={handleUploadImage}
                style={{ display: "none" }}
              />
            </Box>
          </Box>

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
              >
                <Avatar
                  src={
                    profilePicture ||
                    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                  }
                  borderWidth="6px"
                  borderColor={colorMode === "dark" ? "gray.700" : "white"}
                  width="180px"
                  height="180px"
                />
              </Box>
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
                onClick={() => handleInputClick("PROFILE_PICTURE")}
              >
                <FaCamera size="20px" />
              </Box>
              <input
                type="file"
                accept=".jpeg, .png"
                ref={fileInputRef}
                onChange={handleUploadImage}
                style={{ display: "none" }}
              />
            </Box>

            <Box
              ml={{ base: "0px", lg: "10px" }}
              mt={{ base: "0px", lg: "20px" }}
              textAlign={{ base: "center", lg: "start" }}
              position={{ base: "relative", lg: "static" }}
              bottom={{ base: "80px", lg: "0" }}
            >
              <Text
                fontSize="xx-large"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {firstName} {lastName}
              </Text>
              <Text
                fontSize="md"
                color="gray.500"
                fontWeight="semibold"
                mb="10px"
              >
                X friends and avatar
              </Text>
              <Avatar
                src="https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
                size="sm"
              />
            </Box>
            <Spacer />
            <Box
              mt={{ md: "20px", lg: "95px" }}
              mr={{ base: "0px", lg: "30px" }}
              textAlign={{ base: "center", lg: "start" }}
              position={{ base: "relative", lg: "static" }}
              bottom={{ base: "50px", md: "70px", lg: "0" }}
            >
              <Button
                mr="7px"
                colorScheme="blue"
                ml={{ base: "10px", md: "0px" }}
              >
                <FaPlus size="15px" />
                <Text ml="5px">Add to Story</Text>
              </Button>
              <Button mr="7px">
                <MdModeEdit size="20px" />
                <Text ml="5px">Edit profile</Text>
              </Button>
              <Button
                width={{ base: "80%", md: "0" }}
                mt={{ base: "10px", md: "0px" }}
              >
                <FaChevronDown />
              </Button>
            </Box>
          </Box>
          <Divider position="relative" bottom="15px" />
          <Box position="relative" bottom="7px">
            <Button bg="none" height="50px">
              POSTS
            </Button>
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
