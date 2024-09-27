import { useQuery } from "@tanstack/react-query";
import { User } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";

const apiClient = axiosInstance;

const useGetUserProfileInfo = (userId: number) => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;

  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: async () => {
      const { data } = await apiClient.get<User>(`/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      return data;
    },

    enabled: !!jwtToken,
  });
};

export default useGetUserProfileInfo;
