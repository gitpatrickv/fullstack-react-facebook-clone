import {
  Box,
  Divider,
  Grid,
  GridItem,
  IconButton,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import Post from "../../../entities/Post";
import PostImage from "../../../entities/PostImage";
import NavbarRight from "../Navbar/NavbarRight";
import PostContent from "./PostContent";
import PostShareContent from "./PostShareContent";
import PostShareButtons from "./PostShareButtons";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  nextRightImage: () => void;
  nextLeftImage: () => void;
  activeImage: PostImage | null;
  postImages: PostImage[];
  posts: Post;
}

const PostImagesModal = ({
  isOpen,
  onClose,
  nextRightImage,
  nextLeftImage,
  activeImage,
  postImages,
  posts,
}: ImageModalProps) => {
  const gridTemplateColumns = useBreakpointValue({
    base: "1fr",
    lg: "60px 0.7fr 60px 0.3fr",
    xl: "60px 0.8fr 60px 0.2fr",
  });

  const gridTemplateAreas = useBreakpointValue({
    base: `"section1"
           "section2"
           `,
    lg: `"leftButton section1 rightButton section2"`,
    xl: `"leftButton section1 rightButton section2"`,
  });
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  const nextButton = (direction: "left" | "right") => (
    <IconButton
      isRound={true}
      aria-label={direction === "left" ? "Left" : "Right"}
      size={isSmallScreen ? "md" : "lg"}
      colorScheme="gray.500"
      bg="gray.500"
      icon={
        direction === "left" ? (
          <FaChevronLeft size="25px" />
        ) : (
          <FaChevronRight size="25px" />
        )
      }
      onClick={direction === "left" ? nextLeftImage : nextRightImage}
    />
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton
          position="absolute"
          left="5px"
          size="lg"
          borderRadius="full"
          bg="gray.800"
          color="white"
          _hover={{ bg: "gray.700" }}
        />
        <Link to="/home">
          <Box position="absolute" top="2" left="50px" color="blue.500">
            <FaFacebook size="40px" />
          </Box>
        </Link>
        {isSmallScreen && (
          <Box padding={2}>
            <NavbarRight />
          </Box>
        )}

        <Grid
          templateColumns={gridTemplateColumns}
          templateAreas={gridTemplateAreas}
        >
          <GridItem
            area="section1"
            bg="black"
            height={isLargeScreen ? "100vh" : "auto"}
            display={isLargeScreen ? "flex" : "block"}
            justifyContent={isLargeScreen ? "center" : undefined}
            alignItems={isLargeScreen ? "center" : undefined}
          >
            {isSmallScreen && <Box padding={5} />}
            <Box display="flex" alignItems="center" justifyContent="center">
              {postImages.length > 1 && isSmallScreen && (
                <Box
                  position={isSmallScreen ? "absolute" : "static"}
                  left={isSmallScreen ? "0px" : undefined}
                  ml={isSmallScreen ? "5px" : "0px"}
                >
                  {nextButton("left")}
                </Box>
              )}

              <Box ml="5px" mr="5px">
                <Image
                  src={activeImage?.postImageUrl}
                  overflow="hidden"
                  width="auto"
                  height={{ base: "200px", md: "400px", xl: "100vh" }}
                  objectFit="cover"
                />
              </Box>

              {postImages.length > 1 && isSmallScreen && (
                <Box
                  position={isSmallScreen ? "absolute" : "static"}
                  right={isSmallScreen ? "0px" : undefined}
                  mr={isSmallScreen ? "5px" : "0px"}
                >
                  {nextButton("right")}
                </Box>
              )}
            </Box>
            {isSmallScreen && <Box padding={5} />}
          </GridItem>
          <GridItem area="section2">
            <Show above="lg">
              <Box padding={2}>
                <NavbarRight />
              </Box>
            </Show>
            <Divider />
            <Box>
              {posts.sharedPost ? (
                <PostShareContent posts={posts} />
              ) : (
                <Box padding={3}>
                  <PostContent posts={posts} />
                </Box>
              )}

              <PostShareButtons activeImage={activeImage} />
            </Box>
            <Divider mt="5px" color="gray.500" />
            <Box padding={3}>
              {/* <Comments /> */}
              <Text>IMAGES COMMENTS HERE</Text>
            </Box>
          </GridItem>
          <Show above="lg">
            <GridItem area="leftButton" bg="black">
              <Box position="absolute" top="50%" bottom="50%" ml="10px">
                {postImages.length > 1 && nextButton("left")}
              </Box>
            </GridItem>
            <GridItem area="rightButton" bg="black">
              <Box position="absolute" top="50%" bottom="50%">
                {postImages.length > 1 && nextButton("right")}
              </Box>
            </GridItem>
          </Show>
        </Grid>
      </ModalContent>
    </Modal>
  );
};

export default PostImagesModal;
