import React, { useRef } from "react";
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure, useToast } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { useAddBudget, useGetAllCategory } from "../../hooks/component";


const AddBudget = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const toast = useToast();
  const token = localStorage.getItem('token');
  const {mutate} = useAddBudget();
  const {data, isError, isLoading} = useGetAllCategory();

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const category = event.target.elements.category.value;
    const amountStr = event.target.elements.amount.value;
    const amount = typeof amountStr === 'string' ? parseFloat(amountStr) : NaN;
    const startperiod = event.target.elements.from.value;
    const endperiod = event.target.elements.to.value;
    mutate({category,amount,startperiod,endperiod},{
      onSuccess:() => {
        toast({
          title: 'Budget added successfully.',
          status:'success',
          duration: 2000,
          position: 'top-right',
          isClosable: true,
        });
        onClose();
      }
    });
  };

  return (
    <div>
      <Button onClick={onOpen} bgColor='smokewhite' fontWeight={4} pl={1} pr={2} mt={3}> 
        <Plus className="pr-2 text-md" />
        Add Budget
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmit}>
          <ModalHeader>Add Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              <FormControl>
                <Select name="category" required placeholder='Select Category' ref={initialRef}>
                {data && data.map((category:any)=> (
                  <option value={category.categoryname}>{category.categoryname}</option>
                ))}
                </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Amount</FormLabel>
                <Input type="number" name="amount" placeholder='Amount' required/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>From</FormLabel>
                <Input name="from" type='date' required/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>To</FormLabel>
                <Input name="to" type='date' required/>
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

export default AddBudget;
