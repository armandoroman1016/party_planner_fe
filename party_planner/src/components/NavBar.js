import React from "react"
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'


const NavBar = props => {

  return (

    <Menu>
      <NavLink to={`/dashboard/${localStorage.getItem('user_id')}`}>
        <Menu.Item header name="Celebratr"/>
      </NavLink>
      
      <Menu.Menu position= 'right'>
        <NavLink to="/login"
              id= 'login-logout'   
              className='item'     
              onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem('user_id');
              localStorage.removeItem("emailDisplay");
              localStorage.removeItem('persist:globalReducer')
            }}
        ><h3>{props.location.pathname === "/login" || props.location.pathname === "/register" ? "Login" : "Log Out"}</h3>
        </NavLink>

        {!localStorage.getItem('token') && <NavLink style={{marginLeft: '1rem'}}to='/register'><Menu.Item name='Register'/></NavLink>}

      </Menu.Menu>
    </Menu>
  )
}

export default NavBar
