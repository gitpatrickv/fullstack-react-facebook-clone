import { SimpleGrid, Spinner } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../../components/user/MarketPage/ProductCard";
import ProductSkeleton from "../../components/user/MarketPage/ProductSkeleton";
import useFetchAllUserListedProducts from "../../hooks/user/useFetchAllUserListedProducts";
import { useUserStore } from "../../store/user-store";

const MyListedProductPage = () => {
  const { userId } = useUserStore();

  const {
    data: fetchAllProducts,
    fetchNextPage,
    hasNextPage,
    isLoading,
  } = useFetchAllUserListedProducts({ userId: userId ?? 0, pageSize: 20 });

  const fetchProductData =
    fetchAllProducts?.pages.reduce(
      (total, page) => total + page.productModels.length,
      0
    ) || 0;

  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <>
      <InfiniteScroll
        dataLength={fetchProductData}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<Spinner />}
      >
        <SimpleGrid columns={{ base: 1, md: 4, lg: 5, xl: 6 }} spacing={2}>
          {isLoading ? (
            <>
              {array.map((skeleton) => (
                <ProductSkeleton key={skeleton} />
              ))}
            </>
          ) : (
            <>
              {fetchAllProducts?.pages.map((page) =>
                page.productModels.map((item) => (
                  <ProductCard key={item.productId} product={item} />
                ))
              )}
            </>
          )}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default MyListedProductPage;
