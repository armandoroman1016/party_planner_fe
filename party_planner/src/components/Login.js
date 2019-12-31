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
   <>
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
   </>
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
     email: Yup.string().required("Username is required"),
     password: Yup.string().min(8).required("Password is ALSO required")
   }),
   //save token to local storage
   handleSubmit(values, props) {
     const propsToSubmit = {"email": values.email, "password": values.password}
     localStorage.setItem("emailDisplay", values.email.charAt(0));
     const url = "https://bw-party-planner.herokuapp.com/api/auth/login";
     axios
     .post(url, propsToSubmit)
       .then(results => {
         localStorage.setItem("user_id", results.data.id);
         localStorage.setItem("token", results.data.token);
         props.props.getEvents();
         props.props.handleSuccessfulLogin(results.data.id);
         props.props.history.push(`/dashboard/${results.data.id}`);
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
 export default connect(mapStateToProps,{handleSuccessfulLogin, getEvents})(FormikLogin)

