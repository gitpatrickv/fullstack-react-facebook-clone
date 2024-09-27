import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface UploadUserImageProps {
  file: File;
  jwtToken: string;
  imageType: string;
}

const apiClient = axiosInstance;

const useUploadUserImage = () => {
  const toast = useToast();

  const queryClient = useQueryClient();
  const mutation = useMutation(
    async ({ file, jwtToken, imageType }: UploadUserImageProps) => {
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await apiClient.post(
        `/user/profile/picture/upload/${imageType}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["userPostList"]);
        queryClient.invalidateQueries(["userProfile"]);
      },
      onError: (error: any) => {
        console.error(
          "Error uploading photo: File size is too big. Only PNG and JPEG formats are accepted.",
          error
        );

        if (error.response?.data.errorMessage) {
          toast({
            title: "Error uploading image.",
            description: error.response.data.errorMessage,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      },
    }
  );

  return mutation;
};

export default useUploadUserImage;
