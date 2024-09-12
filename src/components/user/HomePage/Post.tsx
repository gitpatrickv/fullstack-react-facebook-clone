import {
  Avatar,
  Box,
  Card,
  Divider,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { PiShareFatLight } from "react-icons/pi";

const Post = () => {
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Card padding={3} maxWidth={{ base: "100%", lg: "95%" }} mt="10px">
      <Box display="flex" alignItems="center">
        <Avatar
          src={
            "https://st.depositphotos.com/2101611/3925/v/450/depositphotos_39258193-stock-illustration-anonymous-business-man-icon.jpg"
          }
          size="sm"
          mr="10px"
        />
        <Box flexDirection="column">
          <Text fontSize="xs">Patrick V.</Text>
          <Text fontSize="xs" color="gray.500">
            2 days ago
          </Text>
        </Box>
      </Box>
      <Text mt="5px" mb="5px">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde error
        pariatur est et consequuntur adipisci repellendus ipsa. Hic et iusto
        fugiat, ducimus odio optio assumenda, doloribus, magni esse nesciunt
        corporis!
      </Text>
      <Image src="https://t4.ftcdn.net/jpg/05/49/86/39/360_F_549863991_6yPKI08MG7JiZX83tMHlhDtd6XLFAMce.jpg" />
      <Box display="flex" mt="5px">
        <Text>Likes</Text>
        <Spacer />
        <Box display="flex" mr="15px" alignItems="center">
          <Text mr="3px">99</Text>
          {isSmallScreen ? <FaRegComment /> : <Text>comments</Text>}
        </Box>
        <Box display="flex" alignItems="center">
          <Text mr="3px">50</Text>
          {isSmallScreen ? <PiShareFatLight /> : <Text>shares</Text>}
        </Box>
      </Box>
      <Divider mt="5px" mb="5px" color="gray.500" />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <BiLike size="20px" />
          <Text ml="5px">Like</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <FaRegComment size="20px" />
          <Text ml="5px">Comment</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <PiShareFatLight size="20px" />
          <Text ml="5px">Share</Text>
        </Box>
      </Box>
    </Card>
  );
};

export default Post;
