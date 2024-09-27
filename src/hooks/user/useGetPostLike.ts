import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface Props {
  liked: boolean;
}

const apiClient = axiosInstance;

const useGetPostLike = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [postLike, setPostLike] = useState<boolean>(false);
  const query = useQuery({
    queryKey: ["postLike", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<Props>(`/post/${postId}/like`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      setPostLike(data.liked);
    },
    enabled: !!jwtToken && !!postId,
  });

  return { ...query, postLike };
};

export default useGetPostLike;
