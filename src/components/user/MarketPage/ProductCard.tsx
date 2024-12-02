import { Box, Image, Text } from "@chakra-ui/react";
import { ProductModel } from "../../../entities/Product";
import { formatCurrency } from "../../../utilities/formatCurrency";
import { useNavigate } from "react-router-dom";

interface Props {
  product: ProductModel;
}

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate(`/marketplace/item/${product.productId}`);
  };

  return (
    <Box
      overflow="hidden"
      mt="20px"
      cursor="pointer"
      onClick={handleNavigateClick}
    >
      <Image
        src={
          product.productImages?.[0].productImage ||
          "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
        }
        width="100%"
        height="100%"
        // objectFit="cover"
        boxSize="250px"
        borderRadius="8px"
      />

      <Text fontWeight="semibold" fontSize="lg" mt="5px">
        {formatCurrency(product.price)}
      </Text>
      <Text textTransform="capitalize" isTruncated={true}>
        {product.productName}
      </Text>
    </Box>
  );
};

export default ProductCard;
