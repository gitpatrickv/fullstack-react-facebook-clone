import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";
import NavbarRight from "../Navbar/NavbarRight";

const CreateStoryModal = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const { profilePicture, firstName, lastName } = useUserStore();
  const { isOpen, onClose } = useStoryStore();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate("/home");
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <Grid
            templateColumns={{
              base: "1fr",
              lg: "0.3fr 0.7fr",
              xl: "0.2fr 0.8fr",
            }}
            templateAreas={{
              base: `"section1"
            "section2"
            `,
              lg: `"section1 section2"`,
              xl: `"section1 section2"`,
            }}
          >
            <GridItem
              area="section1"
              bg={colorMode === "dark" ? "#262626" : "white"}
              height="100vh"
              position="relative"
            >
              <Box mb="70px">
                <ModalCloseButton
                  position="absolute"
                  left="5px"
                  size="lg"
                  borderRadius="full"
                  bg="gray.800"
                  color="white"
                  _hover={{ bg: "gray.700" }}
                />

                <Box
                  position="absolute"
                  top="2"
                  left="50px"
                  color="#1877F2"
                  onClick={handleNavigateClick}
                  cursor="pointer"
                >
                  <FaFacebook size="40px" />
                </Box>

                {isSmallScreen && (
                  <Box padding={2}>
                    <NavbarRight />
                  </Box>
                )}
              </Box>

              <Text fontSize="x-large" ml="10px" fontWeight="bold">
                Your story
              </Text>
              <Flex alignItems="center" mt="20px">
                <Avatar src={profilePicture || pic} size="lg" ml="10px" />
                <Text
                  textTransform="capitalize"
                  fontSize="xl"
                  fontWeight="semibold"
                  ml="10px"
                >
                  {firstName} {lastName}
                </Text>
              </Flex>
              <Divider mt="20px" mb="20px" />
              <Box padding={2}>
                <Textarea placeholder="Start typing" height="150px" />
              </Box>
              <Flex
                position="absolute"
                bottom="20px"
                left="50%"
                transform="translateX(-50%)"
              >
                <Button mr="10px">Discard</Button>
                <Button bg="#1877F2" _hover={{ bg: "#165BB7" }}>
                  Share to story
                </Button>
              </Flex>
            </GridItem>
            <GridItem
              area="section2"
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg={colorMode === "dark" ? "gray.700" : "#F0F0F0"}
            >
              <Card
                height="330px"
                width="220px"
                bgGradient="linear(to-t, #30cfd0 0%, #330867 100%)"
                justifyContent="center"
                _hover={{ filter: "brightness(1.1)" }}
              >
                <Box textAlign="center">
                  <IconButton
                    aria-label="image"
                    icon={<IoMdImages size="20px" />}
                    bg={colorMode === "dark" ? "#303030" : "gray.100"}
                    _hover={{
                      bg: colorMode === "dark" ? "#383838" : "gray.200",
                    }}
                    isRound
                    size="md"
                  />
                  <Text fontWeight="semibold" mt="5px">
                    Create a photo story
                  </Text>
                </Box>
              </Card>
              <Card
                height="330px"
                width="220px"
                bgGradient="linear(to-tr, #f093fb 0%, #f5576c 100%)"
                ml="20px"
                justifyContent="center"
                _hover={{ filter: "brightness(1.1)" }}
              >
                <Box textAlign="center">
                  <IconButton
                    aria-label="image"
                    icon={<IoText size="20px" />}
                    bg={colorMode === "dark" ? "#303030" : "gray.100"}
                    _hover={{
                      bg: colorMode === "dark" ? "#383838" : "gray.200",
                    }}
                    isRound
                    size="md"
                  />
                  <Text fontWeight="semibold" mt="5px">
                    Create a text story
                  </Text>
                </Box>
              </Card>
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateStoryModal;
