import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { deleteEvent } from '../actions/eventActions'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react';

const ConfirmDelete = ({ deleteEvent, eventId, handleEventMenu }) => {

  const history = useHistory()
  const [confirmOpen, setConfirmOpen] = useState(false);
  
  const handleConfirmOpen = () => {
    handleEventMenu(false)
    // closes the event settings menu on click
    setConfirmOpen(true);
  }

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  }

  const handleDel = async (id) => {

    handleConfirmClose()
    await deleteEvent(id)

  }

  return (
      <div className = 'confirm-delete'>
        <p onClick={handleConfirmOpen}>Delete Event</p>
        <Confirm
          content="Deleting an event is irreversible. Do you want to delete this event?"
          cancelButton = "Never mind"
          confirmButton={<Button style={{backgroundColor: '#E3696A'}}>Delete</Button>}
          open={confirmOpen}
          onCancel={handleConfirmClose}
          onConfirm={() => handleDel(eventId)} 
          color="red"
          className = 'confirm'
          size = 'large'
          id = 'delete-confirm'
        />
      </div>
  )
}

export default connect(null, { deleteEvent })(ConfirmDelete)