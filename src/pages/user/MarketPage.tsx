import { Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import MarketSidebar from "../../components/user/MarketPage/MarketSidebar";
import ProductCard from "../../components/user/MarketPage/ProductCard";

const MarketPage = () => {
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "0.3fr 0.7fr",
          xl: "0.2fr 0.8fr",
        }}
        templateAreas={{
          base: `"section1"
            "section2"
            `,
          lg: `"section1  section2 "`,
          xl: `"section1  section2 "`,
        }}
      >
        <GridItem area="section1">
          <MarketSidebar />
        </GridItem>
        <GridItem area="section2" padding={6}>
          <Text fontSize="xl" fontWeight="bold">
            Today's Pick
          </Text>
          <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 6 }} spacing={2}>
            {array.map((skeleton) => (
              <ProductCard key={skeleton} />
            ))}
          </SimpleGrid>
          <ProductCard />
        </GridItem>
      </Grid>
    </>
  );
};

export default MarketPage;
