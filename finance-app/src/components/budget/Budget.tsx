import {  Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useDeleteBudget, useDeleteTransaction, useGetAllBudget, useGetAllTransactions } from "../../hooks/component";
import { SquareX } from "lucide-react";
import { useState } from "react";
import { Pagination, Modal } from "antd";
import { InboxOutlined,ExclamationCircleFilled } from "@ant-design/icons";
import Navbar from "../Navbar";
import AddBudget from "./AddBudget";
import UpdateBudget from "./UpdateBudget";
import { Navigate} from "react-router-dom"

const Budget = () => {
  const { confirm } = Modal;
  const { data, isError, isLoading } = useGetAllBudget();
  const {mutate: deleteMutate} = useDeleteBudget();
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const budgets = data && data.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  }

  const handleDelete = (id:number) => {
    deleteMutate(id);
  }

  const showDeleteConfirm = (id:number) => {
    confirm({
      title: 'Delete Budget',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure to delete this budget?',
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
      <div className="flex justify-end space-x-6 mt-10 mr-28">
        <AddBudget/>
      </div>
      <div className="flex justify-center mt-10">
        <div className=" w-5/6">
          <TableContainer>
            <Table variant='simple'>
              <Thead bgColor='whitesmoke'>
                <Tr>
                  <Th width="10%">Sr. no</Th>
                  <Th width="20%">Category</Th>
                  <Th width="20%">Amount</Th>
                  <Th width="20%">From</Th>
                  <Th width="20%">To</Th>
                  <Th width="10%" paddingLeft={10}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
              {budgets && budgets.map((budget:any, index:number) => (
                  <Tr key={budget.ID}>
                    <Td>{indexOfFirstItem+index+1}</Td>
                    <Td>{budget.category}</Td>
                    <Td className="pl-5">{budget.amount}</Td>
                    <Td>{new Date(budget.startperiod).toLocaleDateString('en-GB')}</Td>
                    <Td>{new Date(budget.endperiod).toLocaleDateString('en-GB')}</Td>
                    <Td>
                      <div className="flex">
                        <UpdateBudget id={budget.ID}/>
                        <button className="ml-6 text-red-700 text-xl"
                          onClick={()=>showDeleteConfirm(budget.ID)}>
                          <SquareX />
                        </button>
                      </div>
                    </Td>
                  </Tr>
                ))}
              </Tbody>

            </Table>
            <div className="flex justify-center mt-4">
              {!data && 
                <div>
                  <InboxOutlined className="text-6xl opacity-30"/> 
                  <p className="opacity-80">No Data</p>
                </div>
              }
            </div>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center mb-12">
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