import {  Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { useDeleteTransaction, useGetAllTransactions, useGetDataByCategory } from "../../hooks/component";
import { SquareX } from "lucide-react";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import UpdateTransaction from "./UpdateTransaction";
import { handleFilterChange } from "../../helper/helper";
import { ITransaction } from "../../types/type";

type Props = {
  frequency: string;
  category: string | null;
};

const ShowAllTransactions:React.FC<Props> = ({ frequency ,category}) => {
  const { data, isError, isLoading } = useGetAllTransactions();
  const {mutate: deleteMutate} = useDeleteTransaction();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = handleFilterChange(frequency, data);
  const transactions:Array<object> = filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  }

  const handleDelete = (id:number) => {
    deleteMutate(id);
  }

  return (
    <div className="flex mt-10">
      <div className="pl-24 pr-24 w-screen">
        <TableContainer>
          <Table variant='simple'>
            <Thead bgColor='whitesmoke'>
              <Tr>
                <Th width="10%">Sr. no</Th>
                <Th width="20%">Category</Th>
                <Th width="25%">Description</Th>
                <Th width="25%">Date</Th>
                <Th width="10%">Amount</Th>
                <Th width="10%" paddingLeft={10}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
            {transactions && transactions.map((transaction:any, index:number) => (
                <Tr key={transaction.id}>
                  <Td>{indexOfFirstItem+index+1}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>{transaction.description}</Td>
                  <Td>{new Date(transaction.date).toLocaleDateString('en-GB')}</Td>
                  <Td className="pl-5">{transaction.amount}</Td>
                  <Td>
                    <div className="flex">
                      <UpdateTransaction id={transaction.id}/>
                      <button className="ml-6 text-red-700 text-xl"
                        onClick={()=>handleDelete(transaction.id)}>
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
                total={filteredData.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            }
          </div>
          
        </TableContainer>
      </div>
    </div>
  )
}

export default ShowAllTransactions;