import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import useLogin from "../../hooks/user/useLogin";
import { IoIosEye } from "react-icons/io";
import { RiEyeCloseLine } from "react-icons/ri";
import { useState } from "react";

const LoginPage = () => {
  const { register, handleSubmit, loading, onSubmit, errors } = useLogin();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };
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
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "x-large" }}
          whiteSpace="nowrap"
        >
          Connect with friends and the world
        </Text>
        <Text fontSize={{ base: "lg", md: "xl", lg: "x-large" }}>
          around you on Facebook
        </Text>
      </Box>
      <Center>
        <Card w={{ base: "250px", md: "400px", lg: "400px" }}>
          <Box p={{ base: 1, md: 2 }} borderWidth={1} borderRadius="md">
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl mb={4} isRequired>
                  <Input
                    disabled={loading}
                    {...register("email", { required: "Email is required" })}
                    type="text"
                    placeholder="Username or Email"
                    borderColor="gray"
                  />
                  {errors.email && (
                    <Text color="red"> {errors.email.message} </Text>
                  )}
                </FormControl>
                <FormControl mb={4} isRequired>
                  <InputGroup>
                    <Input
                      disabled={loading}
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      borderColor="gray"
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label="show"
                        icon={
                          showPassword ? (
                            <IoIosEye size="25px" />
                          ) : (
                            <RiEyeCloseLine size="25px" />
                          )
                        }
                        onClick={handleShowPasswordClick}
                        bg="transparent"
                        _hover={{ bg: "transparent" }}
                        mr="15px"
                      />
                    </InputRightElement>
                  </InputGroup>
                  {errors.password && (
                    <Text color="red">{errors.password.message} </Text>
                  )}
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
              </form>
            </CardBody>
          </Box>
        </Card>
      </Center>
    </Box>
  );
};

export default LoginPage;
