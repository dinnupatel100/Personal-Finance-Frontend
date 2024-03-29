import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Error from './components/Error';
import Home from './components/Home';
import { ChakraProvider } from '@chakra-ui/react';
import Budget from './components/budget/Budget';
import Category from './components/category/Category';
import SignIn from './components/SignIn';

const queryClient = new QueryClient();

function App() {

  return  (
  <>
    <BrowserRouter>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path= '/budget' element={<Budget/>}/>
          <Route path= '/category' element={<Category/>}/>
          <Route path= '*' element={<Error/>}/>
        </Routes>
      </QueryClientProvider>
    </ChakraProvider>
    </BrowserRouter>
    </>
  )
}

export default App;