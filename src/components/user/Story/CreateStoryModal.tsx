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
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { FaFacebook } from "react-icons/fa6";
import { IoMdImages } from "react-icons/io";
import { IoText } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import useCreateStory from "../../../hooks/user/useCreateStory";
import { useStoryStore } from "../../../store/story-store";
import { useUserStore } from "../../../store/user-store";
import NavbarRight from "../Navbar/NavbarRight";

const CreateStoryModal = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const { profilePicture, firstName, lastName, userId } = useUserStore();
  const { isOpen, onClose } = useStoryStore();
  const { colorMode } = useColorMode();
  const navigate = useNavigate();

  const handleNavigateClick = () => {
    navigate("/home");
    onClose();
  };

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    text,
    setText,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
    isTextStory,
    setIsTextStory,
    isPhotoStory,
    setIsPhotoStory,
  } = useCreateStory(userId ?? 0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const inputTextPhotoRef = useRef<HTMLTextAreaElement | null>(null);

  const resetStoryState = () => {
    setIsTextStory(false);
    setIsPhotoStory(false);
    setImagePreview(null);
    setImageFile(null);
    setText("");
    setValue("file", undefined);
    setValue("text", "");
  };

  const handleModalCloseClick = () => {
    onClose();
    resetStoryState();
  };

  const handleDiscardClick = () => {
    resetStoryState();
  };

  const handleFileInputClick = () => {
    if (isTextStory) {
      setIsTextStory(false);
    }
    fileInputRef.current?.click();
  };

  const handleTextAreaClick = () => {
    setIsTextStory(true);
    inputRef.current?.focus();
  };

  const handlePhotoTextAreaClick = () => {
    setIsPhotoStory(true);
    inputTextPhotoRef.current?.focus();
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setValue("text", e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleModalCloseClick} size="full">
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

              {isTextStory && (
                <Box padding={2}>
                  <Textarea
                    placeholder="Start typing"
                    height="150px"
                    onChange={handleTextChange}
                    ref={inputRef}
                    resize="none"
                  />
                </Box>
              )}
              {imageFile && (
                <Flex
                  alignItems="center"
                  padding="10px"
                  borderRadius="5px"
                  _hover={{
                    bg: colorMode === "dark" ? "#303030" : "gray.200",
                  }}
                  cursor="pointer"
                  userSelect="none"
                  ml="10px"
                  mr="10px"
                  onClick={handlePhotoTextAreaClick}
                >
                  <IconButton
                    aria-label="close"
                    icon={<IoText size="20px" />}
                    bg={colorMode === "dark" ? "#383838" : "gray.100"}
                    _hover={{
                      bg: colorMode === "dark" ? "#383838" : "gray.100",
                    }}
                    isRound
                    size="md"
                  />
                  <Text ml="10px" fontWeight="semibold">
                    Add text
                  </Text>
                </Flex>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <>
                  {(text || imageFile) && (
                    <Flex
                      position="absolute"
                      bottom="20px"
                      left="50%"
                      transform="translateX(-50%)"
                    >
                      <Button mr="10px" onClick={handleDiscardClick}>
                        Discard
                      </Button>
                      <Button
                        bg="#1877F2"
                        _hover={{ bg: "#165BB7" }}
                        type="submit"
                        isLoading={loading}
                      >
                        Share to story
                      </Button>
                    </Flex>
                  )}
                </>
              </form>
            </GridItem>
            <GridItem
              area="section2"
              height="100vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bg={colorMode === "dark" ? "gray.700" : "#F0F0F0"}
            >
              {text || imageFile ? (
                <Card
                  height="90vh"
                  width="60%"
                  bg={colorMode === "dark" ? "#262626" : "white"}
                  padding={4}
                >
                  <Text fontSize="large" fontWeight="bold">
                    Preview
                  </Text>
                  <Card
                    bg="gray.800"
                    height="100%"
                    mt="10px"
                    border="1px solid"
                    borderColor="#404040"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Card
                      bg={
                        imageFile
                          ? "#262626"
                          : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)"
                      }
                      height="90%"
                      width="45%"
                      border="1px solid"
                      borderColor="gray.500"
                      overflow="hidden"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      {isPhotoStory && (
                        <Textarea
                          placeholder="Start typing"
                          border="none"
                          _focus={{ border: "none", boxShadow: "none" }}
                          _hover={{ border: "none" }}
                          resize="none"
                          onChange={handleTextChange}
                          ref={inputTextPhotoRef}
                          fontSize="lg"
                          color="white"
                        />
                      )}
                      {imageFile && <Image src={imagePreview || pic} />}
                      {text && isTextStory && (
                        <Box padding={4}>
                          <Text fontSize="xl" fontWeight="semibold">
                            {text}
                          </Text>
                        </Box>
                      )}
                    </Card>
                  </Card>
                </Card>
              ) : (
                <>
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
                        onClick={handleFileInputClick}
                      />
                      <Text fontWeight="semibold" mt="5px">
                        Create a photo story
                      </Text>
                      <input
                        type="file"
                        accept=".jpeg, .png"
                        {...register("file")}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
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
                        onClick={handleTextAreaClick}
                      />
                      <Text fontWeight="semibold" mt="5px">
                        Create a text story
                      </Text>
                    </Box>
                  </Card>
                </>
              )}
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateStoryModal;
