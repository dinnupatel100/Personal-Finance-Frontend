import {Navigate} from 'react-router-dom'

const Error = () => {
  const token = localStorage.getItem('token');
  return (
    <> 
    {!token ? <Navigate to='/signin'></Navigate> :
    <h1>Page not found</h1>
    }
    </>
    
  )
}

export default Error