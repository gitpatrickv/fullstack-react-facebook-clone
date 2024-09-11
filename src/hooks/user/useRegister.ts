import { useDisclosure } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { User, schema } from "../../entities/User";
import { axiosInstance } from "../../services/api-client";
import { useAuthQueryStore } from "../../store/auth-store";
import { useNavigate } from "react-router-dom";

const apiClient = axiosInstance;
const useRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<User>({ resolver: zodResolver(schema) });
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setJwtToken, setRole, setAuthUser } = useAuthQueryStore();

  const mutation = useMutation({
    mutationFn: (data: User) =>
      apiClient.post("/user/register", data).then((res) => res.data),

    onSuccess: (response) => {
      onClose();
      const jwtToken = response.jwtToken;
      setJwtToken(jwtToken);
      const role = response.role;
      setRole(role);
      const currentUser = response.authUser;
      setAuthUser(currentUser);

      if (role === "USER") {
        navigate("/home");
      }
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Registration failed", error);

      if (error.response?.data.email) {
        setError("email", {
          type: "server",
          message: error.response.data.email,
        });
      }

      if (error.response?.data.errorMessage) {
        setError("userModel", {
          type: "server",
          message: error.response.data.userModel,
        });
      }
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    setLoading(true);
    mutation.mutate(data);
  };

  return {
    register,
    handleSubmit,
    loading,
    onSubmit,
    errors,
    isOpen,
    onOpen,
    onClose,
    control,
  };
};

export default useRegister;
