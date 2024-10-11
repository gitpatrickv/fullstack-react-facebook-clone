import {
  Avatar,
  Box,
  Button,
  Card,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import pic from "../../../assets/profpic.jpeg";
import { UserDataModelList } from "../../../entities/User";
import useAcceptFriendRequest from "../../../hooks/user/useAcceptFriendRequest";
import { useNavigate } from "react-router-dom";
import useDeleteFriendRequest from "../../../hooks/user/useDeleteFriendRequest";
import { useUserStore } from "../../../store/user-store";

interface Props {
  request: UserDataModelList;
}

const FriendRequestCard = ({ request }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const { mutation, isLoading, setIsLoading } = useAcceptFriendRequest();
  const navigate = useNavigate();
  const handleAcceptFriendRequestClick = () => {
    mutation.mutate(request.userId);
    setIsLoading(true);
  };
  const { userId } = useUserStore();

  const {
    mutation: deleteRequest,
    isLoading: deleteRequestIsLoading,
    setIsLoading: setDeleteRequestIsLoading,
  } = useDeleteFriendRequest(userId ?? 0);

  const handleDeleteFriendRequestClick = () => {
    deleteRequest.mutate(request.userId);
    setDeleteRequestIsLoading(true);
  };

  const handleNavigateClick = () => {
    navigate(`/profile/${request.userId}`);
  };

  return (
    <Card overflow="hidden">
      <Box
        display={isSmallScreen ? "flex" : undefined}
        alignItems="center"
        padding={isSmallScreen ? 2 : 0}
      >
        {isSmallScreen ? (
          <Avatar
            src={request.profilePicture || pic}
            size="xl"
            onClick={handleNavigateClick}
            cursor="pointer"
          />
        ) : (
          <Image
            src={request.profilePicture || pic}
            width="100%"
            height="100%"
            objectFit="cover"
            boxSize="220px"
            onClick={handleNavigateClick}
            cursor="pointer"
          />
        )}
        <Box padding={2}>
          <Text
            isTruncated={true}
            fontWeight="semibold"
            textTransform="capitalize"
            fontSize="lg"
            onClick={handleNavigateClick}
            cursor="pointer"
          >
            {request.firstName} {request.lastName}
          </Text>
          <Box
            display="flex"
            flexDirection={isSmallScreen ? "row" : "column"}
            mt="5px"
          >
            <Button
              colorScheme="blue"
              mb={{ base: "0px", md: "10px" }}
              mr={{ base: "10px", md: "0" }}
              onClick={handleAcceptFriendRequestClick}
              isLoading={isLoading}
            >
              Confirm
            </Button>
            <Button
              onClick={handleDeleteFriendRequestClick}
              isLoading={deleteRequestIsLoading}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FriendRequestCard;
