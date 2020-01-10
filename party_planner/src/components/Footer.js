import React from 'react'


const Footer = () => {
  return(
    <footer>
      <div className= "footer-content">
        <a>Contact Us </a>
        <a>Support</a>
        <a>Privacy Policy</a>
      </div>

      <div className= "copywrite-tos">
        <p>{'\u00A9'}  2019 Party Planner</p>
        <p>Terms and Conditions</p>
      </div>
    </footer>
  )
} 
export default Footer