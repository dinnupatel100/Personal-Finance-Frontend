import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { Plus, SquarePen } from "lucide-react";
import React, { useRef } from "react";
import { useToast } from '@chakra-ui/react'
import { number } from "yup";
import { useAddTransaction, useGetAllCategory, useUpdateTransaction, } from "../../hooks/component";

const UpdateTransaction = ({id}:{id:number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const {data:allcategory} = useGetAllCategory();
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
        onSuccess: () =>{
          toast({
            title: 'Transaction updated successfully.',
            status:'success',
            duration: 2000,
            position: 'top-right',
            isClosable: true,
          })
          onClose();
        }
      });
  };

  return(
    <div>
      <button onClick={onOpen}>
        <SquarePen className="text-blue-600 ml-2" />
      </button>
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
              <Select name="category" ref={initialRef} placeholder='Select Category' required>
                {allcategory && allcategory.map((category:any)=> (
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
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default UpdateTransaction;