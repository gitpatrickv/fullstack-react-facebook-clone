import { Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import MarketSidebar from "../../components/user/MarketPage/MarketSidebar";
import ProductCard from "../../components/user/MarketPage/ProductCard";
import useFetchAllProducts from "../../hooks/user/useFetchAllProducts";

const MarketPage = () => {
  const { data: fetchAllProducts } = useFetchAllProducts({ pageSize: 20 });
  const location = useLocation();
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
          {location.pathname === "/marketplace" ? (
            <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 6 }} spacing={2}>
              {fetchAllProducts?.pages.map((page) =>
                page.productModels.map((item) => (
                  <ProductCard key={item.productId} product={item} />
                ))
              )}
            </SimpleGrid>
          ) : (
            <Outlet />
          )}
        </GridItem>
      </Grid>
    </>
  );
};

export default MarketPage;
