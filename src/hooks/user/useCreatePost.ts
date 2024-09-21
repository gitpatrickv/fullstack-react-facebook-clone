import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface CreatePostProps {
  content?: string;
  file?: FileList;
}

const apiClient = axiosInstance;

const useCreatePost = () => {
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<CreatePostProps>();

  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post("/post/save", formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        //   queryClient.invalidateQueries(['storeProduct']);
        setLoading(false);
        reset();
      },
      onError: (error: any) => {
        console.error("Error posting:", error);
        setLoading(false);
      },
    }
  );

  const onSubmit: SubmitHandler<CreatePostProps> = async (data) => {
    setLoading(true);
    console.log(data);
    console.log(data.content);
    const formData = new FormData();

    if (data.content) {
      formData.append("post", data.content || "");
    }
    if (data.file && data.file.length > 0) {
      Array.from(data.file).forEach((file) => {
        formData.append("file", file);
      });
    }

    await mutation.mutate(formData);
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    loading,
  };
};

export default useCreatePost;
