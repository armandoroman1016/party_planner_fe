import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Button, Header, Modal, Icon } from 'semantic-ui-react';
import { getShoppingItems, updateShoppingItems } from '../../actions'
import FormikShoppingForm from './ShoppingListForm';
import ShoppingItem from './ShoppingItem'
// import * as Yup from 'yup'



const ShoppingList = props => {

    let itemToUpdate = {}

    let dataToSend = {}

    const { match, id, shoppingListItems, updateShoppingItems } = props

    const [ modalPosition, setModalPosition ] = useState(1)

    const [ itemToRender, setItemToRender ] = useState([])

    const [ cost, setCost ] = useState(null) 
    
    const eventId = id ? id : match.params.id

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
        props.getShoppingItems(eventId)
  
    },[])

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


    const handleCostChange = (e) =>{

        setCost(e.target.value)

    }

    const updateCost = (e, eventObj) => {

        e.preventDefault()
        const packet = {
            id: eventObj.id,
            name: eventObj.name,
            purchased: true,
            notes: 'here are my notes',
            cost: Number(cost),
            eventId: eventObj.event_id
        }

        updateShoppingItems([packet])

    } 

    const eventShopping = shoppingListItems.filter( item => item.event_id === id)

    return(
        <div className = 'modal-container'>
            <Modal className="listModalContainer" trigger={<Button>Shopping List</Button>} closeIcon>
                <Modal.Content className="list-content">
                    <Header style={{color:'rgb(16, 30, 68)', textAlign: 'center', fontSize: "1.8rem"}}>Shopping List</Header>
                    { eventShopping.length && modalPosition === 1 ?
                        eventShopping.map( item => {
                            return(
                                <ShoppingItem
                                key= {item.id}
                                item = {item} 
                                setModalPosition = { setModalPosition }
                                modalPosition = { modalPosition }
                                setItemToRender = { setItemToRender }/>
                            )
                        })
                      : modalPosition === 2 ? 
                        itemToRender.map( item => {
                        return(
                            <form key={item.id} onSubmit = {handleSubmit}>
                              <div>
                                <Icon name = 'left arrow' onClick = {() => setModalPosition(1)}/>
                                <h2>{item.name} Cost</h2>
                              </div>
                              <div className='ui input'>
                                <input type = 'text' name = 'price' placeholder= 'Enter Cost' onChange={(e) => handleCostChange(e)} value = {dataToSend.price}/>
                                </div>
                              <Button style={{marginTop: '1rem'}}secondary type = 'submit' onClick = {(e) => { updateCost(e, ...itemToRender) }}>Confirm Price</Button>
                            </form>
                      )}) 
                      : <p className = 'no-items'>Your shopping list is currently empty. Click below to add an item.</p>}
                    <FormikShoppingForm modalPosition = {modalPosition} match = {match} eventId = {eventId}/>
                    {/* modalPosition === 1 && <div style={{width: '100%', textAlign: 'center'}}><Button secondary style={{marginTop: '1rem'}} onClick = {handleSubmit}>Update Shopping List</Button></div> */}
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