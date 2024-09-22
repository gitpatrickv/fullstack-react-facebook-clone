import Post from "../../entities/Post";
import PostImage from "../../entities/PostImage";
import { axiosInstance } from "../../services/api-client";

import { useQuery } from "@tanstack/react-query";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

export interface FetchAllUserPostsProps extends Post {
  postImages: PostImage[];
}

const useFetchAllUserPosts = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["userPostLists"],
    queryFn: async () => {
      const { data } = await apiClient.get<FetchAllUserPostsProps[]>(`/post`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    enabled: !!jwtToken,
  });
};

export default useFetchAllUserPosts;
