    
import React, { useEffect, useState } from "react";
import { Checkbox, Button } from "semantic-ui-react";
import { connect } from 'react-redux'
import { updateShoppingItems } from '../../actions'
import { Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'


const ShoppingItem = props => {
  const { item } = props;
  const { setModalPosition } = props
  const { modalPosition } = props
  const { setItemToRender } = props

  let initialState = item.purchased

  let arrItem = []
  arrItem.push(item)

  const updateCompleted = e => {
    initialState = !initialState
    item.purchased = initialState
    let temp = []
    temp.push(item)
    props.updateShoppingItems(temp)
    temp.unshift()
  }

  const toggle = () => {
    setItemToRender(arrItem)
    setModalPosition(2)
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {modalPosition === 1 ?
        item.purchased ?
          <h3 style={{ textDecorationLine: 'line-through' }}>{modalPosition === 1 ?
            <Checkbox style={{marginRight: '1rem'}} onClick={updateCompleted} /> :
            null}{item.name}<Button primary style={{padding: '0.5rem', marginLeft: '0.5rem'}}onClick={toggle}>Edit</Button> </h3>
          : <h3>{modalPosition === 1 ?
            <Checkbox style={{marginRight: '1rem'}} onClick={updateCompleted} /> :
            null}{item.name}<Button primary style={{padding: '0.5rem', marginLeft: '0.5rem'}}onClick={toggle}>Edit</Button></h3>
        : null}
      {item.price ?
        <p>{item.name} cost: ${item.price}</p>
        : null}
    </div>
  );
};

const FormikShoppingItem = withFormik({
  mapPropsToValues({ price }) {
    return {
      price: price || ''
    }
  },
  validationSchema: Yup.object().shape({
    price: Yup.number().required('Price is required')
  }),
  handleSubmit(values, props) {
    let item = props.props.item
    const valuesToSubmit = [{ ...props.props.item, price: values.price }]
    props.props.updateShoppingItems(valuesToSubmit)
    props.props.setModalPosition(1)
  }
})(ShoppingItem)

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, { updateShoppingItems })(FormikShoppingItem)