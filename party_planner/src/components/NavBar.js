import React from "react"
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


const NavBar = props => {

  const { pathname } = props.location

  const isAuthLocation = pathname.includes('login') || pathname.includes('register')

  return (

    <div className = {isAuthLocation ? 'auth nav-bar' : 'nav-bar'}>
      <NavLink to={`/dashboard/${localStorage.getItem('user_id')}`} className = 'celebratr'>
        Celebratr
      </NavLink>
      
      <div>
        {pathname === "/login" ?
            <NavLink to="/register"
              id= 'login-logout'   
              className='item'     
              onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem('user_id');
                localStorage.removeItem("emailDisplay");
                localStorage.removeItem('persist:globalReducer')
              }}>Register</NavLink>
            : null
        }

        {pathname === "/register" ?
        <NavLink to="/login"
          id= 'login-logout'   
          className='item'     
          onClick={()=>{
            localStorage.removeItem("token");
            localStorage.removeItem('user_id');
            localStorage.removeItem("emailDisplay");
            localStorage.removeItem('persist:globalReducer')
          }}>Login</NavLink>
        : null
    }

    {pathname !== '/login' && pathname !== '/register' ?
    <NavLink to="/login"
      id= 'login-logout'   
      className='item'     
      onClick={()=>{
      localStorage.removeItem("token");
      localStorage.removeItem('user_id');
      localStorage.removeItem("emailDisplay");
      localStorage.removeItem('persist:globalReducer')
    }}>logout</NavLink>
      : null
    }
      </div>
    </div>
  )
}

export default NavBar
