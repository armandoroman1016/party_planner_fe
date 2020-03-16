import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { addEvent } from '../actions/AddEventActions'
import PlacesAutofill from './PlacesAutocomplete'
import { getEvents, updateEvent } from '../actions/eventActions'

import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import PropagateLoader from "react-spinners/PropagateLoader";

const overrideSpinner = css`
  transform-origin: center;
  margin-bottom: 10px;
  transform: translateX(50%);

`;

const EventFormShape = props => {
  
  const params = useParams()

  // if user is on the editing event event id will be defined

  
  const {
    touched, 
    errors, 
    values, 
    setValues, 
    isLoading, 
    events,
    getEvents 
  } = props
  const eventId = params.eventId
  
  
  const backgroundColors = ['#fff', '#E1FBFE', '#FFFAE2', '#FFF1E8', '#F1FFE6', '#EAFFF4', '#E8EEFF', '#F1EDFF']
  const [selectedColor, setSelectedColor] = useState(backgroundColors[0])

  const [ editedEvent, setEditedEvent] = useState(null)


  useEffect(() => {

    if(eventId && !events.length){

      async function getE(){
        await getEvents(localStorage.getItem('user_id'))
      }
      getE()

    }

  }, [])


  useEffect(() => {
    
    if(!isLoading && eventId && events.length){

      setEditedEvent(events.filter( e => e.id === eventId))

   }
    
  },[events])


  const fillInEventValues = (e) => {

    const startTime = e.start_time.split(' ')
    
    const endTime = e.end_time ? e.end_time.split(' ') : ''

    setValues({
      eventName: e.name,
      date: e.date,
      startHour: startTime[0],
      startMin: startTime[2],
      startAmPm: startTime[3],
      address: e.address,
      endHour: endTime.length ? endTime[0] : '',
      endMin: endTime.length ? endTime[2] : '',
      endAmPm: endTime.length ? endTime[3] : '',
      eventLocation : e.location,
      budget: e.budget,
      adultGuest: e.adult_guests,
      childGuest: e.child_guests,
      theme: e.theme,
      publicity: e.private,
      bgColor: e.background_color ? e.background_color : ''
    });

    if(e.background_color){

      setSelectedColor(e.background_color)

     }
  }


  useEffect(() => {

    if(editedEvent){
       
      fillInEventValues(...editedEvent)    
  
    }

  }, [editedEvent])
  


  const hours = [];

  const mins = [0, 15, 30, 45];

  const ampm = ["PM", "AM"];

  for (let i = 1; i <= 12; i++) {
    hours.push(i);
  }



  const handleColorChange = (color) => {
    setSelectedColor(color)

    setValues({
      ...values, 
      bgColor: color
    })

  }

  const setEventLocation = ( loc, latLngObj ) => {

    setValues({
      ...values,
      address: loc
      // latLng: latLngObj
    })

  }

  const buttonText = eventId ? 'UPDATE EVENT' : 'ADD EVENT'
  const headerText = editedEvent ? `Update Event - ${editedEvent[0].name}` : 'New Event' 

  return (
    <div className="add-event">
      <h2>{headerText}</h2>
        
        <Form selectedcolor = { selectedColor }>

            <div id = 'event-name' className = 'field'>
                <label htmlFor="eventName">EVENT NAME *</label>
                <Field name="eventName" type="text" />
                <p>{touched.eventName && errors.eventName}</p>
            </div>

            <div id = 'date' className = 'field'>
                <label htmlFor = 'date'>DATE *</label>
                <div className="ui icon input">
                  <Field placeholder="DD/MM/YYYY" name="date" type="date" />
                  <i
                    aria-hidden="true"
                    className="calendar alternate outline icon"
                  ></i>
                </div>
                <p>{touched.date && errors.date}</p>
            </div>
            
            <div className = 'time field' >
                <label>START TIME *</label>
                <div>

                  <Field name="startHour" as="select">
                    <option value = 'hr'>HR</option>
                    {hours.length
                      ? hours.map(hour => {
                          return (
                            <option value={hour} key={hour}>
                              {hour}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="startMin" as="select">
                    <option value = 'min'>MIN</option>
                    {mins.length
                      ? mins.map(min => {
                          return (
                            <option value={min === 0 ? "00" : min} key={min}>
                              {min === 0 ? "00" : min}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="startAmPm" as="select">
                    <option value = 'startAm/Pm'>AM / PM</option>
                    {ampm.length
                      ? ampm.map(el => {
                          return (
                            <option value={el} key={el}>
                              {el}
                            </option>
                          );
                        })
                      : null}
                  </Field>                
                </div>
                {(touched.startHour && errors.startHour) || (touched.startMin && errors.startMin) || (touched.startAmPm && errors.startAmPm)}
            </div>
          
            <div className = 'time field' >
                <label htmlFor="time">END TIME</label>
                <div>
                  <Field name="endHour" as="select">
                    <option value = 'endHr'>HR</option>

                    {hours.length
                      ? hours.map(hour => {
                          return (
                            <option value={hour} key={hour}>
                              {hour}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="endMin" as="select">
                    <option value = 'endMin'>MIN</option>
                    {mins.length
                      ? mins.map(min => {
                          return (
                            <option value={min === 0 ? "00" : min} key={min}>
                              {min === 0 ? "00" : min}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="endAmPm" as="select">
                  <option value = 'endAm/Pm'>AM / PM</option>
                    {ampm.length
                      ? ampm.map(el => {
                          return (
                            <option value={el} key={el}>
                              {el}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                </div>
            </div>
            
            <div id = 'location' className = 'field'> 
                <label htmlFor = 'eventLocation'>LOCATION *</label>
                <Field name = 'eventLocation' type = 'text' placeholder = 'Ex: Johnson Family Residence'/>
            </div>

            <div id = 'address' className = 'field'> 
              <label htmlFor = 'address'>ADDRESS *</label>
              <PlacesAutofill 
              setEventLocation = { setEventLocation } 
              value = {values.address}
              editedEvent = {editedEvent}
              />
              {/* <Field name = 'address' type = 'text' placeholder = 'Ex: 123 Main St, Springfield, IL'/> */}
            </div>
                      
            <div id = 'budget' className = 'field'>
                <label htmlFor = 'budget'>BUDGET *</label>
                <Field name = 'budget' type = 'text' placeholder = '$'/>  
            </div>
         
            <div className = 'guests field'>
                <label htmlFor = 'adultGuest'>NUMBER OF GUESTS - ADULT *</label>
                <Field name = 'adultGuest' type = 'text'/>
            </div>

            <div className = 'guests field'> 
                <label htmlFor = 'childGuest'>NUMBER OF GUESTS - CHILD *</label>
                <Field name = 'childGuest' type = 'text'/>
            </div>
            
            <div id = 'theme' className = 'field'>
                <label htmlFor = 'theme'>THEME</label>
                <Field name = 'theme' type = 'text'/>
            </div>

            <div id = 'publicity' className = 'field'>
            <Field
            type="checkbox"
            name="publicity"
            checked={values.publicity}
            />
            <label className="checkbox-container">
            PUBLIC 
            </label>
          </div>

            <div id = 'bg-color' className = 'field'>
                <label htmlFor = 'color'>CHOOSE A BACKGROUND COLOR</label>
                <div>
                    {backgroundColors.length ? 
                        backgroundColors.map(color => <div 
                          style = {{background: color , 
                            border: selectedColor === color ? `1.2px solid 	#00FA9A` : '1px solid rgba(34, 60, 68, 0.2)'}} 
                          key = {color} 
                          className = 'bgcolor' 
                          onClick = {(e, c) => handleColorChange(color)}/>)
                        : null}
                </div>
            </div>
          
          <button type = 'submit' style = {{cursor: 'pointer'}}>{
            !isLoading ? 
            buttonText 
            : <PropagateLoader
            css={overrideSpinner}
            size={13}
            color={"#fff"}
          /> }</button>
        </Form>
      
    </div>
  );
};

const EventForm = withFormik({
    mapPropsToValues({
        eventName, 
        date, 
        startHour, 
        startMin, 
        startAmPm, 
        endHour, 
        endMin, 
        endAmPm, 
        eventLocation, 
        budget, 
        adultGuest, 
        childGuest,
        theme,
        address,
        publicity
    }){
        return {
            eventName: eventName || '',
            date: date || '',
            startHour: startHour || '',
            startMin: startMin || '',
            startAmPm: startAmPm || '',
            address: address || '',
            endHour: endHour || '',
            endMin: endMin || '',
            endAmPm: endAmPm || '',
            eventLocation: eventLocation || '',
            budget: budget || '',
            adultGuest: adultGuest || '',
            childGuest: childGuest || '',
            theme: theme || '',
            publicity: publicity || false
        };
    },

    validationSchema: Yup.object().shape({
        eventName: Yup.string().required('Event name is required'),
        date: Yup.string().required('Event date is required'),
        startHour: Yup.string().required('Start time is required'),
        startMin: Yup.string().required('Start time is required'),
        startAmPm: Yup.string().required('Start time is required'),
        endHour: Yup.number('Invalid Selection'), 
        endAmPm: Yup.string(),
        address: Yup.string().required('Event location is required'),
        eventLocation: Yup.string().required('Event location is required'),
        budget: Yup.number('Budget must be a number').required('Your budget is required'),
        adultGuest: Yup.number('Guest count must be a number'),
        childGuest: Yup.number('Guest count must be a number'),
        theme: Yup.string()
    }),

    handleSubmit(values, props){


        const { addEvent, isLoading, history, match, updateEvent } = props.props

        const eventId = match.params.eventId

        const { 
          eventName,
          eventLocation,
          date,
          startHour,
          startMin,
          startAmPm,
          endHour,
          endMin,
          endAmPm,
          budget,
          adultGuest,
          childGuest,
          theme,
          address,
          publicity,
          bgColor
         } = values

        const packet = {
          name: eventName,
          date: date,
          startTime: `${startHour} : ${startMin} ${startAmPm}`,
          endTime: !endMin || !endHour || !endAmPm ? null : `${endHour} : ${endMin} ${endAmPm}`,
          budget: budget,
          location: eventLocation,
          address: address,
          private: publicity,
          adultGuests: Number(adultGuest),
          childGuests: Number(childGuest),
          backgroundColor: bgColor || '#fff',  
          theme: theme
        }

        // no event id so user is creating an event
        if(!eventId && !isLoading){

          addEvent(packet , localStorage.getItem('user_id'))
          
        // event id is in url so user is updating an event
        }else if(eventId && !isLoading){

          packet.hostId = localStorage.getItem('user_id')
          
          updateEvent(packet, eventId)

        }
        
        history.push(`/dashboard/${localStorage.getItem('user_id')}`)
    }

})(EventFormShape)

const mapStateToProps = (state) => {

  return{
    loading: state.isLoading,
    events: state.events
  }
}


export default connect(mapStateToProps, {addEvent, getEvents, updateEvent})(EventForm);
