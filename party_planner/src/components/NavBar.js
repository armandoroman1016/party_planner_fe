import React from "react"
import { Link } from 'react-router-dom'


const NavBar = props => {

  const { pathname } = props.location

  const isAuthLocation = pathname.includes('login') || pathname.includes('register')


  return (

    <div className = {isAuthLocation ? 'auth nav-bar' : 'nav-bar'}>
      <Link to={`/dashboard/${localStorage.getItem('user_id')}`} className = 'celebratr'>
        Celebratr
      </Link>
      
      
        {pathname === "/login" ?
            <Link to="/register"
                 
              className='item'     
              onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem('user_id');
                localStorage.removeItem("emailDisplay");
                localStorage.removeItem('persist:globalReducer')
              }}>Register</Link>
            : null
        }

        {pathname === "/register" ?
        <Link to="/login"
            
          className='item'     
          onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem('user_id');
            localStorage.removeItem("emailDisplay");
            localStorage.removeItem('persist:globalReducer')
          }}>Login</Link>
        : null
    }

    {pathname !== '/login' && pathname !== '/register' ?
    <Link to="/login"
        
      className='item'     
      onClick={()=>{
      localStorage.removeItem("token");
      localStorage.removeItem('user_id');
      localStorage.removeItem("emailDisplay");
      localStorage.removeItem('persist:globalReducer')
    }}>logout</Link>
      : null
    }
      
    </div>
  )
}

export default NavBar
