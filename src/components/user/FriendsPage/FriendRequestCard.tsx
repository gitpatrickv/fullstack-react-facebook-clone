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

interface Props {
  request: UserDataModelList;
}

const FriendRequestCard = ({ request }: Props) => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Card overflow="hidden">
      <Box
        display={isSmallScreen ? "flex" : undefined}
        alignItems="center"
        padding={isSmallScreen ? 2 : 0}
      >
        {isSmallScreen ? (
          <Avatar src={request.profilePicture || pic} size="xl" />
        ) : (
          <Image
            src={request.profilePicture || pic}
            width="100%"
            height="100%"
            objectFit="cover"
            boxSize="220px"
          />
        )}
        <Box padding={2}>
          <Text
            isTruncated={true}
            fontWeight="semibold"
            textTransform="capitalize"
            fontSize="lg"
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
            >
              Confirm
            </Button>
            <Button>Delete</Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default FriendRequestCard;
