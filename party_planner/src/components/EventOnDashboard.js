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

  // destructuring of event
  const { event } = props

  // const colors = ['#FFF']
  const colors = ['#FFE9F9', '#F2FFE1', '#FFF0E5', '#EEE9FF', '#fff']

  // object with key value pairs for length of each month
  const months = {
    1 : 31,
    2 : 28,
    3 : 31,
    4 : 30,
    5 : 31,
    6 : 30,
    7 : 31,
    8 : 31,
    9 : 30,
    10 : 31,
    11 : 30,
    12 : 31
  }
  
  // grabbing current calendar date and splitting into array
  // ? ex: '2020-02-25' would result in [ '2020', '02, '25' ]
  const today =  new Date().toISOString().slice(0, 10).split('-')

  // grabbing event date and splitting into array
  // ? ex: '2020-02-25' would result in [ '2020', '02, '25' ]
  const eventDate = event.date.split('-')

  // function that return a number that is equal to days remaining until event date
  const findDaysLeft = (currentDate, eventDate) => {

    // initializing return value
    let daysLeft = null

    const current = currentDate

    const todaysMonth = Number(current[1])

    const eventMonth = Number(eventDate[1])

    // amount of years left until party
    const yearsLeft = Number(eventDate[0]) -  Number(today[0])
    
    // if there are zero years left
    if (yearsLeft === 0){

      // iterate until i is equal to event month
      // initialize i with current month
      for(let i = todaysMonth; i <= eventMonth; i++){

        // if i is equal to todays month
        if(i === todaysMonth){

          // if i is equal to todays month and the event month 
          if(i === eventMonth){

            // add to days left with value of the events date minus the current date
            daysLeft += eventDate[2] - Number(current[2]) 

          }else{
            
            // add to days left with value of total days in month minus current date of month 
            daysLeft += months[i] - Number(current[2])

          }
        }

        // else if i is equal to the the event month
        else if(i === eventMonth){

          // add to days left with the value of the events date 
          // Ex: '2020 - 08 - 15', would add 15
          daysLeft +=  Number(eventDate[2])

        }

        else{

          // else just add the number of days left
          daysLeft += months[i]

        }
      }
    }

    return daysLeft
  }

  // number with amount of days remaining until event
  const remainingDays = findDaysLeft(today, eventDate)

  // create a string format of event date
  // ex: '2020 - 05 - 15' => 'Fri May 15 2020'
  let calendarDateFormat = new Date(Number(eventDate[0]), Number(eventDate[1]) - 1, Number(eventDate[2])).toDateString()    

  // change calendar date format from a string to and array of strings of the individual words in calendarDateFormat
  calendarDateFormat = calendarDateFormat.split(' ')

  // if days remaining are less then or equal to 14 update days remaining background with warning color
  const daysRemainingBackground = remainingDays <= 14 ? '#E3696A' : '#DCDDE4' 

  const random = event.background_color || colors[Math.floor(Math.random() * colors.length)]
  
  // boolean to toggle the meta data display status
  const [ show, setShow ] = useState(false)

  const toggleMeta = (bool) => setShow(!bool)

  const addressSections =  event.address.split(',')

  return(
    <div className = 'dashboard-event' style = {{background: random}}>
      <div className = 'event-info'>
        <div className = 'event-left_side'>
          <p style = {{background: daysRemainingBackground}}>{remainingDays} Days Until Event</p>
          <h4>{event.name}</h4>
          <h4>{event.start_time}</h4>
        </div>
        <div className = 'event-right_side'>
          {/* <img src = { dots } alt = 'settings icon'/> */}
          <div className = 'calendar'>
            <p>{calendarDateFormat[0]}</p>
            <span/>
            <p>{`${calendarDateFormat[1].toUpperCase()} ${calendarDateFormat[2]}`}</p>
          </div>
        </div>
        {!show ? 
          <img 
            src = { arrow } 
            alt = 'arrow pointing down' 
            className = 'expand-arrow' 
            onClick = {() => toggleMeta(show)}
          /> 
        : null
      }
      </div>
      <div className = {show ? 'event-meta' : 'hide event-meta'}>
        <div className = 'event-info-extra'>
          {event.theme ? 
              <div >
                <h4>THEME</h4>
                <p>{event.theme}</p>
            </div>
            : null
        }
          <div>
              <h4>LOCATION</h4>
              <p>{event.location}</p>
          </div>
          <div>
              <h4>ADDRESS</h4>
              <p>{addressSections[0]}<br/>{addressSections[1]}, {addressSections[2]}</p>
          </div>
          <div>
              <h4>GUEST COUNT</h4>
              <p>{event.adult_guests} Adults, {event.child_guests} Children</p>
          </div>
          <div>
              <h4>BUDGET</h4>
              <p>$ {event.budget}</p>
          </div>
          <img 
              src = { arrow } 
              alt = 'arrow pointing down' 
              className = 'expand-arrow'
              style = {{transform: 'rotate(180deg)'}}
              onClick = {() => toggleMeta(show)}/>
        </div>
      </div>
      <div className = 'progress-bar-container'>
        <ProgressBar event = {event}/>
      </div>
      <div className = 'container-lists'>
        <h4>ORGANIZE YOUR LISTS</h4>
        <div className = 'lists'>
          <ShoppingList id={event.id} />
          <TodoList id={event.id} />
          {/* <EntertainmentList id={event.id} /> */}
        </div>
      </div>
    </div>
  )
}

export default EventOnDashboard;
