import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

interface Props {
  userId: number;
  friendId: number;
}

const useChatUser = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();

  return useMutation(
    async ({ userId, friendId }: Props) => {
      const response = await apiClient.post(
        `/chat/${userId}/${friendId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["userChatList"]);
        queryClient.invalidateQueries(["chatById"]);
      },
    }
  );
};

export default useChatUser;
