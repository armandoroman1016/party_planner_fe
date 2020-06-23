import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { connect } from "react-redux";
import { getEvents } from "../actions/eventActions";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

// svgs for login
import banderitasMobile from "../assets/images/banderitasMobile.svg";
import banderitasDesktop from "../assets/images/banderitasDesktop.svg";

// svgs for login
import confettiMobile from "../assets/images/confettiMobile.svg";
import confettiDesktop from "../assets/images/confettiDesktop.svg";

import useWindowSize from "../utils/UseWindowSize";

function RegisterShape(prop) {
    const { touched, errors, status, isSubmitting } = prop;

    const windowSize = useWindowSize();
    const banderitasImg =
        windowSize > 500 ? banderitasMobile : banderitasDesktop;
    const confettiImg = windowSize < 500 ? confettiMobile : confettiDesktop;

    console.log(errors);
    return (
        <div className="login-container content register">
            <div className="banderitas-container">
                <img src={banderitasImg} alt="banners" />
            </div>
            <div className="confetti-container">
                <img src={confettiImg} alt="confetti" />
            </div>
            <Form className="form">
                <p className="header">Sign up</p>
                <div className="ui input">
                    <label htmlFor="firstName">First Name</label>
                    <Field name="firstName" type="text" />
                    <p
                        className={
                            touched.firstName && errors.firstName
                                ? "error show"
                                : "error"
                        }
                    >
                        {touched.firstName && errors.firstName}
                    </p>
                </div>
                <div className="ui input">
                    <label htmlFor="lastName">Last Name</label>
                    <Field name="lastName" type="text" />
                    <p
                        className={
                            touched.lastName && errors.lastName
                                ? "error show"
                                : "error"
                        }
                    >
                        {touched.lastName && errors.lastName}
                    </p>
                </div>
                <div className="ui input">
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="text" />
                    <p
                        className={
                            touched.email && errors.email
                                ? "error show"
                                : "error"
                        }
                    >
                        {touched.email && errors.email}
                    </p>
                </div>
                <div className="ui input">
                    <label htmlFor="password">Password</label>
                    <Field name="password" type="password" />
                    <p
                        className={
                            touched.password && errors.password
                                ? "error show"
                                : "error"
                        }
                    >
                        {touched.password && errors.password}
                    </p>
                </div>
                <Button className="register-btn">
                    {!isSubmitting ? (
                        "Sign up"
                    ) : (
                        <ClipLoader
                            size={13}
                            //size={"150px"} this also works
                            color={"#061224"}
                        />
                    )}
                </Button>
                {errors.generic && (
                    <p className="error generic">{errors.generic}</p>
                )}
                <br />
                <br />
                {status && (
                    <h3 style={{ color: "red" }}>
                        Please try again, error during signup
                    </h3>
                )}
                <p id="sign-up-link">
                    Already have an account?{" "}
                    <Link to="/login">Sign in here.</Link>
                </p>
            </Form>
        </div>
    );
}

const Register = withFormik({
    mapPropsToValues({ email, password, firstName, lastName }) {
        return {
            email: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            password: password || "",
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("* Required"),
        password: Yup.string()
            .min(8)
            .required("* Required, min length of 8 characters"),
        firstName: Yup.string().required("* Required"),
        lastName: Yup.string().required("* Required"),
    }),

    //save token to local storage
    handleSubmit(values, props) {
        const propsToSubmit = {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
        };
        const URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

        props.setSubmitting(true);

        axios
            .post(`${URL}/api/auth/register`, propsToSubmit)
            .then((res) => {
                props.setSubmitting(false);
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("token", res.data.token);
                props.props.getEvents();
                props.props.history.push(`/dashboard/${res.data.user.id}`);
            })
            .catch((error) => {
                props.setSubmitting(false);

                const response = error.response;

                const errors = {};
                if (response.status === 403) {
                    errors["email"] = response.data.message;
                } else if (response.status === 400) {
                    errors["missing_field"] = response.data.message;
                } else if (response.status === 500) {
                    errors["generic"] = response.data.message;
                }
                errors["generic"] = "This is a test message";

                props.setErrors(errors);
            });
    },
})(RegisterShape);

const mapStateToProps = (state) => {
    return {
        state,
    };
};

export default connect(mapStateToProps, { getEvents })(Register);
