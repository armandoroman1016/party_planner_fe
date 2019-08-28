import React, { useEffect } from 'react';

// Form packages
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Add event axios request
import { addEvent, createEventShoppingList, createEventTodoList } from '../actions/index';

// Redux store
import { connect } from 'react-redux';

// Semantic UI components
import { Button, Header, Modal } from 'semantic-ui-react';
import { SocialPartyMode } from 'material-ui/svg-icons';

const AddEvent = props => {

  const {addEvent} = props
  const {status} = props
  const {history} = props
  const {match} = props
  const { touched } = props
  const { errors } = props
  useEffect(() => {
    status && addEvent(status, history, match)
  }, [status])

  return (
    <div className="add-event-modal">
      <Modal trigger={<Button>New Event!</Button>} closeIcon>
        <Modal.Content>
          <Modal.Description>
            <Header>New Event</Header>
            <Form>
              <Field
                placeholder="Event Name"
                name="name"
                type="text"
              />
              {touched.name && errors.name && <p>{errors.name}</p>}
              <Field
                placeholder="# of Guests"
                name="guests"
                type="number"
              />
              {touched.guests && errors.guests && <p>{errors.guests}</p>}
              <Field
                placeholder="Event budget"
                name="budget"
                type="number"
              />
              {touched.budget && errors.budget && <p>{errors.budget}</p>}
              <Field
                placeholder="Theme"
                name="theme"
                type="text"
              />
              {touched.theme && errors.theme && <p>{errors.theme}</p>}
              <Field
                placeholder="dd/mm/yyyy"
                name="date"
                type="date"
              />
              {touched.date && errors.date && <p>{errors.date}</p>}
              <Button type="submit">Let's Go!</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}

const FormikAddEvent = withFormik({
  mapPropsToValues({ name, guests, budget, theme, date }) {
    return {
      name: name || '',
      guests: guests || '',
      budget: budget || '',
      theme: theme || '',
      date: date || '',
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Event name is required!"),
    guests: Yup.number().required("# of event guests are required!"),
    budget: Yup.number().required("Event budget is required!"),
    theme: Yup.string().required("Event theme is required!"),
    date: Yup.string().required("Event date is required!")
  }),

  handleSubmit(values, props){
    // resetForm, setStatus, postEventShoppingList
    const propsToSubmit = {
      "name": values.name,
      "guests": values.guests, 
      "theme": values.theme, 
      "date": values.date,
      "budget": values.budget,
      "user_id": localStorage.getItem('user_id'),
      "id": Date.now(),
    }
    props.setStatus(propsToSubmit);
    
    const listCreatorValues = {
      "party_id": propsToSubmit.id
    }
    props.props.createEventShoppingList(listCreatorValues)
    props.props.createEventTodoList(listCreatorValues)
    props.resetForm();
    // window.location.reload();
  }
})(AddEvent)

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, { addEvent, createEventShoppingList, createEventTodoList})(FormikAddEvent)
