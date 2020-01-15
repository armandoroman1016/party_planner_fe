import React from "react"
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


const NavBar = props => {

  const { pathname } = props.location

  return (

    <Menu>
      <NavLink to={`/dashboard/${localStorage.getItem('user_id')}`}>
        <Menu.Item header name="Celebratr"/>
      </NavLink>
      
      <Menu.Menu position= 'right'>

        {pathname === "/login" ?
            <NavLink to="/register"
              id= 'login-logout'   
              className='item'     
              onClick={()=>{
                localStorage.removeItem("token");
                localStorage.removeItem('user_id');
                localStorage.removeItem("emailDisplay");
                localStorage.removeItem('persist:globalReducer')
              }}><h3>Register</h3></NavLink>
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
          }}><h3>Login</h3></NavLink>
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
    }}><h3>logout</h3></NavLink>
      : null
    }


      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
