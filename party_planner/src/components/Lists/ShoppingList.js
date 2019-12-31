import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Button, Header, Modal } from 'semantic-ui-react';
import { getShoppingItems, updateShoppingItems } from '../../actions'
import FormikShoppingForm from './ShoppingListForm';
import ShoppingItem from './ShoppingItem'
// import * as Yup from 'yup'



const ShoppingList = props => {

    let itemToUpdate = {}
    let dataToSend = {}
    const { match } = props
    const { id } = props 
    const [ modalPosition, setModalPosition ] = useState(1)
    const [ itemToRender, setItemToRender ] = useState([])
    
    const eventId = id ? id : props.match.params.id 
    
    useEffect(()=> {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        itemToUpdate = {...itemToRender[0]}
        if(itemToUpdate){
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dataToSend = {
            name: itemToUpdate.name,
            purchased: itemToUpdate.purchased,
            shopping_list_id: itemToUpdate.shopping_list_id,
            price: itemToRender.price,
            id: itemToUpdate.id
        }}
    },[itemToRender])

    useEffect(() => {
        props.getShoppingItems()
  
    },[])

    const shoppingItems = props.shoppingListItems.filter(item => item.shopping_list_id === eventId && item)

    const handleChange = event => {
        dataToSend = {...dataToSend, [event.target.name] : Number(event.target.value)}
        
    }

    const handleSubmit = event => {
        let placeHolder = []
        placeHolder.push(dataToSend)
        
        event.preventDefault()
        props.updateShoppingItems(placeHolder)
        placeHolder.unshift()
        setModalPosition(1)
    }

    return(
        <div className = 'modal-container'>
            <Modal className="listModalContainer" trigger={<Button>Shopping List</Button>} closeIcon>
                <Modal.Content className="list-content">
                    <Header style={{color:'rgb(16, 30, 68)', textAlign: 'center', fontSize: "1.8rem"}}>Shopping List</Header>
                    {shoppingItems.length && modalPosition === 1?
                        shoppingItems.map( item => {
                            return(
                                <ShoppingItem
                                key= {item.id}
                                item = {item} 
                                setModalPosition = { setModalPosition }
                                modalPosition = {modalPosition}
                                setItemToRender = { setItemToRender }/>
                            )
                        })
                      : modalPosition === 2 ? 
                        itemToRender.map( item => {
                        return(
                            <form key={item.id} onSubmit = {handleSubmit}>
                              <h2>{item.name} Cost</h2>
                              <div className='ui input'><input type = 'text' name = 'price' placeholder= 'Price. . .' onChange={handleChange} value = {dataToSend.price}/></div>
                              <Button style={{marginTop: '1rem'}}secondary type = 'submit'>Confirm Price</Button>
                            </form>
                      )}) 
                      : 'Your shopping list is currently empty. Click below to add an item.'}
                    <FormikShoppingForm modalPosition = {modalPosition} match = {match} eventId = {eventId}/>
                    {modalPosition === 1 && <div style={{width: '100%', textAlign: 'center'}}><Button secondary style={{marginTop: '1rem'}} onClick = {handleSubmit}>Update Shopping List</Button></div>}
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