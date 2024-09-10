import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  FormControl,
  Input,
  Text,
} from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-evenly"
      flexDirection={{ base: "column", lg: "row" }}
      alignItems="center"
      as="section"
      mt={{ base: "50px", lg: "120px", xl: "85px" }}
      mb={{ base: "30px" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        mb={{ base: "20px", xl: "0px" }}
        mr={{ base: "0px", md: "100px" }}
      >
        <Text
          fontSize={{ base: "xx-large", md: "xxx-large" }}
          color="blue.500"
          fontWeight="bold"
        >
          facebook
        </Text>
        <Text fontSize={{ base: "lg", md: "x-large" }}>
          Connect with friends and the world
        </Text>
        <Text fontSize={{ base: "lg", md: "x-large" }}>
          around you on Facebook
        </Text>
      </Box>
      <Center>
        <Card w={{ base: "250px", md: "450px", lg: "500px" }}>
          <Box
            as="form"
            // onSubmit={onSubmit}
            p={{ base: 1, md: 4 }}
            borderWidth={1}
            borderRadius="md"
          >
            <CardBody>
              <FormControl mb={4} isRequired>
                <Input type="text" placeholder="Email" />
              </FormControl>
              <FormControl mb={4} isRequired>
                <Input type="password" placeholder="Password" />
              </FormControl>
              <Button
                width="100%"
                bg="blue.500"
                _hover={{ bg: "blue.500" }}
                _active={{ bg: "blue.600" }}
              >
                Log In
              </Button>
              <Text
                textAlign="center"
                mt="20px"
                color="blue.500"
                cursor="pointer"
              >
                Forget Password?
              </Text>
              <Divider mt="20px" mb="20px" />
              <Center>
                <Button
                  bg="green.500"
                  _hover={{ bg: "green.500" }}
                  _active={{ bg: "green.600" }}
                >
                  Create New Account
                </Button>
              </Center>
            </CardBody>
          </Box>
        </Card>
      </Center>
    </Box>
  );
};

export default LoginPage;
