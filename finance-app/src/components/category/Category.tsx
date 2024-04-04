import {  Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useDeleteCategory, useGetAllCategory} from "../../hooks/component";
import { SquareX ,SquarePen} from "lucide-react";
import { useState } from "react";
import { Pagination, Modal } from "antd";
import { InboxOutlined, ExclamationCircleFilled  } from "@ant-design/icons";
import Navbar from "../Navbar";
import AddCategory from "./AddCategory";
import { Navigate } from "react-router-dom"

const Budget = () => {
  const { confirm } = Modal;
  const { data} = useGetAllCategory();
  const {mutate: deleteMutate} = useDeleteCategory();
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const categories = data && data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  }

  const handleDelete = (id:number) => {
    deleteMutate(id);
  }

  const showDeleteConfirm = (id:number) => {
    confirm({
      title: 'Delete category',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure to delete this category?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
    });
  };

  return (
    <> {!token ? <Navigate to='/signin'></Navigate> :
    <div>
      <Navbar/>
      <div className="flex justify-end space-x-6 mt-10 mr-60">
        <AddCategory/>
      </div>
      <div className="flex mt-10">
        <div className="pl-60 pr-60 w-screen">
          <TableContainer>
            <Table variant='simple'>
              <Thead bgColor='whitesmoke'>
                <Tr>
                  <Th width="10%">Sr. no</Th>
                  <Th width="20%">Category Name</Th>
                  <Th width="10%" paddingLeft={10}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
              {categories && categories.map((category:any, index:number) => (
                  <Tr key={category.id}>
                    <Td>{indexOfFirstItem+index+1}</Td>
                    <Td>{category.categoryname}</Td>
                    <Td>
                      <div className="flex">
                        <button className="text-blue-600 ml-2"><SquarePen/></button>
                        <button className="ml-6 text-red-700 text-xl"
                          onClick={()=>showDeleteConfirm(category.id)}>
                          <SquareX />
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>

            </Table>
            <div className="flex justify-center mt-4 ">
              {!data && 
                <div>
                  <InboxOutlined className="text-6xl opacity-30"/> 
                  <p className="opacity-80">No Data</p>
                </div>
              }
            </div>
            <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center mb-12">
              {data &&  
                <Pagination 
                  defaultCurrent={1}
                  total={data.length}
                  pageSize={itemsPerPage}
                  onChange={handlePageChange}
                />
              }
            </div>
            
          </TableContainer>
        </div>
      </div>
    </div>
    }
    </>
  )
}

export default Budget;