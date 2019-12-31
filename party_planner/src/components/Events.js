import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react';

// Event clickable component
import EventOnDashboard from './EventOnDashboard';

import { Link } from 'react-router-dom';

import { TimelineMax, Power4, Bounce } from 'gsap';


const Events = ({ history, match, events }) => {

  let authObjects = []

  useEffect(() =>{
    if(events){
      authObjects = events.filter(event => {
        return event.user_id == match.params.id;
      })
    }
  },[events])


  let eventsHeader = useRef(null)
  let eventCards = useRef(null)

  // const clearStage = () => {
  //   const clearTl = new TimelineMax()
  //     clearTl
  //       .set(eventsHeader, { autoAlpha: 0})
  //       .set(eventCards, {autoAlpha: 0, onComplete: show} )
  //       function show(){
  //         eventsHeader.classList.remove('hide')
  //         eventCards.classList.remove('hide')
  //       }
  //     return clearTl
  // }

  // const enterHeader = () => {
  //   const enterHeader = new TimelineMax()
  //   enterHeader
  //       .fromTo(eventCards, 1.2, {autoAlpha: 0, scaleX: 0.1, transformOrigin: 'top center'}, {autoAlpha: 1, scaleX: 1, transformOrigin: 'top center', ease: Bounce.easeOut})
  //       .fromTo(eventCards, 1.1, {autoAlpha: 0, scaleY: 0.1, transformOrigin: 'top center'}, {autoAlpha: 1, scaleY: 1, transformOrigin: 'top center', ease: Bounce.easeOut}, '-=1.2')
  //       .fromTo(eventsHeader, 1, {x: 1400, y: -150, autoAlpha: 0, rotation: 0}, {x: 0, y: 0, autoAlpha: 1, rotation: 0, ease: Power4.easeInOut}, '-=.75')
  //       .add('header-arrived')
  //       .fromTo(eventsHeader, 1, {rotation: 0, x:0, y: 0, transformOrigin: 'bottom right'}, {rotation: .8, x:0, y: 0,transformOrigin: 'bottom right', ease: Power4.easeInOut}, 'header-arrived')
  //       .add('header-rotated')
  //       .fromTo(eventsHeader, .3 ,{ rotation : .8, x: 0, y:0, transformOrigin: 'bottom right'},{rotation: 0, x:0, y: 0, transformOrigin: 'bottom right', ease: Bounce.easeOut}, 'header-rotated += .1')
  //   return enterHeader
  // }

  // const go = () => {
  //   const masterTl = new TimelineMax()

  //     masterTl
  //       .add(clearStage(), 'clear-scene')
  //       .add(enterHeader(), 'header-enter-scene')
  //   return masterTl
  // }

  // useEffect(()=>{
  //   go()
  // },[])

  return (
    <div className= 'events-content'>
        <div className = 'new-event'>
          <h2 ref ={element => {eventsHeader = element}}>My Events</h2>
          <Link to = '/create-event'>
            <Icon name = 'add circle' />
          </Link>
        </div>
      <div className = "my-events" ref ={element => {eventCards = element}}>

        {authObjects.length ? authObjects.map(event => (
          <div key={event.id} className = 'events-container' >
                <EventOnDashboard
                event = {event}
              />
          </div>
        )) : <h2 className = 'no-events'>You have no events yet.</h2>}
      </div>
      {authObjects.length ?
        <div className = 'new-event add'>
          <h2>Add Event</h2>
          <Link to = '/create-event'>
            <Icon name = 'add circle'/>
          </Link>
        </div>
        : null
      }
    </div>
  )
}

const mapStateToProps = state => {
  return{
    events : state.events
  }
}

export default Events;