import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useRef } from "react";
import { useToast } from '@chakra-ui/react'
import { useAddTransaction, useGetAllCategory } from "../../hooks/component";
import { useQueryClient } from "@tanstack/react-query";

const AddTransaction = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const {mutate} = useAddTransaction();
  const {data} = useGetAllCategory();
  const queryClient = useQueryClient();

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = formData.get('category');
    const amount = parseFloat(event.target.elements.amount.value);
    const description = formData.get('description');
    const date = formData.get('date');
    const tag = "dummy";
    const transaction_id = Math.floor(Math.random() * 1000000);

    if(amount<=0){
      alert("Amount must be greater than 0");
      return
    }
    
    mutate({category,amount,description,date,tag,transaction_id},
      {
        onSuccess: () =>{
          toast({
            title: 'Transaction added successfully.',
            status:'success',
            duration: 2000,
            position: 'bottom-right',
            isClosable: true,
          })
          queryClient.invalidateQueries({queryKey:['alltransactions']});
          onClose();
        }
      });
  };

  return(
    <div>
      <Button onClick={onOpen} bgColor='smokewhite' fontWeight={4} pl={1} pr={2} mt={3} ml={16}>
        <Plus className="pr-2 text-md"/>Add transaction
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmit}>
          <ModalHeader>Add transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select name="category" ref={initialRef} placeholder='Select Category' required>
                {data && data.map((category:any)=> (
                  <option value={category.categoryname}>{category.categoryname}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input type="number" name='amount' placeholder='Amount' required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name='description' placeholder='Description'  required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date</FormLabel>
              <Input type='date' name='date' required/>
            </FormControl>

          </ModalBody>
          <ModalFooter>
            <Button type="submit" colorScheme='green' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddTransaction;