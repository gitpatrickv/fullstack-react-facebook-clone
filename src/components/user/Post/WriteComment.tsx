import {
  Avatar,
  Box,
  IconButton,
  Textarea,
  useColorMode,
} from "@chakra-ui/react";
import { useRef } from "react";
import { CiCamera } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import useWritePostComment from "../../../hooks/user/useWritePostComment";
import { PostProps } from "./Posts";

const WriteComment = ({ posts }: PostProps) => {
  const { colorMode } = useColorMode();
  const { register, handleSubmit, onSubmit, loading, setValue } =
    useWritePostComment(posts.postId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setValue("file", e.target.files);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          padding={3}
          position="sticky"
          bottom="0"
          zIndex={10}
          ml="10px"
          mr="10px"
          bg={colorMode === "dark" ? "gray.700" : "white"}
        >
          <Box display="flex">
            <Avatar
              src={
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
              <Textarea
                {...register("comment")}
                placeholder="Write a comment..."
                border="none"
                _focus={{ border: "none", boxShadow: "none" }}
                _hover={{ border: "none" }}
                resize="none"
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
                    _hover={{ bg: "transparent" }}
                    type="submit"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default WriteComment;
