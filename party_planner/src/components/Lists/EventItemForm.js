import React from "react";
import { connect } from "react-redux";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import { addShoppingItem, addEventTodo } from "../../actions";

import { Button } from "semantic-ui-react";
import ClipLoader from "react-spinners/ClipLoader";

const ShoppingListForm = (prop) => {
    const { loading, formType, touched, errors } = prop;

    return (
        <div>
            <Form className="list-form">
                {touched.item && errors.item && <p>{errors.item}</p>}
                <div
                    className={
                        formType === "todo"
                            ? "todo-form-input ui input input-section"
                            : "ui input input-section"
                    }
                >
                    <label htmlFor="name">Name *</label>
                    <Field type="text" name="item" placeholder="Name" />
                </div>
                {formType === "shopping" && (
                    <div className="ui input input-section">
                        <label htmlFor="cost">Cost</label>
                        <Field type="text" name="cost" placeholder="Cost" />
                    </div>
                )}

                <Button
                    type="submit"
                    className={formType === "todo" ? "todo-form-btn" : null}
                >
                    {loading ? (
                        <ClipLoader
                            size={15}
                            //size={"150px"} this also works
                            color={"#5877E5"}
                        />
                    ) : (
                        "ADD ITEM"
                    )}
                </Button>
            </Form>
        </div>
    );
};

const FormikShoppingForm = withFormik({
    mapPropsToValues({ item, cost }) {
        return {
            item: item || "",
            cost: Number(cost) || "",
        };
    },
    validationSchema: Yup.object().shape({
        item: Yup.string().required("Item name is required"),
        cost: Yup.number("Must be a number"),
    }),
    handleSubmit(values, props) {
        const {
            eventId,
            addShoppingItem,
            addEventTodo,
            formType,
        } = props.props;

        let packet;

        if (formType === "todo") {
            packet = {
                name: values.item,
                completed: false,
                notes: null,
            };

            addEventTodo(eventId, packet);
        } else {
            packet = {
                name: values.item,
                purchased: 0,
                notes: null,
                cost: Number(values.cost) || null,
            };

            addShoppingItem(eventId, packet);
        }

        props.resetForm();
    },
})(ShoppingListForm);

const mapStateToProps = (state) => {
    return {
        loading: state.isLoading,
    };
};
export default connect(mapStateToProps, { addShoppingItem, addEventTodo })(
    FormikShoppingForm
);
