import { Avatar, Box, Textarea, useColorMode } from "@chakra-ui/react";
import { CiCamera } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
const WriteComment = () => {
  const { colorMode } = useColorMode();
  return (
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
            placeholder="Write a comment..."
            border="none"
            _focus={{ border: "none", boxShadow: "none" }}
            _hover={{ border: "none" }}
            resize="none"
          />
          <Box padding={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box cursor="pointer">
                <CiCamera size="20px" />
              </Box>
              <Box cursor="pointer">
                <IoMdSend size="20px" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WriteComment;
