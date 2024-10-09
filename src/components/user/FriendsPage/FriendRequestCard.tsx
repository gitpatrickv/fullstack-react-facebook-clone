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

const FriendRequestCard = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  return (
    <Card overflow="hidden">
      <Box
        display={isSmallScreen ? "flex" : undefined}
        alignItems="center"
        padding={isSmallScreen ? 2 : 0}
      >
        {isSmallScreen ? <Avatar src={pic} size="xl" /> : <Image src={pic} />}
        <Box padding={2}>
          <Text isTruncated={true} fontWeight="semibold">
            NAME HERE HERE
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
