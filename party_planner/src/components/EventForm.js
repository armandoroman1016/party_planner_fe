import React, { useState } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from 'yup'
import { connect } from 'react-redux'
import { addEvent } from '../actions/AddEventActions'
import PlacesAutofill from './GoogleMaps'

import { css } from "@emotion/core";
// Another way to import. This is recommended to reduce bundle size
import PropagateLoader from "react-spinners/PropagateLoader";

const overrideSpinner = css`
  transform-origin: center;
  margin-bottom: 10px;
  transform: translateX(50%);

`;

const EventFormShape = props => {
  
  const {touched, errors, values, setValues, isLoading} = props


  const hours = [];

  const mins = [0, 15, 30, 45];

  const ampm = ["PM", "AM"];

  for (let i = 1; i <= 12; i++) {
    hours.push(i);
  }

  const backgroundColors = ['#fff', '#E1FBFE', '#FFFAE2', '#FFF1E8', '#F1FFE6', '#EAFFF4', '#E8EEFF', '#F1EDFF']

  const [selectedColor, setSelectedColor] = useState(backgroundColors[0])

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
      address: loc,
      latLng: latLngObj
    })

  }

  return (
    <div className="add-event">
      <h2>New Event</h2>
        
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
              <PlacesAutofill setEventLocation = { setEventLocation } value = {values.address}/>
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
              {/* <span className="checkmark" /> */}
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
            'ADD EVENT' 
            : <PropagateLoader
            css={overrideSpinner}
            size={13}
            //size={"150px"} this also works
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

        const { addEvent, isLoading, history } = props.props

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

        if(!isLoading){

          addEvent(packet , localStorage.getItem('user_id'))

          history.push(`/dashboard/${localStorage.getItem('user_id')}`)

        }
        
    }

})(EventFormShape)

const mapStateToProps = (state) => {

  return{
    loading: state.isLoading
  }
}


export default connect(mapStateToProps, {addEvent})(EventForm);
