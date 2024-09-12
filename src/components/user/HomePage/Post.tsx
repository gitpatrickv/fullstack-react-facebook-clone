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
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoMdImages, IoMdPhotos } from "react-icons/io";

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [post, setPost] = useState<string>("");

  const handlePostInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost(e.target.value);
  };

  return (
    <>
      <Card padding={2} maxWidth={{ base: "100%", lg: "95%" }}>
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
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Create Post</ModalHeader>
          <ModalCloseButton />
          <Divider mb="10px" />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                ref={initialRef}
                placeholder="What's on your mind, Trek?"
                fontSize={["sm", "md", "lg"]}
                width="100%"
                // w={{ base: "50%" }}
                onClick={onOpen}
                value={post}
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
                // {...register("file", {
                //   required: true,
                // })}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit" bg="blue.500">
              Post
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
{
  /* <Box
            width="100%"
            border="1px solid"
            height="40px"
            borderRadius="30px"
            borderColor="gray.500"
            userSelect="none"
            onClick={onOpen}
            cursor="pointer"
            _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.100" }}
          >
            <Text textAlign="start" ml="10px" mt="7px" color="gray.500">
              What's on your mind, Patrick?
            </Text>
          </Box> */
}
