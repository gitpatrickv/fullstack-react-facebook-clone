import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";

interface UploadUserImageProps {
  file: File;
  jwtToken: string;
  imageType: string;
}

const apiClient = axiosInstance;

const useUploadUserImage = () => {
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
      },
      onError: (error) => {
        console.error(
          "Error uploading photo: File size is too big. Only PNG and JPEG formats are accepted.",
          error
        );
      },
    }
  );

  return mutation;
};

export default useUploadUserImage;
