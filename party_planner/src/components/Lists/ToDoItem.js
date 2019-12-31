import React, { useState } from "react";
import { Checkbox } from "semantic-ui-react";

const ToDoItem = props => {

  const [queueToUpdate, setQueueToUpdate] = useState(false);

  const { item } = props;

  let initialState = item.completed
  
  const updateCompleted = () => {
    initialState = !initialState
    item.completed = initialState
    setQueueToUpdate(!queueToUpdate)
  }

  return (
    <div style={{display: 'flex', alignItems:'center'}}>
        <Checkbox style = {{marginRight: '1rem'}} onClick = {updateCompleted} checked={initialState ? true : false} />
        {item.completed ? <h3 style = {{textDecorationLine: 'line-through', margin: 0}}>{item.name}</h3> : <h3 style={{margin: 0}}>{item.name}</h3>}
    </div>

  );
};

export default ToDoItem;
