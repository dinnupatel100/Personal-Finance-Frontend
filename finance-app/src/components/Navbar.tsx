import { useToast } from "@chakra-ui/react"
import { CircleUserRound, LogOut } from "lucide-react"
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = () => {
    localStorage.removeItem('token');
    toast({
      title: 'Logged out successfully',
      status:'success',
      position: 'bottom',
      duration: 2000,
      isClosable: true,
    });
    navigate('/signin');
  }

  return (
    <div className="flex bg-teal-200 h-16">
      <div className="flex flex-grow ml-6">
        <p className="mt-4 text-xl font-sans font-normal">SpendSmart</p>
        <button 
          className="ml-40 mt-4 h-9 hover:underline"
          onClick={()=>navigate('/')}>
          Home
        </button>
        <button 
          className="text-base mt-4 h-9 ml-10 hover:underline"
          onClick={()=>navigate('/budget')}>
            Budget
        </button>
        <button 
          className="text-base mt-4 h-9 ml-10 hover:underline"
          onClick={()=>navigate('/category')}>
            Category
        </button>
      </div>
      <div className="flex mt-2 mr-16 text-base">
        <p className="flex mr-10 text-base mt-4 "><CircleUserRound className="mr-2"/>Hi, Dinesh</p>
        <button 
          className="flex bg-teal-300 mt-2 border-solid border-2 border-teal-300 rounded-lg px-2 py-1 h-9 hover:bg-teal-200"
          onClick={handleLogout}>
          logout 
          <LogOut className="ml-2"/>
        </button>
      </div>
      
    </div>
  )
}

export default Navbar


