import React from 'react';
import { connect } from 'react-redux'
import { Form, Field, withFormik} from 'formik'
import * as Yup from 'yup'
import { addShoppingItem } from '../../actions'

import { Button } from 'semantic-ui-react';

const ShoppingListForm = props => {
    const { modalPosition } = props
    const { eventId } = props
    return(
        <>
        {modalPosition === 1 ?
        <div className = 'list-form-container'>
            <Form className='list-form'>
                 <h2>Add Item</h2>
                    {props.touched.item && props.errors.item && <p>{props.errors.item}</p>}
                    <div className='ui input'><Field type = 'text' name = 'item' placeholder = 'Item. . .'/></div>
                    <Button type = 'submit'>Add Item</Button>
            </Form>
        </div> : null}
        </>
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
        const { eventId } = props.props
            const valuesToSubmit = {
                name: values.item,
                purchased: false,
                shopping_list_id: eventId,
                price: 0
            }
            props.props.addShoppingItem(valuesToSubmit)
        }
})(ShoppingListForm)

const mapStateToProps = state => {
    return state
}
export default connect(mapStateToProps, {addShoppingItem})(FormikShoppingForm);