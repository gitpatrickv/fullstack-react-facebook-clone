import { Card, Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";

const Header = () => {
  const { colorMode } = useColorMode();
  return (
    <Card
      //   height="60px"
      borderRadius="none"
      position="fixed"
      top="0"
      width="100%"
      zIndex={10}
      as="header"
      bg={colorMode === "dark" ? "gray.700" : "orange.500"}
      padding={4}
    >
      <Grid
        templateColumns="0.5fr 0.5fr 0.5fr"
        templateAreas={`"asideLeft content1 asideRight"`}
        alignItems="center"
        gridGap="25px"
        mt="5px"
      >
        <GridItem
          area="content1"
          display="flex"
          justifyContent="start"
          bg="blue"
        >
          <Text>asdasd</Text>
        </GridItem>
        <GridItem
          area="asideLeft"
          display="flex"
          justifyContent="start"
          bg="brown"
        >
          <Text>asdasd</Text>
        </GridItem>
        <GridItem
          area="asideRight"
          display="flex"
          justifyContent="start"
          bg="red"
        >
          <Text>asdasd</Text>
        </GridItem>
      </Grid>
    </Card>
  );
};

export default Header;
