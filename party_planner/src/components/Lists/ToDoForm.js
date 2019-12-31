import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addEventTodo } from '../../actions'

import { Button } from 'semantic-ui-react';

const TodoListForm = props => {
    const { eventId } = props
    return(
        <div className = 'list-form-container'>
            <Form className='list-form'>
            {props.touched.task && props.errors.task && <p>{props.errors.task}</p>}
                <div style={{marginTop: '1rem'}}className='ui input'><Field type = 'text' name = 'task' placeholder = 'Add task'/></div>
                <Button type = 'submit'>Add Task</Button>
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
        const { eventId } = props.props
        const valuesToSubmit = {
            name: values.task,
            completed: false,
            todo_list_id: eventId,
        }
        props.props.addEventTodo(valuesToSubmit)
        props.resetForm();
    }
})(TodoListForm)

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps, {addEventTodo})(FormikTodoForm);