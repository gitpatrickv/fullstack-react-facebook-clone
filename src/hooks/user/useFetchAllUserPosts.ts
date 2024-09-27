import { useQuery } from "@tanstack/react-query";

import PostListResponse from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { PaginateProps } from "../../entities/PageResponse";

const apiClient = axiosInstance;

const useFetchAllUserPosts = ({ userId, pageNo, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["userPostList", userId, pageNo, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<PostListResponse>(
        `/post/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          params: {
            pageNo: pageNo - 1,
            pageSize: pageSize,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useFetchAllUserPosts;
