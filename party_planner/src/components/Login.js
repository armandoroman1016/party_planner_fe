import React from "react";
import useWindowSize from "../utils/UseWindowSize";

// form validation
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import { connect } from "react-redux";
import { getEvents } from "../actions/eventActions";

// svgs for login
import banderitasMobile from "../assets/images/banderitasMobile.svg";
import banderitasDesktop from "../assets/images/banderitasDesktop.svg";

// svgs for login
import confettiMobile from "../assets/images/confettiMobile.svg";
import confettiDesktop from "../assets/images/confettiDesktop.svg";

import { Button } from "semantic-ui-react";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";

function Login(prop) {
    const { touched, errors, isSubmitting, status } = prop;
    const windowSize = useWindowSize();

    const banderitasImg =
        windowSize > 500 ? banderitasMobile : banderitasDesktop;
    const confettiImg = windowSize < 500 ? confettiMobile : confettiDesktop;

    return (
        <div className="login-container content">
            <div className="banderitas-container">
                <img src={banderitasImg} alt="banners" />
            </div>
            <div className="confetti-container">
                <img src={confettiImg} alt="confetti" />
            </div>
            <Form className="form">
                <p className="header">Sign in</p>
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
                    <label htmlFor="email">Password</label>
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
                <Button>
                    {!isSubmitting ? (
                        "Sign in"
                    ) : (
                        <ClipLoader
                            size={16}
                            //size={"150px"} this also works
                            color={"#061224"}
                        />
                    )}
                </Button>
                {errors.generic && (
                    <p className="error generic">{errors.generic}</p>
                )}
                <br />
                <p id="sign-up-link">
                    Need an account? <Link to="/register">Sign up here.</Link>
                </p>
            </Form>
        </div>
    );
}
const FormikLogin = withFormik({
    mapPropsToValues({ email, password }) {
        return {
            email: email || "",
            password: password || "",
            rememberMe: true,
        };
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().required("* Required"),
        password: Yup.string().min(8).required("* Required"),
    }),
    //save token to local storage
    handleSubmit(values, props) {
        const propsToSubmit = {
            email: values.email,
            password: values.password,
        };

        const URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        props.setSubmitting(true);
        axios
            .post(`${URL}/api/auth/login`, propsToSubmit)
            .then((res) => {
                props.setSubmitting(false);
                localStorage.setItem("emailDisplay", values.email.charAt(0));
                localStorage.setItem("user_id", res.data.user.id);
                localStorage.setItem("token", res.data.token);
                props.props.getEvents(res.data.user.id);
                props.props.history.push(`/dashboard/${res.data.user.id}`);
            })
            .catch((error) => {
                props.setSubmitting(false);

                const { response } = error;

                const errors = {};
                if (response.status === 406) {
                    errors["password"] = response.data.message;
                    errors["email"] = response.data.message;
                } else if (response.status === 400) {
                    errors["generic"] = response.status.message;
                }
                errors["generic"] = "This is a test message";

                props.setErrors(errors);
            });
    },
})(Login);

const mapStateToProps = (state) => {
    return {
        loading: state.isLoading,
    };
};
export default connect(mapStateToProps, { getEvents })(FormikLogin);
