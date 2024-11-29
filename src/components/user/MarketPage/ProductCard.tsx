import { Box, Image, Text } from "@chakra-ui/react";
const ProductCard = () => {
  return (
    <Box overflow="hidden" mt="20px">
      <Image
        src={
          "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        }
        width="100%"
        height="100%"
        objectFit="cover"
        boxSize="250px"
        cursor="pointer"
        borderRadius="8px"
      />

      <Box padding={2}>
        <Text
          isTruncated={true}
          fontWeight="semibold"
          textTransform="capitalize"
          fontSize="lg"
          cursor="pointer"
        >
          P123123
        </Text>
        <Text>product name</Text>
      </Box>
    </Box>
  );
};

export default ProductCard;
