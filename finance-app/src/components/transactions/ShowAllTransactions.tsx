import { Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react"
import { useDeleteTransaction, useGetAllTransactions, useGetDataByCategory } from "../../hooks/component";
import { SquareX } from "lucide-react";
import { useState } from "react";
import { Modal, Empty, Pagination } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';
import UpdateTransaction from "./UpdateTransaction";
import { handleFilterChange } from "../../helper/util";
import { ITransaction } from "../../types/type";
import React from "react";

type Props = {
  frequency: string;
  category: string
};

const ShowAllTransactions:React.FC<Props> = ({ frequency, category}) => {
  const { confirm } = Modal;
  const { data, isError, isLoading } = useGetAllTransactions();
  const {mutate: deleteMutate} = useDeleteTransaction();
  const res = useGetDataByCategory(category);
  const filteredDataByCategory = res.data || [] as (ITransaction[]);
  const filteredData = category !='' ? handleFilterChange(frequency, filteredDataByCategory): handleFilterChange(frequency, data);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const transactions:Array<object> = filteredData && filteredData.slice(indexOfFirstItem, indexOfLastItem)
  
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  }

  const handleDelete = (id:number) => {
    deleteMutate(id);
  }

  const showDeleteConfirm = (id:number) => {
    confirm({
      title: 'Delete Transaction',
      icon: <ExclamationCircleFilled />,
      content: 'Are you sure delete this transaction?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
    });
  };

  return (
    <div className="flex mt-14">
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
                      <button className='ml-6 text-red-700 text-xl'
                        onClick={()=>showDeleteConfirm(transaction.id)}>
                        <SquareX />
                      </button>
                      
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>

          </Table>
          <div className="flex justify-center mt-4">
            {!filteredData.length && 
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            }
          </div>
          <div className="fixed bottom-0 mt-20 left-1/2 transform -translate-x-1/2 flex justify-center mb-12">
            {data &&  
              <Pagination 
                defaultCurrent={1}
                total={filteredData.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
              />
            }
          </div>
          <div className="mt-20"></div>
        </TableContainer>
      </div>
    </div>
  )
}

export default ShowAllTransactions;