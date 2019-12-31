import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addEntertainment } from '../../actions'

import { Button } from 'semantic-ui-react';

const EntertainmentForm = props => {
    const { eventId } = props
    return(
        <div className = 'list-form-container'>
            <Form className='list-form' >
                {props.touched.entertainment && props.errors.entertainment && <p>{props.errors.entertainment}</p>}
                <div className="ui input"><Field type = 'text' name = 'entertainment' placeholder = 'Add Item. . .'/></div>
                {props.touched.price && props.errors.price && <p>You must enter a number</p>}
                <div className="ui input"><Field className="ui input" type = 'text' name = 'price' placeholder = 'Add Item Cost. . .'/></div>
                <Button type = 'submit'>Add Entertainment</Button>
            </Form>
        </div>
    )
}

const FormikEntertainmentForm = withFormik({
    mapPropsToValues({entertainment, price}){
        return{
            entertainment: entertainment || '',
            price: price || ''
        }
    },
    validationSchema: Yup.object().shape({
        entertainment: Yup.string().required('Entertainment name is required'),
        price: Yup.number().required('Price is required')
    }),
    handleSubmit(values, props){
        const { eventId } = props.props

        const valuesToSubmit = {
            name: values.entertainment,
            completed: true,
            todo_list_id: Number(eventId),
            price: values.price
        }
        props.props.addEntertainment(valuesToSubmit)
    }
})(EntertainmentForm)

const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps, { addEntertainment })(FormikEntertainmentForm);