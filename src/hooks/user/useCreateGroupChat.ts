import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

export interface CreateGroupChatProps {
  userId: number;
  friendId: number[];
  text: string;
}

const apiClient = axiosInstance;

const useCreateGroupChat = () => {
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useMutation(
    async ({ userId, friendId, text }: CreateGroupChatProps) => {
      const response = await apiClient.post(
        `/chat/group/create/${userId}`,
        { friendId, text },
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
      },
      onError: (error) => {
        console.error("error creating group chat", error);
      },
    }
  );
};

export default useCreateGroupChat;
