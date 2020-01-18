import React, { useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import EventItem from './EventItem'
import back from '../../assets/images/back.svg'
import ProgressBar from '../ProgressBar'
import { getEvents } from '../../actions/eventActions'

const ListContainer = props =>{

    // coming in from redux store
    const { shoppingItems, todoItems, event, events, getEvents } = props

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
    const listTotal = isShoppingRoute ? listType.reduce((acc, item, index) => {
        if(item.purchased){
            acc += item.cost
        }
        return acc
    }, 0)
    : null

    const header = isShoppingRoute ? 'Shopping List' : "Todo List"

    return (
        <div>
            <div id = 'header'>
                <img src = {back} alt = 'back arrow'/>
                <p>{header}</p>
                { targetEvent.length ? <h3>{targetEvent[0].name}</h3> : null}
            </div>
            <div className = 'items-container'>
                { isShoppingRoute ? 
                    <div id = 'list-subtotal'>
                        <p>Shopping List Subtotal: ${listTotal}</p>
                    </div>
                : null}
                { listType.length && listType.map( item => (
                    <EventItem 
                    key = {item.id}
                    itemType = { isShoppingRoute ? 'shopping' : 'todo' }
                    item = {item}
                    />
                ))}
            </div>
            { targetEvent.length ? <ProgressBar event = {targetEvent[0]}/> : null}

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
export default connect(mapStateToProps, {getEvents})(ListContainer)