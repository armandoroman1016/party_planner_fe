import React, { useState } from 'react';

import { Button, Confirm, Icon } from 'semantic-ui-react';

const ConfirmDelete = ({ deleteEvent, targetObject, history }) => {

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  }

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  }

  return (
    <>
      <div>
        <Icon className="delete-event-icon" onClick={handleConfirmOpen} name='trash alternate' />
        <Confirm
          content="Are you sure you want to delete this event?"
          confirmButton={<Button style={{backgroundColor: 'rgb(208, 17, 31)'}}>Delete</Button>}
          open={confirmOpen}
          onCancel={handleConfirmClose}
          onConfirm={() => deleteEvent(targetObject, history)} color="red"
        />
      </div>
    </>
  )
}

export default ConfirmDelete