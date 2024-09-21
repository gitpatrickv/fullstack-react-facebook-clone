import { Avatar, Box, Card, Text, useColorMode } from "@chakra-ui/react";

const Comments = () => {
  const { colorMode } = useColorMode();
  const textStyles = {
    fontSize: "sm",
    cursor: "pointer",
    _hover: { textDecoration: "underline" },
  };

  return (
    <Box mt="10px">
      <Box display="flex">
        <Avatar
          src={
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
          mr="5px"
        />
        <Card
          bg={colorMode === "dark" ? "gray.600" : "gray.100"}
          borderRadius="20px"
          padding="6px 12px 6px 12px"
        >
          <Text fontSize="sm" fontWeight="semibold">
            Unknown Username Here
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            in totam animi perferendis suscipit aperiam. Sequi illum laborum
            atque quas aut sapiente tempore sed, temporibus culpa pariatur
            deserunt impedit enim.
          </Text>
        </Card>
      </Box>
      <Box display="flex" ml="50px">
        <Text mr="20px" {...textStyles}>
          1d
        </Text>
        <Text mr="20px" {...textStyles}>
          Like
        </Text>
        <Text {...textStyles}>Reply</Text>
      </Box>
    </Box>
  );
};

export default Comments;
