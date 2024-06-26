import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { SquarePen } from "lucide-react";
import { useRef } from "react";
import { useToast } from '@chakra-ui/react'
import { useGetAllCategory, useGetTransaction, useUpdateTransaction } from "../../hooks/component";
import { useQueryClient } from "@tanstack/react-query";

const UpdateTransaction = ({id}:{id:number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const queryClient = useQueryClient();
  const {data:allcategory} = useGetAllCategory();
  const {data:transaction} = useGetTransaction(id);
  const {mutate} = useUpdateTransaction();

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = formData.get('category');
    const amountStr = formData.get('amount');
    const amount = typeof amountStr === 'string' ? parseInt(amountStr) : NaN;
    const description = formData.get('description');
    const date = formData.get('date');
    const tag = "dummy";
    const transaction_id = Math.floor(Math.random() * 1000000);
    mutate({id,category,amount,description,date,tag,transaction_id},
      {
        onSuccess: () => {
          toast({
            title: "Transaction updated successfully",
            status: "success",
            duration: 1000,
            position: "bottom-right",
            isClosable: true,
          })
          queryClient.invalidateQueries({queryKey:['alltransactions']});
          queryClient.invalidateQueries({queryKey:['getTransaction',id]});
          onClose();
        }
     });
  };

  return(
    <div>
      <button onClick={onOpen}>
        <SquarePen className="text-blue-600 ml-2" />
      </button>
      {transaction  && 
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmit}>
          <ModalHeader>Update transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select name="category" ref={initialRef} defaultValue={transaction.category} required>
                {allcategory && allcategory.map((category:any)=> (
                  <option value={category.categoryname}>{category.categoryname}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input defaultValue={transaction?.amount} type="number" name='amount' placeholder='Amount' required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input defaultValue={transaction?.description} name='description' placeholder='Description'  required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input defaultValue={transaction?.date.split('T')[0]} type='date' name='date' required/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button type="submit" colorScheme='green' mr={3}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      }
    </div>
  )
}

export default UpdateTransaction;