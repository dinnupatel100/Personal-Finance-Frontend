import { useMutation } from "@tanstack/react-query"
import { IUser, IUserLogin } from "../types/type"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";


export const useAddUser = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["addUser"],
    mutationFn: async(user: IUser) => {
      return await axios.post(process.env.REACT_APP_BASE_URL+"/signup", user)
    },
    onSuccess:()=>{
      toast({
        title: 'Account created successfully.',
        status: 'success',
        duration: 2000,
        position: 'top-right',
        isClosable: true,
      })
      navigate('/signin');
    },
    onError: (error) => {
      toast({
        title: error.message || "An error occurred.",
        status: "error",
        duration: 2000,
        position: "top-right",
        isClosable: true,
      });
    }
  })
}


export const useLoginUser = () => {
  const toast = useToast();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: async(user: IUserLogin) => {
      return await axios.post(process.env.REACT_APP_BASE_URL+"/login", user)
    },
    onSuccess:(response)=>{
      toast({
        title: 'Signed in successfully',
        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      })
      localStorage.setItem('token', response.data.token)
      navigate('/')
    },
    onError:(error)=>{
      if(error.message === "Request failed with status code 400"){
        toast({
          title: 'Invalid email or password',
          status: 'error',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
      }
      else{
        toast({
          title: 'Server Error',
          status: 'error',
          duration: 3000,
          position: 'top-right',
          isClosable: true,
        })
      }
    }
  })
}