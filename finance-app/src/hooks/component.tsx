import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { ICategory, ITransaction } from "../types/type";
import axios from "axios";
import { useEffect, useState } from "react";

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
        position: "top-right",
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
        position: "top-right",
        isClosable: true,
      });
    }
  })
}

export const useAddBudget = () => {
  const toast = useToast();
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
    onError: () => {
      toast({
        title: "Failed to add budget",
        status: "error",
        duration: 2000,
        position: "top-right",
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
        position: "top-right",
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['alltransactions']});
    },
    onError: () => {
      toast({
        title: "Failed to delete transaction",
        status: "error",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
    }
  })
}

export const useUpdateTransaction = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  
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
    onSuccess: () => {
      toast({
        title: "Transaction updated successfully",
        status: "success",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
      queryClient.invalidateQueries({queryKey:['alltransactions']});
    },
    onError: () => {
      toast({
        title: "Failed to update transaction",
        status: "error",
        duration: 1000,
        position: "top-right",
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
        position: "top-right",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete budget",
        status: "error",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
    }
  })
}

export const useDeleteCategory = () => {
  const toast = useToast();
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
        position: "top-right",
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Failed to delete category",
        status: "error",
        duration: 1000,
        position: "top-right",
        isClosable: true,
      });
    }
  })
} 

export const useGetDataByCategory = (category:string | null) => {
    return useQuery({
      queryKey: ['dataByCategory', 'category'],
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



// export const useGetDataByCategory = (category: string | null) => {
//   const [data, setData] = useState<ITransaction[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//           const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/getonetransaction?category=${category}`, {
//             headers: {
//               Authorization: token, // assuming token is defined
//             },
//           });
//           return res.data as ITransaction;
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         return null;
//       }
//     };

//     const fetchDataAndUpdateState = async () => {
//       const newData = await Promise.all([fetchData()]);
//       const filteredData = newData.filter((item) => item !== null) as ITransaction[];
//       setData(filteredData);
//     };
//     fetchDataAndUpdateState();
//   }, [category]);

//   return data;
// };