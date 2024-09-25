import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostImage from "../../../entities/PostImage";
import PostImagesModal from "./PostImagesModal";
import { FetchAllUserPostsProps } from "../../../entities/Post";

interface Props {
  postImages: PostImage[];
  posts: FetchAllUserPostsProps;
}

const PostImages = ({ postImages, posts }: Props) => {
  if (!postImages || postImages.length === 0) {
    return null;
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<PostImage[]>(postImages);
  const [activeImage, setActiveImage] = useState<PostImage | null>(null);

  useEffect(() => {
    if (postImages && postImages.length > 0) {
      setImages(postImages);
      setActiveImage(postImages[0]);
    }
  }, [postImages]);

  const handleImageClick = (images: PostImage) => {
    setActiveImage(images);
    onOpen();
  };

  const handleSelectNextImageRightClick = () => {
    if (activeImage && images.length > 0) {
      const currentIndex = images.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex + 1) % images.length;
      setActiveImage(images[nextIndex]);
    }
  };

  const handleSelectNextImageLeftClick = () => {
    if (activeImage && images.length > 0) {
      const currentIndex = images.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex - 1 + images.length) % images.length;
      setActiveImage(images[nextIndex]);
    }
  };

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

  const gap = postImages.length + 1 - 6;

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {images.slice(0, 6).map((image, index) => (
          <Box
            key={image.postImageId}
            flexBasis={getFlexBasis(index, postImages.length)}
            flexGrow={1}
            position="relative"
            cursor="pointer"
            onClick={() => handleImageClick(image)}
          >
            <Image
              src={image.postImageUrl}
              objectFit="cover"
              width="100%"
              minHeight="100%"
              height="auto"
              filter={
                postImages.length > 6 && index === 5
                  ? "brightness(0.3)"
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
                fontSize={{ base: "x-large", md: "xx-large", lg: "xxx-large" }}
                fontWeight="semibold"
              >
                +{gap}
              </Text>
            )}
          </Box>
        ))}
        <PostImagesModal
          isOpen={isOpen}
          onClose={onClose}
          nextRightImage={handleSelectNextImageRightClick}
          nextLeftImage={handleSelectNextImageLeftClick}
          activeImage={activeImage}
          postImages={images}
          posts={posts}
        />
      </Box>
    </>
  );
};

export default PostImages;
