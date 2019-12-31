
import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import {Button} from 'semantic-ui-react';

function RegisterShape({ touched, errors, status }) {
  return (
    <>
    <h1>Register</h1>
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
     <Button color="blue">Register</Button>
     <br />
     {status && <h3 style={{color: 'red'}}>Please try again, error during signup</h3>}
</Form>
</>
  )
}

export const Register = withFormik({
  mapPropsToValues({ email, password }) {
    return {
      email: email || "",
      password: password || ""
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().required("Username is required"),
    password: Yup.string().min(8).required("Password is ALSO required")
  }),

  //save token to local storage
  handleSubmit(values, props) {
    const propsToSubmit = { "email": values.email, "password": values.password }
    const url = "https://bw-party-planner.herokuapp.com/api/auth/register";
    axios
      .post(url, propsToSubmit)
      .then(results => {
        console.log(results)
      })
      .catch(error => {
        console.log(error)
        props.setStatus(error.response.data.message)
      })
  }
})(RegisterShape);

































