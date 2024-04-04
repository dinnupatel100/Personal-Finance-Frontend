import { AreaChart, Text } from "lucide-react"
import AddTransaction from "./transactions/AddTransaction"
import Navbar from "./Navbar"
import ShowExpenses from "./transactions/ShowAllTransactions"
import { useState } from "react"
import CategoryPieChart from "./charts/CategoryPieChart"
import { DatePicker, Select } from "antd"
import { useGetAllCategory } from "../hooks/component"
import { Navigate} from "react-router-dom"

const {Option} = Select;
const { RangePicker } = DatePicker;

const Home = () => {
  const [page, setPage] = useState(1);
  const [selectedFrequency, setSelectedFrequency] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const {data} = useGetAllCategory();
  const token = localStorage.getItem('token');
  
  const handleCategoryChange = (category:string) => {
    setSelectedCategory(category);
  }

  const handleFrequencyChange = (frequency:string) => {
    setSelectedFrequency(frequency);
  }

  return(
    <>
    {!token ? <Navigate to='/signin'></Navigate> :
    <div className="">
      <Navbar/>
      <div className="flex justify-end space-x-6 mt-10 mr-24">
        <div>
          <p>Select Frequency</p>
          <Select 
            placeholder = "Select"
            className="h-8 mr-12 w-32"
            onChange={(value) => handleFrequencyChange(value)}
          >
              <Option value="week">Last Week</Option>
              <Option value="month">Last Month</Option>
              <Option value="year">Last Year</Option>
          </Select>
        </div>
        <div>
          <p>Select Date Range</p>
          <RangePicker 
            className="h-8 mr-12 w-56" 
          />
        </div>
        <div>
          <p>Filter by Category</p>
          <Select
            placeholder="Select Category"
            className="h-8 mr-12 w-36"
            onChange={(value) => handleCategoryChange(value)}
          > 
            {data && data.map((category:{id:number, categoryname:string}) =>(
              <Option value={category.categoryname}>{category.categoryname}</Option>
            ))}
          </Select>
        </div>
        <div className="border-solid border-2 border-gray-300 rounded-lg h-11 mt-3">
          <button onClick={()=>setPage(1)}><Text className="mt-2 mr-6 ml-4"/></button>
          <button onClick={()=>setPage(2)}><AreaChart className="mr-4 mt-2"/></button>
        </div>
        <AddTransaction/>
      </div>
      {page===1 ? <ShowExpenses frequency={selectedFrequency} category={selectedCategory}/> : <CategoryPieChart frequency={selectedFrequency}/>}
    </div>
    }
    </>
  )
}

export default Home