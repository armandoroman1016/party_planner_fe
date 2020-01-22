import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation()

  const isAuthLocation = location.pathname.includes('login') || location.pathname.includes('register')
  const isRegister = location.pathname.includes('register')

  let namedClass 

  if (isRegister){
    namedClass = 'register'
  }

  return(
    <footer className = {
      isAuthLocation ? `${namedClass} auth footer` : 'footer'
    }>
      <div className= "footer-content">
        <p>{'\u00A9'}  2020 Celebratr</p>
      </div>
    </footer>
  )
} 
export default Footer