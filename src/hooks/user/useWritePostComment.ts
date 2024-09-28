import { SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@chakra-ui/react";

interface WriteCommentProps {
  comment?: string;
  file?: FileList;
}

const apiClient = axiosInstance;

const useWritePostComment = (postId: number) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { authStore } = useAuthQueryStore();
  const jwtToken = authStore.jwtToken;
  const { register, handleSubmit, reset, setValue } =
    useForm<WriteCommentProps>();
  const [loading, setLoading] = useState(false);
  const mutation = useMutation(
    (formData: FormData) =>
      apiClient.post(`/post/${postId}/comment`, formData, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      }),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postCommentList", postId]);
        queryClient.invalidateQueries(["postCommentCount", postId]);
        setLoading(false);
        reset();
      },
      onError: (error: any) => {
        console.error("Error posting:", error);
        setLoading(false);

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

  const onSubmit: SubmitHandler<WriteCommentProps> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    if (data.comment) {
      formData.append("comment", data.comment || "");
    }
    if (data.file) {
      formData.append("file", data.file[0]);
    }
    await mutation.mutate(formData);
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
  };
};

export default useWritePostComment;
