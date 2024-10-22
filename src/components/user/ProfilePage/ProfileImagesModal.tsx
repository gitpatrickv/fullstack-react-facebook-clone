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
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaFacebook } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { Images } from "../../../entities/PostImage";
import useFetchAllPostImageComments from "../../../hooks/user/useFetchAllPostImageComments";
import useGetPostById from "../../../hooks/user/useGetPostById";
import useWritePostImageComment from "../../../hooks/user/useWritePostImageComment";
import NavbarRight from "../Navbar/NavbarRight";
import Comments from "../Post/Comments";
import PostContent from "../Post/PostContent";
import PostImagesButtons from "../Post/PostImagesButtons";
import WriteComment from "../Post/WriteComment";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeImage: Images | null;
  nextRightImage: () => void;
  nextLeftImage: () => void;
  imageList: Images[];
}

const ProfileImagesModal = ({
  isOpen,
  onClose,
  activeImage,
  nextRightImage,
  nextLeftImage,
  imageList,
}: Props) => {
  const { data: getPost } = useGetPostById(activeImage?.postId ?? 0);
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  const nextButton = (direction: "left" | "right") => (
    <IconButton
      isRound={true}
      aria-label={direction === "left" ? "Left" : "Right"}
      size={isSmallScreen ? "md" : "lg"}
      colorScheme="gray.500"
      bg="gray.500"
      _hover={{ bg: "gray.600" }}
      _active={{ bg: "gray.700" }}
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

  const {
    data: fetchAllPostImageComments,
    fetchNextPage,
    hasNextPage,
  } = useFetchAllPostImageComments({
    postImageId: activeImage?.postImageId ?? 0,
    pageSize: 10,
  });

  const fetchedCommentData =
    fetchAllPostImageComments?.pages.reduce(
      (total, page) => total + page.postCommentList.length,
      0
    ) || 0;

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    comment,
    setComment,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
  } = useWritePostImageComment(activeImage?.postImageId ?? 0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const initialRef = useRef<HTMLInputElement | null>(null);
  const finalRef = useRef<HTMLInputElement | null>(null);
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
    setValue("comment", e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleRemoveImagePreviewClick = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("file", undefined);
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
      console.log("cleaning up " + imagePreview);
    };
  }, [imagePreview]);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleFocusInputClick = () => {
    initialRef.current?.focus();
    setIsClicked(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
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
            <Box position="absolute" top="2" left="50px" color="#1877F2">
              <FaFacebook size="40px" />
            </Box>
          </Link>
          {isSmallScreen && (
            <Box padding={2}>
              <NavbarRight />
            </Box>
          )}

          <Grid
            templateColumns={{
              base: "1fr",
              lg: "60px 0.7fr 60px 0.3fr",
              xl: "60px 0.8fr 60px 0.25fr",
            }}
            templateAreas={{
              base: `"section1"
              "section2"
              `,
              lg: `"leftButton section1 rightButton section2"`,
              xl: `"leftButton section1 rightButton section2"`,
            }}
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
                {imageList.length > 1 && isSmallScreen && (
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
                    objectFit="contain"
                  />
                </Box>

                {imageList.length > 1 && isSmallScreen && (
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
                {getPost && (
                  <Box padding={3}>
                    <PostContent
                      firstName={getPost?.firstName}
                      lastName={getPost?.lastName}
                      postUserId={getPost?.userId}
                      profilePicture={getPost?.profilePicture}
                      timestamp={getPost?.postTimestamp}
                      postId={getPost?.postId}
                      content={getPost?.content}
                    />
                  </Box>
                )}

                <PostImagesButtons
                  activeImage={activeImage}
                  focusInputClick={handleFocusInputClick}
                  postId={getPost?.postId ?? 0}
                />
              </Box>
              <Divider mt="5px" color="gray.500" />
              <Box
                padding={3}
                maxHeight="600px"
                overflowY="auto"
                id="scrollable-body"
              >
                <InfiniteScroll
                  dataLength={fetchedCommentData}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={<Spinner />}
                  scrollableTarget="scrollable-body"
                >
                  {fetchAllPostImageComments?.pages.map((page) =>
                    page.postCommentList.map((comments) => (
                      <Comments
                        key={comments.postCommentId}
                        comments={comments}
                      />
                    ))
                  )}
                </InfiniteScroll>
              </Box>

              <Box position="relative" padding={3}>
                <WriteComment
                  focusRef={initialRef}
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  loading={loading}
                  comment={comment}
                  imageFile={imageFile}
                  handleInputClick={handleInputClick}
                  handleCommentChange={handleCommentChange}
                  fileInputRef={fileInputRef}
                  handleFileChange={handleFileChange}
                  imagePreview={imagePreview}
                  removeImageClick={handleRemoveImagePreviewClick}
                  isClicked={isClicked}
                  setIsClicked={setIsClicked}
                />
              </Box>
            </GridItem>
            <Show above="lg">
              <GridItem area="leftButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%" ml="10px">
                  {imageList.length > 1 && nextButton("left")}
                </Box>
              </GridItem>
              <GridItem area="rightButton" bg="black">
                <Box position="absolute" top="50%" bottom="50%">
                  {imageList.length > 1 && nextButton("right")}
                </Box>
              </GridItem>
            </Show>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileImagesModal;
