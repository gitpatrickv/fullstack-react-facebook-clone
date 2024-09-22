import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useRef } from "react";
import { IoMdImages, IoMdPhotos } from "react-icons/io";
import useCreatePost from "../../../hooks/user/useCreatePost";

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
  } = useCreatePost();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const handlePostInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost(e.target.value);
  };

  return (
    <>
      <Card padding={2}>
        <Box display="flex" alignItems="center">
          <Avatar
            src={
              "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
            }
            size="sm"
            mr="10px"
          />
          <Input
            borderRadius={20}
            placeholder="What's on your mind, Patrick?"
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
            <Divider mb="10px" />
            <ModalBody pb={6}>
              <FormControl>
                <Textarea
                  {...register("content")}
                  // ref={initialRef}
                  placeholder="What's on your mind, Trek?"
                  fontSize={["sm", "md", "lg"]}
                  width="100%"
                  onClick={onOpen}
                  cursor="pointer"
                  border="none"
                  _active={{ border: "none" }}
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
                />
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                bg="blue.500"
                width="100%"
                _hover={{ bg: "blue.400" }}
                _active={{ bg: "blue.600" }}
              >
                Post
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;
