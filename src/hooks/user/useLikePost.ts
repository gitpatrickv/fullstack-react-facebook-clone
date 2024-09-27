import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useLikePost = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  return useMutation(
    async (postId: number) => {
      await apiClient.put(
        `/post/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    {
      onSuccess: (_data, variables) => {
        queryClient.invalidateQueries(["postLike", variables]);
        queryClient.invalidateQueries(["postLikeCount", variables]);
      },
    }
  );
};

export default useLikePost;
