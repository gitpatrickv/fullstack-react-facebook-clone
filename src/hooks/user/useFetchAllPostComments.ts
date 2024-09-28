import { useQuery } from "@tanstack/react-query";
import PostCommentListResponse from "../../entities/PostComment";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

interface PaginateProps {
  postId: number;
  pageNo: number;
  pageSize: number;
}
const apiClient = axiosInstance;

const useFetchAllPostComments = ({
  postId,
  pageNo,
  pageSize,
}: PaginateProps) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useQuery({
    queryKey: ["postCommentList", postId, pageNo, pageSize],
    queryFn: async () => {
      const { data } = await apiClient.get<PostCommentListResponse>(
        `/post/${postId}/comment`,
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

export default useFetchAllPostComments;
