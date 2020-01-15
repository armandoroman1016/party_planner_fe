import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addEventTodo } from '../../actions'

import { Button } from 'semantic-ui-react';

// Another way to import. This is recommended to reduce bundle size
import ClipLoader from "react-spinners/ClipLoader";

const TodoListForm = props => {

    const { eventId, loading } = props

    return(
        <div className = 'list-form-container'>
            <Form className='list-form'>
            {props.touched.task && props.errors.task && <p>{props.errors.task}</p>}
                <div style={{marginTop: '1rem'}}className='ui input'><Field type = 'text' name = 'task' placeholder = 'Add task'/></div>
                <Button type = 'submit'>{loading ?
                    <ClipLoader
                    size={15}
                    //size={"150px"} this also works
                    color={"#5877E5"}
                  /> : "Add Task"}</Button>
            </Form>
        </div>
    )
}

const FormikTodoForm = withFormik({
    mapPropsToValues({task}){
        return{
            task: task || ''
        }
    },
    validationSchema: Yup.object().shape({
        task: Yup.string().required('Task name is required'),
    }),
    handleSubmit(values, props){
        const { addEventTodo } = props.props
        const { eventId } = props.props
        const valuesToSubmit = {
            name: values.task,
            completed: false,
            notes: values.notes,
        }
        addEventTodo(eventId, valuesToSubmit)
        props.resetForm();
    }
})(TodoListForm)

const mapStateToProps = state => {
    return {
        loading: state.isLoading
    }
}
export default connect(mapStateToProps, {addEventTodo})(FormikTodoForm);