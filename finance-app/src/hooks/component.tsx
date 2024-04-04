import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { ICategory, ITransaction } from "../types/type";
import axios from "axios";

const token = localStorage.getItem('token');

export const useAddCategory = () => {
  const toast = useToast();
  return useMutation({
    mutationKey: ["addCategory"],
    mutationFn: async(categoryName: ICategory) => {
      return await axios.post(process.env.REACT_APP_BASE_URL+"/api/addcategory",
      {categoryName},
      {
          headers: {
            Authorization: token
          }
        }
        )
      },
      onError: () => {
      toast({
        title: "Failed to add category",
        status: "error",
        duration: 2000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useAddTransaction = () => {
  const toast = useToast();
  return useMutation({
    mutationKey: ["addTransaction"],
    mutationFn: async(transaction:any) => {
      return await axios.post(process.env.REACT_APP_BASE_URL+"/api/addtransaction",
      transaction,
      {
        headers: {
            Authorization: token
          }
        }
        )
      },
      onError: () => {
      toast({
        title: "Failed to add transaction",
        status: "error",
        duration: 2000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useAddBudget = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["addBudget"],
    mutationFn: async(budget:any) => {
      return await axios.post(process.env.REACT_APP_BASE_URL+"/api/addbudget",
      budget,
      {
        headers: {
            Authorization: token
          }
        }
        )
    },
    onSuccess:() => {
      toast({
        title: 'Budget added successfully.',
        status:'success',
        duration: 2000,
        position: 'bottom-right',
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['allbudget']});
    },
    onError: () => {
      toast({
        title: "Failed to add budget",
        status: "error",
        duration: 2000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useGetAllTransactions = () => {
  return useQuery({
    queryKey: ['alltransactions'],
    queryFn: async() => {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/getalltransaction",
      {
        headers: {
          Authorization: token
        }
      }
      );
      return res.data;
    },
  })
}

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['allcategory'],
    queryFn: async() => {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/getallcategory",
      {
        headers: {
            Authorization: token
          }
        }
      );
      return res.data as {id:number, categoryname: string}[];
    },
  })
}

export const useDeleteTransaction = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteTransaction"],
    mutationFn: async(id:number) => {
      return await axios.delete(process.env.REACT_APP_BASE_URL+"/api/deletetransaction?id="+id,
        {
          headers: {
            Authorization: token
          }
        }
      )
    },
    onSuccess: () => {
      toast({
        title: "Transaction deleted successfully",
        status: "success",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['alltransactions']});
    },
    onError: () => {
      toast({
        title: "Failed to delete transaction",
        status: "error",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useUpdateTransaction = () => {
  const toast = useToast();
  
  return useMutation({
    mutationKey: ["updateTransaction"],
    mutationFn: async(transaction:any) => {
      return await axios.put(process.env.REACT_APP_BASE_URL+"/api/updatetransaction?id="+transaction.id,
        transaction,
        {
          headers: {
            Authorization: token
          }
        }
      )
    },
    onError: () => {
      toast({
        title: "Failed to update transaction",
        status: "error",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useGetAllBudget = () => { 
  return useQuery({
    queryKey: ['allbudget'],
    queryFn: async() => {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/getallbudget",
        {
          headers: {
            Authorization: token
          }
        }
      );
      return res.data as {ID:number, category:string, amount:number, startperiod:string, endperiod:string}[];
    },
  })
}

export const useDeleteBudget = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deleteBudget"],
    mutationFn: async(id:number) => {
      return await axios.delete(process.env.REACT_APP_BASE_URL+"/api/deletebudget?id="+id,
        {
          headers: {
            Authorization: token
          }
        }
      )
    },
    onSuccess: () => {
      toast({
        title: "Budget deleted successfully",
        status: "success",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['allbudget']});
    },
    onError: () => {
      toast({
        title: "Failed to delete budget",
        status: "error",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}

export const useDeleteCategory = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletecategory"],
    mutationFn: async(id:number) => {
      return await axios.delete(process.env.REACT_APP_BASE_URL+"/api/deletecategory?id="+id,
        {
          headers: {
            Authorization: token
          }
        }
      )
    },
    onSuccess: () => {
      toast({
        title: "category deleted successfully",
        status: "success",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['allcategory']});
    },
    onError: () => {
      toast({
        title: "Failed to delete category",
        status: "error",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
} 

export const useGetDataByCategory = (category:string) => {
    return useQuery({
      queryKey: ['dataByCategory', category],
      queryFn: async() => {
        const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/getonetransaction?category="+category,
          {
            headers: {
              Authorization: token
            }
          }
        );
        return res.data as ITransaction[]
      },
    })  
}

export const useGetTransaction = (id:number) => {
  return useQuery({
    queryKey: ['getTransaction',id],
    queryFn: async() => {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/gettransactionbyid?id="+id,
        {
          headers: {
            Authorization: token
          }
        }
      );
      return res.data as ITransaction
    },
  })  
}

export const useGetBudget = (id:number) => {
  return useQuery({
    queryKey: ['getBudget',id],
    queryFn: async() => {
      const res = await axios.get(process.env.REACT_APP_BASE_URL+"/api/getbudgetbyid?id="+id,
        {
          headers: {
            Authorization: token
          }
        }
      );
      return res.data as {ID:number, category:string, amount:number, startperiod:string, endperiod:string}
    },
  })
}

export const useUpdateBudget = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateBudget"],
    mutationFn: async(budget:any) => {
      return await axios.put(process.env.REACT_APP_BASE_URL+"/api/updatebudget?id="+budget.id,
        budget,
        {
          headers: {
            Authorization: token
          }
        }
      )
    },
    onSuccess: () => {
      toast({
        title: "Budget updated successfully",
        status: "success",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      })
      queryClient.invalidateQueries({queryKey:['allbudget']});
    },
    onError: () => {
      toast({
        title: "Failed to update budget",
        status: "error",
        duration: 1000,
        position: "bottom-right",
        isClosable: true,
      });
    }
  })
}