import { Box, Image, Text } from "@chakra-ui/react";
import PostImage from "../../../entities/PostImage";

interface Props {
  postImages: PostImage[];
}

const PostImages = ({ postImages }: Props) => {
  if (!postImages || postImages.length === 0) {
    return null;
  }

  const getFlexBasis = (index: number, imageCount: number) => {
    if (imageCount === 1) return "100%";
    if (imageCount === 2) return "calc(50% - 5px)";
    if (imageCount === 3) return index === 0 ? "100%" : "calc(50% - 5px)";
    if (imageCount === 4) return "calc(50% - 5px)";
    if (imageCount === 5)
      return index < 3 ? "calc(33.33% - 5px)" : "calc(50% - 5px)";
    if (imageCount === 6) return "calc(33.33% - 5px)";
    return "calc(33.33% - 5px)";
  };

  const gap = postImages.length - 6;

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {postImages.slice(0, 6).map((image, index) => (
          <Box
            key={image.postImageId}
            flexBasis={getFlexBasis(index, postImages.length)}
            flexGrow={1}
            position="relative"
            width="100%"
            height="auto"
            cursor="pointer"
          >
            <Image
              src={image.postImageUrl}
              objectFit="cover"
              width="100%"
              minHeight="100%"
              height="auto"
              filter={
                postImages.length > 6 && index === 5
                  ? "brightness(0.4)"
                  : "none"
              }
            />
            {postImages.length > 6 && index === 5 && (
              <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="white"
                fontSize="xxx-large"
                fontWeight="semibold"
              >
                +{gap}
              </Text>
            )}
          </Box>
        ))}
      </Box>
    </>
  );
};

export default PostImages;
