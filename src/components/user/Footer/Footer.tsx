import { Card, CardBody, Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Card
      borderRadius="none"
      mt={{ base: "50px", md: "80px", lg: "120px" }}
      as="footer"
    >
      <CardBody>
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* <MyLinks /> */}
          <Text mr="5px" mt="10px">
            Built using:
          </Text>
          <Text>
            Frontend: React, Typescript, Chakra UI, React Query, Zustand
          </Text>
          <Text>Backend: Spring Boot, Java 22, MySQL</Text>
          <Text mt="10px">© 2024 Patrick V. All rights reserved.</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Footer;
