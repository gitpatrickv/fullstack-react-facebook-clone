import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
interface Props {
  postLikeCount: number;
}

const apiClient = axiosInstance;

const useGetPostLikeCount = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postLikeCount", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(
        `/post/${postId}/like/count`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postId,
  });
};

export default useGetPostLikeCount;
