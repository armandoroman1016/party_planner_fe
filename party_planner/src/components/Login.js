import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from 'react-redux'
import { handleSuccessfulLogin } from '../actions/LogInActions'
import { getEvents } from '../actions/eventActions'
import { Button } from 'semantic-ui-react'

function Login(props) {
 const {touched} = props
 const {errors} = props
 return(
   <div>
   <h1>Login</h1>
   <Form className="form">
        <div className='ui input'>
         <Field
           placeholder="Enter your email"
           name="email"
           type="text"
         />
         </div>
         <p>{touched.email && errors.email}</p>
         <div className='ui input'>
         <Field
           placeholder="Password"
           name="password"
           type="password"
         />
         </div>
         <p>{touched.password && errors.password}</p>
         <Button color="blue">Log In</Button>
         <br />
         {props.status && <h3 style={{color: 'red'}}>Try again</h3>}
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
     const url = "http://localhost:5000/api/auth/login";
     axios
     .post(url, propsToSubmit)
     .then(res => {
         localStorage.setItem("emailDisplay", values.email.charAt(0));
         localStorage.setItem("user_id", res.data.user.id);
         localStorage.setItem("token", res.data.token);
         props.props.getEvents(res.data.user.id);
         props.props.history.push(`/dashboard/${res.data.user.id}`);
       })
       .catch(error => {
         props.setStatus(error.response.data.message)
       })
   }
 })(Login);
 const mapStateToProps = state => {
   return{
     state
   }
 }
 export default connect(mapStateToProps,{ getEvents })(FormikLogin)

