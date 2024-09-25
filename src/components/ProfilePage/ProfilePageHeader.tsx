import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  GridItem,
  Show,
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
  return (
    <Card>
      <Grid
        templateColumns={gridTemplateColumns}
        templateAreas={gridTemplateAreas}
      >
        <GridItem area="header">
          <Box
            width="100%"
            height={{ md: "300px", lg: "400px", xl: "450px" }}
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
            <Box display="flex" justifyContent="end" mb="20px" mr="30px">
              <Button color="black" bg="white" _hover={{ bg: "white" }}>
                <FaCamera size="15px" />
                <Text ml="5px">Add Cover Photo X</Text>
              </Button>
            </Box>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex">
              <Box position="relative" bottom="25px" left="30px">
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
                top="100px"
                right="14px"
                cursor="pointer"
              >
                <FaCamera size="20px" />
              </Box>
              <Box ml="40px" mt="20px">
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
            </Box>
            <Box mt="50px" mr="30px">
              <Button mr="7px" colorScheme="blue">
                <FaPlus size="15px" />
                <Text ml="5px">Add to Story X</Text>
              </Button>
              <Button mr="7px">
                <MdModeEdit size="20px" />
                <Text ml="5px">Edit profile X</Text>
              </Button>
              <Button>
                X
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
