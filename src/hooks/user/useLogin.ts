import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuthQueryStore } from '../../store/auth-store';
import { axiosInstance } from '../../services/api-client';

interface FormData {
    email: string;
    password: string;
  }
  

const apiClient = axiosInstance;

const useLogin = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setJwtToken, setRole, setAuthUser} = useAuthQueryStore();

    const mutation = useMutation({
        mutationFn: (data: FormData) => apiClient.post("/user/login", data)
        .then((res) => res.data),
     
        onSuccess: (response) => {
            const jwtToken = response.jwtToken;
            setJwtToken(jwtToken); 
            const currentUser = response.currentUser;
            setAuthUser(currentUser);
            const role = response.role;
            setRole(role);
            setLoading(false);
            if(role==="USER"){
                navigate("/home")
            }
        }
    })

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setLoading(true);
        mutation.mutate(data);
      };

      return {
        register,
        handleSubmit,
        loading,
        onSubmit,
        errors
      };
}

export default useLogin