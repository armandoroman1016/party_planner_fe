import React, { useEffect, useState } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import EventItem from './EventItem'
import back from '../../assets/images/back.svg'
import ProgressBar from '../ProgressBar'
import { 
    getEvents, 
    getShoppingItems, 
    updateShoppingItems, 
    getEventTodoList,
    updateToDoList } from '../../actions/eventActions'
import { Icon, Button } from 'semantic-ui-react'
import FormikShoppingForm from './EventItemForm'

const ListContainer = props =>{

    // coming in from redux store
    const { 
        shoppingItems, 
        todoItems, 
        event, 
        events, 
        getEvents, 
        getShoppingItems ,
        updateShoppingItems,
        getEventTodoList,
        updateToDoList
    } = props
    
    const location = useLocation()
    const history =  useHistory()
    const params = useParams()

    const eventId = params.eventId

    const targetEvent = events.filter( e => e.id === eventId)

    const isShoppingRoute = location.pathname.includes('shopping')

    useEffect(() => {

        if(!events.length){
          async function getE(){
            await getEvents(localStorage.getItem('user_id'))
          }
          getE()
        }
    
      }, [])

      useEffect(() => {

        if(!shoppingItems.length && isShoppingRoute){
            
            getShoppingItems(eventId)

        }else if(!todoItems.length && !isShoppingRoute){
            getEventTodoList(eventId)

        }

      },[eventId])

    // initalizing list type
    let listType

    if(isShoppingRoute){
        // if the pathname includes shopping, set the list type to shopping list
        listType = shoppingItems

    }else{
        // if the pathname includes todo, set the list type to shopping list
        listType = todoItems

    }

    // update list type and filter through and return only items that match the event id on the current route
    listType = listType.filter( item => item.event_id === eventId)

    // if route is for shopping accumulate total of all purchased items 
    const listTotal = isShoppingRoute && listType.reduce((acc, item, index) => {
        if(item.purchased){
            acc += item.cost
        }
        return acc
    }, 0)

    const header = isShoppingRoute ? 'Shopping List' : "Todo List"

    const updateCost = () => {

        updateShoppingItems(listType)

    } 

    const [ showForm, setShowForm] = useState(false)


    return (
        <div className = 'list-page-container'>
            <div id = 'header'>
                <img src = {back} alt = 'back arrow' onClick = {() => history.push(`/dashboard/${localStorage.getItem('user_id')}`)}/>
                <p>{header}</p>
                { targetEvent.length ? <h2>{targetEvent[0].name}</h2> : null}
            </div>
            <div className = 'items-container'>
                { isShoppingRoute ? 
                    <div id = 'list-subtotal'>
                        <p>Shopping List Subtotal: ${listTotal}</p>
                    </div>
                : null}
                <div className = 'items'>
                    { listType.length && listType.map( item => (
                        <EventItem 
                        updateToDoList = { updateToDoList }
                        updateItem = { updateShoppingItems }
                        key = {item.id}
                        itemType = { isShoppingRoute ? 'shopping' : 'todo' }
                        item = {item}
                        />
                    ))}     
                </div>
            </div>
            <div id = 'form_container'>
                <p>Add {header} Item</p>
                { showForm ? 
                    <Icon onClick = {() => setShowForm(false)} name = 'close'/>
                    : <Icon onClick = {() => setShowForm(true)} name = 'add'/>
                }
                
                <div className = { showForm ? 'list-form-container' : 'list-form-container invisible'}>
                    <FormikShoppingForm 
                    showForm = { showForm }
                    eventId = {eventId} 
                    formType = {isShoppingRoute ? 'shopping' : 'todo'}/>
                </div>
                  
            </div>
{/*             <button onClick = {() => updateCost()} id = 'update-button'>UPDATE LIST</button>
 */}            { targetEvent.length ? <ProgressBar event = {targetEvent[0]}/> : null}
            <div className = 'container-lists'>
                <h4>ORGANIZE YOUR LISTS</h4>
                <div className = 'lists'>
                    <Button 
                    onClick = {() => history.push(`/shopping/${eventId}`)}
                    >Shopping List</Button>
                    <Button 
                    onClick = {() => history.push(`/todo/${eventId}`)}
                    >Todo List</Button>
                </div>
            </div>
         </div>
    )
}

const mapStateToProps = state => {
    return{
        shoppingItems: state.shoppingListItems,
        todoItems: state.todoItems,
        events: state.events
    }
}
export default connect(mapStateToProps, {
    getEvents, 
    getShoppingItems, 
    updateShoppingItems, 
    getEventTodoList,
    updateToDoList})(ListContainer)