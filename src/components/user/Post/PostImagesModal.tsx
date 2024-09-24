import {
  Box,
  Grid,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PostImage from "../../../entities/PostImage";
import Comments from "./Comments";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextRightImage: () => void;
  nextLeftImage: () => void;
  activeImage: PostImage | null;
  postImages: PostImage[];
}

const PostImagesModal = ({
  isOpen,
  onClose,
  nextRightImage,
  nextLeftImage,
  activeImage,
  postImages,
}: ImageModalProps) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "0.7fr 0.3fr",
    xl: "0.8fr 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"section1"
           "section2"
           `,
    lg: `"section1 section2"`,
    xl: `"section1 section2"`,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <Grid
          templateColumns={gridTemplateColumns}
          templateAreas={gridTemplateAreas}
        >
          <GridItem area="section1" bg="black">
            <Box display="flex" alignItems="center" justifyContent="center">
              {postImages && postImages.length > 1 && (
                <Box position="absolute" left="10px">
                  <IconButton
                    isRound={true}
                    aria-label="Left"
                    size="lg"
                    bg="gray.500"
                    icon={<FaChevronLeft size="25px" />}
                    onClick={nextLeftImage}
                  />
                </Box>
              )}

              <Box>
                <Image
                  src={activeImage?.postImageUrl}
                  overflow="hidden"
                  width="auto"
                  height={{ base: "auto", xl: "100vh" }}
                  objectFit="cover"
                />
              </Box>
              {postImages && postImages.length > 1 && (
                <Box
                  position="absolute"
                  right={{ base: "10px", lg: "320px", xl: "395px" }}
                  alignItems="center"
                >
                  <IconButton
                    isRound={true}
                    aria-label="Right"
                    size="lg"
                    bg="gray.500"
                    icon={<FaChevronRight size="25px" />}
                    onClick={nextRightImage}
                  />
                </Box>
              )}
            </Box>
          </GridItem>
          <GridItem area="section2" bg="red">
            <Comments />
          </GridItem>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default PostImagesModal;
