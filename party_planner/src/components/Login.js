import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from 'react-redux'
import { handleSuccessfulLogin } from '../actions/LogInActions'
import { getEvents } from '../actions/eventActions'
import { Button } from 'semantic-ui-react'
import useWindowSize from '../utils/UseWindowSize'
import ClipLoader from "react-spinners/ClipLoader";
import banderitasMobile from '../assets/images/banderitasMobile.svg'
import confettiMobile from '../assets/images/confettiMobile.svg'

import { Link } from 'react-router-dom'
function Login(props) {

 const {touched, errors, isSubmitting} = props
 const windowSize = useWindowSize()

 const banderitasImg = windowSize < 500 ? banderitasMobile : banderitasMobile
 const confettiImg = windowSize < 500 ? confettiMobile : confettiMobile

 return(
   <div className = 'login-container content'>
   <div className = 'banderitas-container'>
      <img src = {banderitasImg} alt = 'banners'/>
   </div>
   <div className = 'confetti-container'>
      <img src = {confettiImg} alt = 'confetti'/>
   </div>
   <Form className="form">
        <p className = 'header'>Sign in</p>
        <div className='ui input'>
          <label htmlFor = 'email'>Email</label>
          <Field
            name="email"
            type="text"
          />
          <p>{touched.email && errors.email}</p>
        </div>
        <div className='ui input'>
          <label htmlFor = 'email'>Password</label>
          <Field
            name="password"
            type="password"
          />
          <p>{touched.password && errors.password}</p>
        </div>
         <Button color="blue">{
          !isSubmitting ? 
          'Sign in' 
          : <ClipLoader
          size={13}
          //size={"150px"} this also works
          color={"#fff"}
        /> }</Button>
         <br />
         {props.status && <h3 style={{color: 'red'}}>Invalid password or email</h3>}
         <p id = 'sign-up-link'>Need an account? <Link to = '/register'>Sign up here.</Link></p>
   </Form>
   </div>
 )
}
const FormikLogin = withFormik({
   mapPropsToValues({email, password}) {
     return {
       email: email || "",
       password: password || "",
       rememberMe: true
     };
   },
   validationSchema: Yup.object().shape({
     email: Yup.string().required("Required"),
     password: Yup.string().min(8).required("Required")
   }),
   //save token to local storage
   handleSubmit(values, props) {
     const propsToSubmit = {"email": values.email, "password": values.password}

     const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'
     props.setSubmitting(true)
     axios
     .post(`${URL}/api/auth/login`, propsToSubmit)
     .then(res => {
          props.setSubmitting(false)
         localStorage.setItem("emailDisplay", values.email.charAt(0));
         localStorage.setItem("user_id", res.data.user.id);
         localStorage.setItem("token", res.data.token);
         props.props.getEvents(res.data.user.id);
         props.props.history.push(`/dashboard/${res.data.user.id}`);
       })
       .catch(error => {
         props.setSubmitting(false)
         props.setStatus(error.response.data.message)
       })
   }
 })(Login);

 const mapStateToProps = state => {
   return{
     loading: state.isLoading
   }
 }
 export default connect(mapStateToProps,{ getEvents })(FormikLogin)

