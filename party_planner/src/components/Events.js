import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react';
import { getEvents } from '../actions/eventActions'
import { useParams } from 'react-router-dom'
// Event clickable component
import EventOnDashboard from './EventOnDashboard';

import { Link } from 'react-router-dom';

import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import PropagateLoader from "react-spinners/PropagateLoader";


const Events = (props) => {

  const { history, match, events, getEvents, loading } = props

  let params = useParams()

  useEffect(() =>{
    if(!events ||!events.length){
      getEvents(params.id)
    }
  },[])


  return (
    <div className= 'events-content'>
        <div className = 'new-event'>
          <h2 >My Events</h2>
          <Link to = '/create-event'>
            <Icon name = 'add circle' />
          </Link>
        </div>
      <div className = "my-events" >

        {events.length ? events.map(event => (
          <div key={event.id} className = 'events-container' >
                <EventOnDashboard
                event = {event}
              />
          </div>
        )) : loading ? 
        <PropagateLoader
        // css={overrideSpinner}
        size={13}
        //size={"150px"} this also works
        color={"#5877E5"}
      />       
        :  <h2 className = 'no-events'>You have no events yet.</h2> }
      </div>
      {events.length >= 2 ?
        <div className = 'new-event add no-gradient'>
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
    loading: state.isLoading,
    events : state.events
  }
}

export default connect(mapStateToProps, { getEvents })(Events);