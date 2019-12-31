import React, { useEffect, useState } from 'react';

// Form packages
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Add event axios request
import { addEvent, createEventShoppingList, createEventTodoList } from '../actions/index';

// Redux store
import { connect } from 'react-redux';

// Semantic UI components
import { Button, Header, Modal, Icon } from 'semantic-ui-react';

const AddEvent = props => {

  const [modalOpen, setModalOpen] = useState(false);

  const [pageTwoModal, setPageTwoModal] = useState(false);

  const { addEvent } = props
  const { status } = props
  const { history } = props
  const { match } = props
  const { touched } = props
  const { errors } = props

  useEffect(() => {
    status && addEvent(status, history, match)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const submitModal = () => {
    setTimeout(function () { handleModalClose(); setPageTwoModal(false) }, 0.1);
  }

  return (
    <div className="add-event-modal">
      <Modal open={modalOpen} className="modalContainer" onClose={handleModalClose} trigger={<Icon name = 'add circle' onClick={handleModalOpen}></Icon>}>
        <Modal.Content>
          <Modal.Description className="add-event-form">
            <div className="form-header">
            {pageTwoModal && <Icon className="first-page" name="arrow left" onClick={() => setPageTwoModal(false)}/>}
            <Header style={{color:'rgb(16, 30, 68)', fontSize: "1.8rem", marginBottom: 0, marginTop: 0, marginLeft: pageTwoModal || '7rem', marginRight: pageTwoModal && '7rem'}}>New Event</Header>
            {pageTwoModal || <Icon className="second-page" name='arrow right' onClick={() => setPageTwoModal(true)}/>}
            </div>
            <Form className="form-inputs">
              {pageTwoModal === false &&
                <>
                  <label className="add-event-label">Event Name</label>
                  <div className="ui input">
                  <Field
                    placeholder="Event Name"
                    name="name"
                    type="text"
                  />
                  </div>
                  {touched.name && errors.name && <p>{errors.name}</p>}
                  <label className="add-event-label">Number of Guests</label>
                  <div className="ui input">
                  <Field
                    placeholder="# of Guests"
                    name="guests"
                    type="number"
                  />
                  </div>
                  {touched.guests && errors.guests && <p>{errors.guests}</p>}
                  <label className="add-event-label">Date</label>
                  <div className="ui icon input">
                  <Field
                    placeholder="dd/mm/yyyy"
                    name="date"
                    type="date"
                  />
                  <i aria-hidden="true" className="calendar alternate outline icon"></i>
                  </div>
                  {touched.date && errors.date && <p>{errors.date}</p>}
                  <Button className="add-event-btn" type="button" onClick={() => setPageTwoModal(true)}>Next</Button>
                </>
              }
              {pageTwoModal &&
                <>
                <label className="add-event-label">Budget</label>
                  <div className="ui left icon input">
                  <Field
                    placeholder="Event budget"
                    name="budget"
                    type="number"
                  />
                  <i aria-hidden="true" className="dollar icon"></i>
                  </div>
                  {touched.budget && errors.budget && <p>{errors.budget}</p>}
                  <label className="add-event-label">Theme</label>
                  <div className="ui input">
                  <Field
                    placeholder="Theme"
                    name="theme"
                    type="text"
                  />
                  </div>
                  {touched.theme && errors.theme && <p>{errors.theme}</p>}
                  <Button className="add-event-btn" onClick={() => submitModal()}>Let's Go!</Button>
                </>
              }

            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}

const FormikAddEvent = withFormik({
  mapPropsToValues({ name, guests, theme, date }) {
    return {
      name: name || '',
      guests: guests || '',
      theme: theme || '',
      date: date || '',
      // handleModalClose: handleModalClose
    }
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Event name is required!"),
    guests: Yup.number().required("# of event guests are required!"),
    theme: Yup.string().required("Event theme is required!"),
    date: Yup.string().required("Event date is required!")
  }),

  handleSubmit(values, props) {
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
    // values.handleModalClose();
  }
})(AddEvent)

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps, { addEvent, createEventShoppingList, createEventTodoList })(FormikAddEvent)
