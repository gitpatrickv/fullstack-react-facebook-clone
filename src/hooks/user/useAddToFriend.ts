import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useAddToFriend = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mutation = useMutation(
    async (strangerUserId: number) => {
      await apiClient.post(
        `/friends/add/${strangerUserId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        setIsLoading(false);
      },
    }
  );

  return { mutation, isLoading, setIsLoading };
};

export default useAddToFriend;
