import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { UserData } from "../../entities/User";

const apiClient = axiosInstance;

interface PostResponseProps extends UserData {
  postId: number;
  content: string;
  postTimestamp: string;
}

const useGetPostById = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postById", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<PostResponseProps>(
        `/post/find/${postId}`,
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

export default useGetPostById;
