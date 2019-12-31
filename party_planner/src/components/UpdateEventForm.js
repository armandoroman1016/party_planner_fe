import React, { useEffect, useState } from 'react'
import { Field, Form, withFormik } from 'formik'
import * as Yup from 'yup'
import { connect } from 'react-redux'

import { Modal, Button, Header, Icon } from 'semantic-ui-react';

import { updateEvent } from '../actions/eventActions';

import ConfirmDelete from './ConfirmDelete';

const UpdateEvent = ({ deleteEvent, targetObject, touched, errors, history, match, updateEvent, status }) => {

  const [modalOpen, setModalOpen] = useState(false);

  const [pageTwoModal, setPageTwoModal] = useState(false);

  useEffect(() => {
    status && updateEvent(status, match.params.id, history);
  }, [status])

  const handleModalOpen = () => {
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  }

  return (
    <div className="add-event-modal">
      <Modal open={modalOpen} className="modalContainer" onClose={handleModalClose} trigger={<Icon className='edit-button' onClick={handleModalOpen} name="edit" />}>
        <Modal.Content>
          <Modal.Description className="add-event-form">
            <div className="form-header">
              {pageTwoModal && <Icon className="first-page" name="arrow left" onClick={() => setPageTwoModal(false)} />}
              <Header style={{ color:'rgb(16, 30, 68)', fontSize: "1.8rem", marginBottom: 0, marginTop: 0, marginLeft: pageTwoModal || '7rem', marginRight: pageTwoModal && '5.5rem' }}>Edit Event</Header>
              {pageTwoModal || <Icon className="second-page" name='arrow right' onClick={() => setPageTwoModal(true)} />}
              {pageTwoModal && <ConfirmDelete deleteEvent={deleteEvent} targetObject={targetObject} history={history} />}
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
                  <Button className="add-event-btn" onClick={() => setTimeout(function () { handleModalClose(); }, 0.1)}>Let's Go!</Button>
                </>
              }

            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}

const FormikUpdateEvents = withFormik({
  mapPropsToValues(props) {

    let targetEvent = props.events.filter(event => {
      if (event.id.toString() === props.match.params.id) {
        return event
      }
    })

    const targetObj = { ...targetEvent[0] }

    return {
      name: targetObj.name || '',
      theme: targetObj.theme || '',
      guests: targetObj.guests || '',
      date: targetObj.date || '',
      budget: targetObj.budget || ''
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string(),
    theme: Yup.string(),
    guests: Yup.number(),
    date: Yup.string(),
    budget: Yup.number()
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    resetForm();
    setStatus(values);
  }
})(UpdateEvent)

const mapStateToProps = state => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps, { updateEvent })(FormikUpdateEvents)