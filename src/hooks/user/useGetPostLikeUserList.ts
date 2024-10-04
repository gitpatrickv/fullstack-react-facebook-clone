import { useQuery } from "@tanstack/react-query";
import { useAuthQueryStore } from "../../store/auth-store";
import { axiosInstance } from "../../services/api-client";

const apiClient = axiosInstance;

export interface UserListProps {
  postLikeId: number;
  userId: number;
  firstName: string;
  lastName: string;
}

const useGetPostLikeUserList = (postId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postLikeUserList", postId],
    queryFn: async () => {
      const { data } = await apiClient.get<UserListProps[]>(
        `/post/${postId}/like/user/list`,
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

export default useGetPostLikeUserList;
