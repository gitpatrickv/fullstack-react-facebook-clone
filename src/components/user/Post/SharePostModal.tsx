import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../../../entities/Post";
import { useUserStore } from "../../../store/user-store";
import useSharePost from "../../../hooks/user/useSharePost";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post;
}

const SharePostModal = ({ isOpen, onClose, posts }: ShareModalProps) => {
  const { firstName, lastName, profilePicture } = useUserStore();
  const initialRef = useRef<HTMLTextAreaElement | null>(null);
  const finalRef = useRef<HTMLTextAreaElement | null>(null);
  const {
    register,
    loading,
    handleSubmit,
    onSubmit,
    setValue,
    isSuccessful,
    setIsSuccessful,
  } = useSharePost(posts.postId);
  const [content, setContent] = useState("");

  const handleShareInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
    setValue("content", e.target.value);
  };

  useEffect(() => {
    if (isSuccessful) {
      onClose();
      setIsSuccessful(false);
      setValue("content", "");
      setContent("");
    }
  }, [isSuccessful]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Share</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <Box>
              <Box display="flex" alignItems="center" padding={3}>
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
                  ref={initialRef}
                  value={content}
                  placeholder={`Say something about this`}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  _hover={{ border: "none" }}
                  resize="none"
                  onChange={handleShareInputChange}
                />
              </FormControl>
              <Divider />
              <ModalFooter>
                <Button
                  type="submit"
                  bg="blue.500"
                  width="120px"
                  _hover={{ bg: "blue.400" }}
                  _active={{ bg: "blue.600" }}
                  isLoading={loading}
                >
                  Share now
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SharePostModal;
