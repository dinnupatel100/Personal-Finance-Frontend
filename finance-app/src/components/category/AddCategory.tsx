import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import React from "react";
import { useToast } from '@chakra-ui/react'
import { useAddCategory } from "../../hooks/component";
import { useQueryClient } from "@tanstack/react-query";

const AddCategory = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const toast = useToast();
  const queryClient = useQueryClient();
  const {mutate, isPending} = useAddCategory()

  const onSubmit = async (event:any) => {
    event.preventDefault();
    const categoryName = event.target.elements.category.value;
    mutate(categoryName,
      {
        onSuccess: () =>{
          toast({
            title: 'Category added successfully.',
            status: 'success',
            duration: 2000,
            position: 'bottom-right',
            isClosable: true,
          })
          queryClient.invalidateQueries({queryKey:['allcategory']});
          onClose();
        }
      })
  };
  
  return(
    <div>
    <Button onClick={onOpen} bgColor='smokewhite' fontWeight={4} pl={1} pr={2} ml={40} mt={3}>
      <Plus className="pr-2 text-md"/>Add category
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
          <ModalHeader>Add Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input name="category" ref={initialRef} placeholder="Category name" required/>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddCategory;

