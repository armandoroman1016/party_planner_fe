
import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from 'react-redux'
import { getEvents } from '../actions/eventActions'
import {Button} from 'semantic-ui-react';

import ClipLoader from "react-spinners/ClipLoader";
import banderitasMobile from '../assets/images/banderitasMobile.svg'
import confettiMobile from '../assets/images/confettiMobile.svg'
import useWindowSize from '../utils/UseWindowSize'

function RegisterShape(props) {

  const { touched, errors, status, isSubmitting} = props

  const windowSize = useWindowSize()
  const banderitasImg = windowSize < 500 ? banderitasMobile : banderitasMobile
  const confettiImg = windowSize < 500 ? confettiMobile : confettiMobile

  return (
    <div className = 'login-container content'>
      <div className = 'banderitas-container'>
      <img src = {banderitasImg} alt = 'banners'/>
    </div>
    <div className = 'confetti-container'>
      <img src = {confettiImg} alt = 'confetti'/>
    </div>
    <Form className="form">
        <p className = 'header'>Sign up</p>
        <div className='ui input'>
          <label htmlFor = 'firstName'>First Name</label>
          <Field
           name="firstName"
           type="text"
          />
          <p>{touched.firstName && errors.firstName}</p>
        </div>
        <div className='ui input'>
          <label htmlFor = 'lastName'>Last Name</label>
          <Field
          name="lastName"
          type="text"
          />
          <p>{touched.lastName && errors.lastName}</p>
        </div>
        <div className='ui input'>
          <label htmlFor = 'email'>Email</label>
          <Field
           name="email"
           type="text"
          />
          <p>{touched.email && errors.email}</p>
        </div>
        <div className='ui input'>
          <label htmlFor = 'password'>Password</label>
          <Field
           name="password"
           type="password"
          />
          <p>{touched.password && errors.password}</p>
        </div>
        <Button className = 'register-btn'>{
          !isSubmitting ? 
          'Sign up' 
          : <ClipLoader
          size={13}
          //size={"150px"} this also works
          color={"#fff"}
        /> }</Button>
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
    const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

    props.setSubmitting(true)

    axios
      .post(`${URL}/api/auth/register`, propsToSubmit)
      .then((res) => {
        props.setSubmitting(false)
        localStorage.setItem("user_id", res.data.user.id);
        localStorage.setItem("token", res.data.token);
        props.props.getEvents();
        props.props.history.push(`/dashboard/${res.data.user.id}`);
      })
      .catch(error => {
        props.setSubmitting(false)
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

