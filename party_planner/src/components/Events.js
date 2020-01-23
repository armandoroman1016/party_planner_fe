import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import {  Icon } from 'semantic-ui-react';
import { getEvents } from '../actions/eventActions'
import { useParams } from 'react-router-dom'
// Event clickable component
import EventOnDashboard from './EventOnDashboard';

import { Link } from 'react-router-dom';

// Another way to import. This is recommended to reduce bundle size
import PropagateLoader from "react-spinners/PropagateLoader";


const Events = (props) => {

  const { events, getEvents, loading } = props



  let params = useParams()

  useEffect(() =>{

    console.log('here')
    if(!events.length){
      getEvents(params.id)
    }

  },[])

  const [ filtered, setFiltered ] = useState(events)
  const [ values, setValues ] = useState('')
  const [ searching, setSearching ] = useState(false)

  useEffect(() => {

    setFiltered(events)

  }, [events.length])


  const handleSearch = (e) => {

    setValues(e.target.value)
    
    if(e.target.value === ''){
      
      setFiltered(events)
      setSearching(false)
      
    }else{
      
      setSearching(true)
      setFiltered(filtered.filter(event => event.name.toLowerCase().includes(e.target.value.toLowerCase())))

    }

  }

  return (
    <div className= 'events-content'>
        <div className = 'new-event'>
          <h2 >My Events</h2>
          <Link to = '/create-event'>
            <Icon name = 'add circle' />
          </Link>
        </div>
        
        <div className="search-bar">
          <input placeholder="Event Name" name="events" type="text" value = {values} onChange = {(e) => handleSearch(e)}/>
          <Icon
            name="search"
          />
        </div>
        
      <div className = "my-events" >

        {filtered.length ? filtered.map(event => (
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
        :  searching ? <h2 className = 'no-events'>No events found.</h2> 
        : <h2 className = 'no-events'>You have no events yet.</h2> }
      </div>
      {filtered.length >= 2 ?
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