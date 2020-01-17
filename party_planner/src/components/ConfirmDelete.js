import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import { deleteEvent } from '../actions/eventActions'
import { connect } from 'react-redux'
import { Button, Confirm } from 'semantic-ui-react';

const ConfirmDelete = ({ deleteEvent, eventId }) => {

  const history = useHistory()
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
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
      <div>
        <p onClick={handleConfirmOpen}>Delete Event</p>
        <Confirm
          content="Deleting an event is irreversible. Do you want to delete this event?"
          confirmButton={<Button style={{backgroundColor: 'rgb(208, 17, 31)'}}>Delete</Button>}
          open={confirmOpen}
          onCancel={handleConfirmClose}
          onConfirm={() => handleDel(eventId)} 
          color="red"
        />
      </div>
  )
}

export default connect(null, { deleteEvent })(ConfirmDelete)