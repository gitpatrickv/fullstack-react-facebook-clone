import { useQuery } from "@tanstack/react-query";
import { useAuthQueryStore } from "../../store/auth-store";
import { axiosInstance } from "../../services/api-client";
import { UserListProps } from "./useGetPostLikeUserList";

const apiClient = axiosInstance;

const useGetPostImageLikeUserList = (postImageId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  return useQuery({
    queryKey: ["postLikeImageUserList", postImageId],
    queryFn: async () => {
      const { data } = await apiClient.get<UserListProps[]>(
        `/post/${postImageId}/image/like/user/list`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!jwtToken && !!postImageId,
  });
};

export default useGetPostImageLikeUserList;
