import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Show,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaCamera, FaChevronDown, FaPlus } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
const ProfilePageHeader = () => {
  const { colorMode } = useColorMode();
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
            cursor="pointer"
            borderBottomLeftRadius="10px"
            borderBottomRightRadius="10px"
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
          >
            {/* <Image
              src="https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg"
              width="100%"
              height="450px"
              objectFit="cover"
              borderBottomLeftRadius="10px"
              borderBottomRightRadius="10px"
            /> */}
            <Box
              display="flex"
              justifyContent="end"
              mb="20px"
              mr={{ base: "10px", md: "30px" }}
            >
              <Button color="black" bg="white" _hover={{ bg: "white" }}>
                <FaCamera size={isSmallScreen ? "20px" : "15px"} />
                {isSmallScreen ? "" : <Text ml="5px">Add Cover Photo X</Text>}
              </Button>
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
                  src="https://img.freepik.com/premium-photo/cooltrendy-funky-boy-cartoon-character-with-retro-style-design_960782-109604.jpg"
                  borderWidth="6px"
                  borderColor={colorMode === "dark" ? "gray.700" : "white"}
                  width="180px"
                  height="180px"
                  cursor="pointer"
                />
              </Box>
              <Box
                height="36px"
                width="36px"
                bg="gray.600"
                borderRadius="full"
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
                top={{ base: "15px", md: "25px", lg: "100px" }}
                right="14px"
                cursor="pointer"
              >
                <FaCamera size="20px" />
              </Box>
            </Box>

            <Box
              ml={{ base: "0px", lg: "10px" }}
              mt={{ base: "0px", lg: "20px" }}
              textAlign={{ base: "center", lg: "start" }}
              position={{ base: "relative", lg: "static" }}
              bottom="90px"
            >
              <Text fontSize="xx-large" fontWeight="bold">
                X-NAME HERE
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
              bottom={{ base: "70px", md: "90px", lg: "none" }}
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
