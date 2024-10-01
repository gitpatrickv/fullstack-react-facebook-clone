import {
  Avatar,
  Box,
  IconButton,
  Image,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, ChangeEvent, RefObject } from "react";
import { SubmitHandler, UseFormRegister } from "react-hook-form";
import { CiCamera } from "react-icons/ci";
import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
import { WriteCommentProps } from "../../../hooks/user/useWritePostComment";
import { useUserStore } from "../../../store/user-store";

interface PostProps {
  isOpen: boolean;
  focusRef: RefObject<HTMLInputElement>;
  register: UseFormRegister<WriteCommentProps>;
  onSubmit: SubmitHandler<WriteCommentProps>;
  loading: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  comment: string;
  imageFile: File | null;
  handleInputClick: () => void;
  handleCommentChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    onSubmit: SubmitHandler<WriteCommentProps>
  ) => (event?: BaseSyntheticEvent) => Promise<void>;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
  removeImageClick: () => void;
}

const WriteComment = ({
  isOpen,
  focusRef,
  register,
  onSubmit,
  loading,
  comment,
  imageFile,
  handleInputClick,
  handleCommentChange,
  handleSubmit,
  fileInputRef,
  handleFileChange,
  imagePreview,
  removeImageClick,
}: PostProps) => {
  const { colorMode } = useColorMode();
  const { profilePicture } = useUserStore();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          padding={isOpen ? 3 : 0}
          ml={isOpen ? "10px" : "0"}
          bg={colorMode === "dark" ? "gray.700" : "white"}
          mt={isOpen ? "0" : "10px"}
        >
          <Box display="flex">
            <Avatar
              src={
                profilePicture ||
                "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
              }
              size="sm"
              mr="10px"
            />
            <Box
              width="100%"
              border="1px solid"
              borderRadius="20px"
              borderColor="gray.500"
            >
              <Input
                {...register("comment")}
                value={comment}
                ref={focusRef}
                placeholder="Write a comment..."
                border="none"
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ border: "none" }}
                onChange={handleCommentChange}
              />

              <Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  ml="15px"
                >
                  <Box cursor="pointer" onClick={handleInputClick}>
                    <CiCamera size="20px" />
                  </Box>
                  <input
                    type="file"
                    accept=".jpeg, .png"
                    {...register("file")}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <IconButton
                    aria-label="show"
                    icon={<IoMdSend size="20px" />}
                    bg="transparent"
                    _hover={{ bg: "transparent", color: "blue.500" }}
                    type="submit"
                    isDisabled={comment || imageFile ? false : true}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
          {imagePreview && (
            <Box mt="10px" ml="40px" display="flex">
              <Image
                src={imagePreview}
                width={{ base: "40%", md: "30%" }}
                height="auto"
              />
              <Box onClick={removeImageClick} ml="5px" cursor="pointer">
                <IoMdCloseCircle size="20px" />
              </Box>
            </Box>
          )}
        </Box>
      </form>
    </>
  );
};

export default WriteComment;
