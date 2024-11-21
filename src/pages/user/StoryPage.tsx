import {
  Box,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import NavbarRight from "../../components/user/Navbar/NavbarRight";

const StoryPage = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });
  const navigate = useNavigate();
  const handleNavigateClick = () => {
    navigate("/home");
  };
  return (
    <>
      <Modal isOpen={true} onClose={handleNavigateClick} size="full">
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default StoryPage;
