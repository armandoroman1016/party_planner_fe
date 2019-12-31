import React, { useState } from 'react'
import ShoppingList from './Lists/ShoppingList'
import EntertainmentList from './Lists/Entertainment'
import TodoList from './Lists/ToDo'
import { Icon } from 'semantic-ui-react'
import arrow from '../assets/images/arrow.svg'
import dots from '../assets/images/dots.svg'


import ProgressBar from './ProgressBar'

// TODO set max chars on event name creation

const EventOnDashboard = (props) => {

  // const colors = ['#FFF']
  const colors = ['#FFE9F9', '#F2FFE1', '#FFF0E5', '#EEE9FF', '#fff']
  const months = {
    '01' : 31,
    '02' : 28,
    '03' : 31,
    '04' : 30,
    '05' : 31,
    '06' : 30,
    '07' : 31,
    '08' : 31,
    '09' : 30,
    '10' : 31,
    '11' : 30,
    '12' : 31
  }
  
  const { event } = props

  const today =  new Date().toISOString().slice(0, 10).split('-')

  const eventDate = event.date.split('-')

  const findDaysLeft = (currentDate, eventDate) => {

    let daysLeft = null

    const yearsLeft = eventDate[0] -  today[0]

    const todaysMonth = today[1]
    const eventMonth = eventDate[1]

    if (Number(yearsLeft) === 0){

      for(let i = Number(todaysMonth); i <= Number(eventMonth); i++){

        if(i === Number(todaysMonth)){
          daysLeft += eventDate[2] - currentDate[2]
        }
        else if(i === Number(eventMonth)){
          daysLeft += months[i] - Number(eventDate[2])
        }
        else{
          daysLeft += months[i]
        }

      }

    }

    return daysLeft
  }

  const remainingDays = findDaysLeft(today, eventDate)

  
  let calendarDateFormat = new Date(Number(eventDate[0]), Number(eventDate[1]) - 1, Number(eventDate[2])).toDateString()    

  calendarDateFormat = calendarDateFormat.split(' ')

  const daysRemainingBackground = remainingDays <= 4 ? '#E3696A' : '#898A9E' 

  const random = colors[Math.floor(Math.random() * colors.length)]
  
  const [ show, setShow ] = useState(false)

  const toggleMeta = (bool) => setShow(!bool)

  return(
    <div className = 'dashboard-event' style = {{background: random}}>
      <div className = 'event-info'>
        <div className = 'event-left_side'>
          <p style = {{background: daysRemainingBackground}}>{remainingDays} Days Until Event</p>
          <h4>{event.name}</h4>
          <h4>4:00 P.M.</h4>
        </div>
        <div className = 'event-right_side'>
          <img src = { dots } alt = 'settings icon'/>
          <div className = 'calendar'>
            <p>{calendarDateFormat[0]}</p>
            <span/>
            <p>{`${calendarDateFormat[1].toUpperCase()} ${calendarDateFormat[2]}`}</p>
          </div>
        </div>
      </div>
      <div className = {show ? 'event-meta' : 'hide event-meta'}>
        <div className = 'event-info-extra'>
          <div >
              <h4>THEME</h4>
              <p>Ugly Christmas Sweater</p>
          </div>
          <div>
              <h4>LOCATION</h4>
              <p>Roman Household</p>
          </div>
          <div>
              <h4>ADDRESS</h4>
              <p>123 Main St.</p>
          </div>
          <div>
              <h4>GUEST COUNT</h4>
              <p>20 Adults, 10 Children</p>
          </div>
          <div>
              <h4>BUDGET</h4>
              <p>$3,000</p>
          </div>
        </div>
        <ProgressBar event = {event}/>
      </div>
      <div className = 'container-lists'>
        <h4>Organize your lists</h4>
        <div className = 'lists'>
          <ShoppingList id={event.id} />
          <TodoList id={event.id} />
          <EntertainmentList id={event.id} />
        </div>
      </div>
      {!show ? 
        <img 
          src = { arrow } 
          alt = 'arrow pointing down' 
          className = 'expand-arrow' 
          onClick = {() => toggleMeta(show)}
        /> 
      : <img 
          src = { arrow } 
          alt = 'arrow pointing down' 
          className = 'expand-arrow'
          style = {{transform: 'rotate(180deg)'}}
          onClick = {() => toggleMeta(show)}/>
    }

    </div>
  )
}

export default EventOnDashboard;
