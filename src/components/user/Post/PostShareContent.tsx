import { Avatar, Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import pic from "../../../assets/profpic.jpeg";
import PostShareUserProfileCard from "./PostShareUserProfileCard";
import { useProfileStore } from "../../../store/profile-store";

interface PostContentProps {
  firstName: string;
  lastName: string;
  postUserId: number;
  profilePicture?: string;
  timestamp: string;
  content: string;
}

const PostShareContent = ({
  firstName,
  lastName,
  postUserId,
  profilePicture,
  timestamp,
  content,
}: PostContentProps) => {
  const navigate = useNavigate();
  const time = new Date(timestamp ?? new Date().toISOString());
  const { setIsProfile } = useProfileStore();
  const handleNavigateClick = () => {
    navigate(`/profile/${postUserId}`);
    setIsProfile(true);
  };

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <>
      {isHovered && (
        <PostShareUserProfileCard
          firstName={firstName}
          lastName={lastName}
          postUserId={postUserId}
          profilePicture={profilePicture}
          setIsHovered={setIsHovered}
          handleNavigateClick={handleNavigateClick}
        />
      )}
      <Box padding={3}>
        <Box display="flex" alignItems="center">
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar
              src={profilePicture || pic}
              size="sm"
              mr="10px"
              cursor="pointer"
              onClick={handleNavigateClick}
            />
          </Box>
          <Box flexDirection="column">
            <Text
              fontSize="sm"
              textTransform="capitalize"
              fontWeight="semibold"
              cursor="pointer"
              onClick={handleNavigateClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {firstName} {lastName}
            </Text>
            <Text fontSize="xs" color="gray.500" fontWeight="semibold">
              <ReactTimeAgo date={time} locale="en-US" />
            </Text>
          </Box>
        </Box>
        <Text mt="5px" mb="5px">
          {content}
        </Text>
      </Box>
    </>
  );
};

export default PostShareContent;
