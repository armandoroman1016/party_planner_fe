import React from 'react'
import { useLocation } from 'react-router-dom'

const Footer = () => {

  const location = useLocation()

  const isAuthLocation = location.pathname.includes('login') || location.pathname.includes('register')

  return(
    <footer className = {isAuthLocation ? 'auth footer' : 'footer'}>
      <div className= "footer-content">
        <p>{'\u00A9'}  2020 Celebratr</p>
      </div>
    </footer>
  )
} 
export default Footer