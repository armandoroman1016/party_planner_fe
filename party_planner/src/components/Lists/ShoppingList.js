import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Button, Header, Modal, ModalActions } from 'semantic-ui-react';
import { getShoppingItems, updateShoppingItems } from '../../actions'
import FormikShoppingForm from './ShoppingListForm';
import ShoppingItem from './ShoppingItem'
import * as Yup from 'yup'



const ShoppingList = props => {

    let itemToUpdate = {}
    let dataToSend = {}
    const match = props

    const [ modalPosition, setModalPosition ] = useState(1)
    const [ itemToRender, setItemToRender ] = useState([])
    
    
    useEffect(()=> {
        itemToUpdate = itemToRender[0]
        if(itemToUpdate){
        dataToSend = {
            name: itemToUpdate.name,
            purchased: true,
            shopping_list_id: itemToUpdate.shopping_list_id,
            price: itemToRender.price,
            id: itemToUpdate.id
        }}
        console.log(dataToSend)
    },[itemToRender])

    useEffect(() => {
        props.getShoppingItems()
    },[])

    const shoppingItems = props.shoppingListItems.filter(item => {
        if(item.shopping_list_id.toString() === match.match.params.id){
            return item
        }
    })
    const handleChange = event => {
        console.log(dataToSend)
        dataToSend = {...dataToSend, [event.target.name] : Number(event.target.value)}
    }

    const handleSubmit = event => {
        let placeHolder = []
        placeHolder.push(dataToSend)
        console.log(placeHolder)
        event.preventDefault()
        props.updateShoppingItems(placeHolder)
        placeHolder.unshift()
        setModalPosition(1)
    }

    return(
        <div className = 'modal-container'>
            <Modal trigger={<Button>Shopping List</Button>} closeIcon>
                <Modal.Content>
                    <Header>Shopping List</Header>
                    {shoppingItems.length && modalPosition === 1?
                        shoppingItems.map( item => {
                            return(
                                <ShoppingItem item = {item} 
                                setModalPosition = { setModalPosition }
                                modalPosition = {modalPosition}
                                setItemToRender = { setItemToRender }/>
                            )
                        })
                    :'Your shopping list is currently empty. Click below to add an item.'}
                    { modalPosition === 2 ? 
                        itemToRender.map( item => {
                        return(
                            <form onSubmit = {handleSubmit}>
                              <h2>{item.name} Cost</h2>
                              <input type = 'text' name = 'price' placeholder= 'Price. . .' onChange={handleChange} value = {dataToSend.price}/>
                              <button type = 'submit'>Confirm Price</button>
                            </form>
                      )}) 
                      : null}
                    <FormikShoppingForm modalPosition = {modalPosition} match = {match}/>
                    {modalPosition === 1 && <Button onClick = {() => props.updateShoppingItems(shoppingItems)}>Update Shopping List</Button>}
                    </Modal.Content>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        shoppingListItems : state.shoppingListItems
    }
}
export default connect(mapStateToProps, { getShoppingItems, updateShoppingItems })(ShoppingList)