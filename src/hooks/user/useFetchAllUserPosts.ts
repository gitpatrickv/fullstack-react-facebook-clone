import { useQuery } from "@tanstack/react-query";

import PostListResponse from "../../entities/Post";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { PaginateProps } from "../../entities/PageResponse";

const apiClient = axiosInstance;

const useFetchAllUserPosts = ({ pageNo, pageSize }: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["userPostList", pageNo, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<PostListResponse>(`/post`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        params: {
          pageNo: pageNo - 1,
          pageSize: pageSize,
        },
      });
      return data;
    },
    keepPreviousData: true,
    enabled: !!jwtToken,
  });
};

export default useFetchAllUserPosts;
