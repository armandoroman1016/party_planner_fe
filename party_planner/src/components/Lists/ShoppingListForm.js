import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addShoppingItem } from '../../actions'

import { Button } from 'semantic-ui-react';
import ClipLoader from "react-spinners/ClipLoader";

const ShoppingListForm = props => {


    const { eventId, loading, values } = props

    console.log('values', values)

    return(
    
        <div className = 'list-form-container'>
            <Form className='list-form'>
                {props.touched.item && props.errors.item && <p>{props.errors.item}</p>}
                <div className='ui input input-section'>
                    <label htmlFor = 'name'>Name *</label>
                    <Field type = 'text' name = 'item' placeholder = 'Name'/>
                </div>
                <div className='ui input input-section'>
                    <label htmlFor = 'cost'>Cost</label>
                    <Field type = 'text' name = 'cost' placeholder = 'Cost'/>
                </div>
                  
                <Button type = 'submit'>{loading ? 
                    <ClipLoader
                    size={15}
                    //size={"150px"} this also works
                    color={"#5877E5"}
                  /> : "ADD ITEM"}</Button>
            </Form>
        </div>
        
    )
}

const FormikShoppingForm = withFormik({
    mapPropsToValues({item, cost}){
        return{
            item: item || '',
            cost: Number(cost) || ''
        }
    },
    validationSchema: Yup.object().shape({
        item: Yup.string().required('Item name is required'),
        cost: Yup.number('Must be a number'),
        
    }),
    handleSubmit(values, props){
        const { eventId, addShoppingItem } = props.props

        const packet = {
            name: values.item,
            purchased: 0,
            notes: null,
            cost: Number(values.cost) || null
        }
        console.log('values', packet)
        
        addShoppingItem(eventId, packet)

        }
})(ShoppingListForm)

const mapStateToProps = state => {
    return {
        loading: state.isLoading
    }
}
export default connect(mapStateToProps, {addShoppingItem})(FormikShoppingForm);