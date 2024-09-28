import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";
import { IoMdImages, IoMdPhotos } from "react-icons/io";
import { Link } from "react-router-dom";
import useCreatePost from "../../../hooks/user/useCreatePost";
import { useUserStore } from "../../../store/user-store";

const CreatePost = () => {
  const {
    onSubmit,
    register,
    handleSubmit,
    loading,
    isOpen,
    onOpen,
    onClose,
    post,
    setPost,
    imageFile,
    setImageFile,
  } = useCreatePost();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const { firstName, lastName, profilePicture } = useUserStore();
  const handlePostInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setImageFile(files ? files : null);
  };

  return (
    <>
      <Card padding={2}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={
              profilePicture ||
              "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
            }
            size="sm"
            mr="10px"
          />
          <Input
            borderRadius={20}
            placeholder={`What's on your mind, ${firstName}?`}
            variant="filled"
            textAlign="left"
            fontSize={["sm", "md", "lg"]}
            width="100%"
            value={post}
            onChange={handlePostInputChange}
            onClick={onOpen}
            cursor="pointer"
          />
        </Box>
        <Divider mt="10px" mb="10px" color="gray.500" />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={onOpen}
          cursor="pointer"
        >
          <IoMdPhotos size="30px" color="green" />
          <Text ml="5px">Photo / Video</Text>
        </Box>
      </Card>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Create Post</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <Box padding={4}>
              <Box display="flex" alignItems="center" mb="10px">
                <Link to="/profile">
                  <Avatar
                    src={
                      profilePicture ||
                      "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/no-profile-picture-icon.png"
                    }
                    height="30px"
                    width="30px"
                  />
                </Link>
                <Text ml="10px" textTransform="capitalize">
                  {firstName} {lastName}
                </Text>
              </Box>
              <FormControl>
                <Textarea
                  {...register("content")}
                  // ref={initialRef}
                  placeholder={`What's on your mind, ${firstName}?`}
                  onClick={onOpen}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  _hover={{ border: "none" }}
                  resize="none"
                  onChange={handlePostInputChange}
                />
              </FormControl>
              <Text whiteSpace="nowrap" fontSize="sm">
                Add Photo/Video
              </Text>
              <Box display="flex">
                <Box color="green.500" mr="10px">
                  <IoMdImages size="30px" />
                </Box>
                <input
                  type="file"
                  accept=".jpeg, .png"
                  multiple
                  {...register("file")}
                  onChange={handleFileChange}
                />
              </Box>

              <Button
                type="submit"
                bg="blue.500"
                width="100%"
                _hover={{ bg: "blue.400" }}
                _active={{ bg: "blue.600" }}
                mt="20px"
                isDisabled={post || imageFile ? false : true}
              >
                Post
              </Button>
            </Box>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
