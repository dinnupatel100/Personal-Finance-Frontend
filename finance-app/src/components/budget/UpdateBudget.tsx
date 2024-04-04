import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useDisclosure } from "@chakra-ui/react";
import { SquarePen } from "lucide-react";
import  { useRef } from "react";
import { useGetAllCategory, useGetBudget, useUpdateBudget } from "../../hooks/component";

const UpdateBudget = ({id}:{id:number}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const {data:allcategory} = useGetAllCategory();
  const {data:budget} = useGetBudget(id);
  const {mutate} = useUpdateBudget();

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const category = formData.get('category');
    const amountStr = formData.get('amount');
    const amount = typeof amountStr === 'string' ? parseInt(amountStr) : NaN;
    const startperiod = formData.get('startperiod');
    const endperiod = formData.get('endperiod');
    mutate({id,category,amount,startperiod,endperiod},
      {
        onSuccess: () => {
          onClose();
        }
     });
  };

  return(
    <div>
      <button onClick={onOpen}>
        <SquarePen className="text-blue-600 ml-2" />
      </button>
      {budget  && 
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={onSubmit}>
          <ModalHeader>Update Budget</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Category</FormLabel>
              <Select name="category" ref={initialRef} defaultValue={budget.category} required>
                {allcategory && allcategory.map((category:any)=> (
                  <option value={category.categoryname}>{category.categoryname}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input defaultValue={budget?.amount} type="number" name='amount' placeholder='Amount' required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>From</FormLabel>
              <Input defaultValue={budget?.startperiod.split('T')[0]} type='date' name='startperiod' required/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>To</FormLabel>
              <Input defaultValue={budget?.endperiod.split('T')[0]} type='date' name='endperiod' required/>
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

export default UpdateBudget;