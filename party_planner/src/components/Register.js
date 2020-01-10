
import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from 'react-redux'
import { getEvents } from '../actions/eventActions'
import {Button} from 'semantic-ui-react';

function RegisterShape(props) {

  const { touched, errors, status} = props

  return (
    <div>
      <h1>Register</h1>
      <Form className="form">
        <div className='ui input'>
          <Field
           placeholder="First Name"
           name="firstName"
           type="text"
          />
        </div>
        <p>{touched.firstName && errors.firstName}</p>
        <div className='ui input'>
          <Field
          placeholder="Last Name"
          name="lastName"
          type="text"
          />
        </div>
        <p>{touched.lastName && errors.lastName}</p>
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
        <Button color="blue">REGISTER</Button>
        <br />
        {status && <h3 style={{color: 'red'}}>Please try again, error during signup</h3>}
      </Form>
    </div>
  )
}

const Register = withFormik({
  mapPropsToValues({ email, password, firstName, lastName }) {
    return {
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Required"),
    password: Yup.string().min(8).required("Required, Min length of 8 characters"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),

  }),

  //save token to local storage
  handleSubmit(values, props) {
    
    const propsToSubmit = {
      "firstName": values.firstName,
      "lastName": values.lastName, 
      "email": values.email, 
      "password": values.password 
    }
    const url = "https://party-planner-back-end.herokuapp.com/api/auth/register";
    axios
      .post(url, propsToSubmit)
      .then((res) => {
        console.log('88 :', res.data)
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("token", res.data.token);
        props.props.getEvents();
        props.props.history.push(`/dashboard/${res.data.user.id}`);
      })
      .catch(error => {
        console.log(error)
      })
  }
})(RegisterShape);

const mapStateToProps = state => {
  return{
    state
  }
}

export default connect(mapStateToProps, { getEvents })(Register)

