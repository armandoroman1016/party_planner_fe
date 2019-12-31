import React, { useState } from "react";
import { Formik, Form, Field, withFormik } from "formik";
import * as Yup from 'yup'

const EventFormShape = props => {

  const hours = [];

  const mins = [0, 15, 30, 45];

  const ampm = ["PM", "AM"];

  for (let i = 1; i <= 12; i++) {
    hours.push(i);
  }

  const backgroundColors = ['#FFE9F9', '#E4F1FF', '#F2FFE0', '#DEFFFF', '#FFF0E5', '#EEE9FF', '#FEFFE5', '#FFF']

  let [selectedColor, setSelectedColor] = useState(backgroundColors[0])

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value)
  }

  return (
    <div className="add-event">
      <h2>New Event</h2>
        <Form>

            <div id = 'event-name' className = 'field'>
                <label htmlFor="eventName">EVENT NAME</label>
                <Field name="eventName" type="text" />
            </div>

            <div id = 'date' className = 'field'>
                <label htmlFor = 'date'>DATE</label>
                <div className="ui icon input">
                  <Field placeholder="dd/mm/yyyy" name="date" type="date" />
                  <i
                    aria-hidden="true"
                    className="calendar alternate outline icon"
                  ></i>
                </div>
            </div>
            
            <div className = 'time field' >
                <label>START TIME</label>
                <div>

                  <Field name="startHour" as="select">
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
                    {mins.length
                      ? mins.map(min => {
                          return (
                            <option value={min} key={min}>
                              {min === 0 ? "00" : min}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="startAmPm" as="select">
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
          
            <div className = 'time field' >
                <label htmlFor="time">END TIME</label>
                <div>
                  <Field name="endHour" as="select">
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
                    {mins.length
                      ? mins.map(min => {
                          return (
                            <option value={min} key={min}>
                              {min === 0 ? "00" : min}
                            </option>
                          );
                        })
                      : null}
                  </Field>
                  <Field name="endAmPm" as="select">
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
                <label htmlFor = 'eventLocation'>LOCATION</label>
                <Field name = 'eventLocation' type = 'text'/>
            </div>
                      
            <div id = 'budget' className = 'field'>
                <label htmlFor = 'budget'>BUDGET</label>
                <Field name = 'budget' type = 'text' placeholder = '$'/>  
            </div>
         
            <div className = 'guests field'>
                <label htmlFor = 'adultGuest'>NUMBER OF GUESTS - ADULT</label>
                <Field name = 'adultGuest' type = 'text'/>
            </div>

            <div className = 'guests field'> 
                <label htmlFor = 'childGuest'>NUMBER OF GUESTS - CHILD</label>
                <Field name = 'childGuest' type = 'text'/>
            </div>
            
            <div id = 'theme' className = 'field'>
                <label htmlFor = 'theme'>THEME</label>
                <Field name = 'theme' type = 'text'/>
            </div>

            <div id = 'bg-color' className = 'field'>
                <label htmlFor = 'color'>CHOOSE A BACKGROUND COLOR</label>
                <div>
                    {backgroundColors.length ? 
                        backgroundColors.map(color => <div style = {{background: color }} key = {color} className = 'bgcolor'/>)
                        : null}
                </div>
            </div>
         

          <button type = 'submit'>ADD EVENT</button>
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
        theme
    }){
        return {
            eventName: eventName || '',
            date: date || '',
            startHour: startHour || '',
            startMin: startMin || '',
            startAmPm: startAmPm || '',
            endHour: endHour || '',
            endMin: endMin || '',
            endAmPm: endAmPm || '',
            eventLocation: eventLocation || '',
            budget: budget || '',
            adultGuest: adultGuest || '',
            childGuest: childGuest || '',
            theme: theme || ''
        };
    },

    validationSchema: Yup.object().shape({
        eventName: Yup.string().required('Event name is required'),
        date: Yup.date().required('Event date is required'),
        startHour: Yup.number().required('Select a starting hour'),
        startAmPm: Yup.string().required('AM or PM is required'),
        endHour: Yup.number('Invalid Selection'), 
        endAmPm: Yup.string().required('AM or PM is required'),
        location: Yup.string().required('Event location is required'),
        budget: Yup.number('Budget must be a number').required('Your budget is required'),
        adultGuest: Yup.number('Guest count must be a number'),
        childGuest: Yup.number('Guest count must be a number'),
        theme: Yup.string()
    }),

    handleSubmit(values, props){
        console.log(values)
        console.log('here')
    }

})(EventFormShape)

export default EventForm;
