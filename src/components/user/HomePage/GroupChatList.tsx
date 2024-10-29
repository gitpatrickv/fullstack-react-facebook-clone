import { Avatar, Box, Text } from "@chakra-ui/react";

const GroupChatList = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        cursor="pointer"
        mt="15px"
        maxWidth="300px"
      >
        <Avatar
          src={
            "https://media.istockphoto.com/id/1435832032/vector/group-psychotherapy-persons-sitting-in-circle-and-talking-people-meeting-psychotherapy.jpg?s=612x612&w=0&k=20&c=OQibuYZLqcYVYDsa3e63isb4RNX9Mtsw40MZRP6eJD8="
          }
          size="xs"
          ml="3px"
        />
        <Text ml="13px" isTruncated={true}>
          Unknown Group Chat
        </Text>
      </Box>
    </>
  );
};

export default GroupChatList;
