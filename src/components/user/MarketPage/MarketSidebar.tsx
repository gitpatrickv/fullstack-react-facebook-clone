import {
  Box,
  Button,
  Card,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { FaCar, FaGuitar, FaList } from "react-icons/fa6";
import { FiPaperclip, FiPlus } from "react-icons/fi";
import { ImMobile2, ImVideoCamera } from "react-icons/im";
import {
  IoGameController,
  IoShirtSharp,
  IoStorefrontSharp,
} from "react-icons/io5";
import {
  MdOutlineSportsSoccer,
  MdRealEstateAgent,
  MdSell,
} from "react-icons/md";

const MarketSidebar = () => {
  const { colorMode } = useColorMode();

  const isSmallScreen = useBreakpointValue(
    { base: true, lg: false },
    { fallback: "lg" }
  );

  const boxStyles = {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderRadius: "5px",
    _hover: {
      bg: colorMode === "dark" ? "#303030" : "gray.100",
    },
    cursor: "pointer",
  };

  const textStyles = {
    ml: "10px",
    fontSize: "lg",
    fontWeight: "semibold",
  };

  const cardStyles = {
    height: "40px",
    width: "40px",
    bg: colorMode === "dark" ? "#303030" : "gray.100",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "20px",
    mr: "10px",
    _hover: {
      bg: colorMode === "dark" ? "#383838" : "gray.200",
    },
  };

  return (
    <>
      <Card
        borderRadius="none"
        height="100%"
        minHeight={{ base: "0", lg: "100vh" }}
      >
        <Box padding={3} position="sticky" top="60px">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            mb="10px"
            mt={{ base: "50px", lg: "0" }}
            ml={{ base: "0", lg: "10px" }}
          >
            Marketplace
          </Text>
          <InputGroup justifyContent={{ base: "center", md: "flex-start" }}>
            <Input
              borderRadius={20}
              placeholder="Search Marketplace"
              variant="filled"
              fontSize={{ base: "sm", md: "md" }}
              border="none"
              _hover={{ border: "none" }}
              _focus={{
                boxShadow: "none",
                border: "none",
                bg: colorMode === "dark" ? "#303030" : "gray.100",
              }}
            />
            <InputLeftElement>
              <IconButton
                aria-label="Search"
                icon={<BsSearch />}
                type="submit"
                bg="transparent"
                _hover={{ bg: "transparent" }}
              />
            </InputLeftElement>
          </InputGroup>
          <Flex
            flexDirection={{ base: "row", lg: "column" }}
            alignItems={{ base: "center", lg: "initial" }}
            justifyContent={{ base: "space-between", lg: "initial" }}
          >
            <Box {...boxStyles} mt="10px">
              <IconButton
                aria-label="all"
                icon={<IoStorefrontSharp size="20px" />}
                bg={"#1877F2"}
                _hover={{
                  bg: "#165BB7",
                }}
                isRound
                size="md"
              />
              <Text {...textStyles}>Browse all</Text>
            </Box>
            <Box {...boxStyles} mt={{ base: "10px", lg: "0" }}>
              <IconButton
                aria-label="all"
                icon={<MdSell size="20px" />}
                isRound
                size="md"
              />
              <Text {...textStyles}>Selling</Text>
            </Box>
          </Flex>
          <Button
            width="100%"
            mt="10px"
            bg={"#1877F2"}
            _hover={{
              bg: "#165BB7",
            }}
          >
            <FiPlus size="20px" /> <Text ml="10px">Create new listing</Text>
          </Button>
          {isSmallScreen ? (
            <Box mt="10px">
              <Menu>
                <MenuButton as={Button} borderRadius="20" leftIcon={<FaList />}>
                  <Text ml="5px">Categories</Text>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <FaCar size="20px" />
                    </Card>
                    <Text>Vehicles</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <ImMobile2 size="20px" />
                    </Card>
                    <Text>Electronics</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <IoShirtSharp size="20px" />
                    </Card>
                    <Text>Apparel</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <IoGameController size="20px" />
                    </Card>
                    <Text>Toys & Games</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <MdRealEstateAgent size="20px" />
                    </Card>
                    <Text>Home Sales</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <ImVideoCamera size="20px" />
                    </Card>
                    <Text>Entertainment</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <MdOutlineSportsSoccer size="20px" />
                    </Card>
                    <Text>Sports</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <FiPaperclip size="20px" />
                    </Card>
                    <Text>Office Supplies</Text>
                  </MenuItem>
                  <MenuItem>
                    <Card {...cardStyles}>
                      <FaGuitar size="20px" />
                    </Card>
                    <Text>Musical Instruments</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          ) : (
            <>
              <Text
                ml="10px"
                fontSize="lg"
                fontWeight="semibold"
                mt="10px"
                mb="10px"
              >
                Categories
              </Text>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="vehicles"
                  icon={<FaCar size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Vehicles</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="electronics"
                  icon={<ImMobile2 size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Electronics</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="apparel"
                  icon={<IoShirtSharp size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Apparel</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="games"
                  icon={<IoGameController size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Toys & Games</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="home"
                  icon={<MdRealEstateAgent size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Home Sales</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="entertainment"
                  icon={<ImVideoCamera size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Entertainment</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="sports"
                  icon={<MdOutlineSportsSoccer size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Sports</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="supply"
                  icon={<FiPaperclip size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Office Supplies</Text>
              </Box>
              <Box {...boxStyles}>
                <IconButton
                  aria-label="instruments"
                  icon={<FaGuitar size="20px" />}
                  isRound
                  size="md"
                />
                <Text {...textStyles}>Musical Instruments</Text>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default MarketSidebar;
