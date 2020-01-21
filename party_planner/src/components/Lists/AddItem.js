import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addShoppingItem } from '../../actions'

import { Button } from 'semantic-ui-react';
import ClipLoader from "react-spinners/ClipLoader";

const ShoppingListForm = props => {


    const { modalPosition, eventId, loading } = props

    return(
        <div>
        {modalPosition === 1 ?
        <div className = 'list-form-container'>
            <Form className='list-form'>
                 <h2>Add Item</h2>
                    {props.touched.item && props.errors.item && <p>{props.errors.item}</p>}
                    <div className='ui input'><Field type = 'text' name = 'item' placeholder = 'Item Name'/></div>
                    <Button type = 'submit'>{loading ? 
                        <ClipLoader
                        size={15}
                        //size={"150px"} this also works
                        color={"#5877E5"}
                      /> : "ADD ITEM"}</Button>
            </Form>
        </div> : null}
        </div>
    )
}

const FormikShoppingForm = withFormik({
    mapPropsToValues({item, price}){
        return{
            item: item || '',
        }
    },
    validationSchema: Yup.object().shape({
        item: Yup.string().required('Item name is required'),
    }),
    handleSubmit(values, props){
        const { eventId, addShoppingItem } = props.props

        const packet = {
            name: values.item,
            purchased: 0,
            notes: 'here are my notes',
            price: null
        }
        
        addShoppingItem(eventId, packet)

        }
})(ShoppingListForm)

const mapStateToProps = state => {
    return {
        loading: state.isLoading
    }
}
export default connect(mapStateToProps, {addShoppingItem})(FormikShoppingForm);