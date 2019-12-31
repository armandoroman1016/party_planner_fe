import React from "react";
import { Icon} from "semantic-ui-react";
import { connect } from 'react-redux'
import { deleteEntertainmentItem } from '../../actions'

const EntertainmentItem = props => {
  const { item } = props;

  return (
    <div className='item'>
        <h3>{item.name}</h3>
        <p>Cost: ${item.price}</p>
        <Icon className='delete-item-icon' name = 'trash alternate' onClick = {() => props.deleteEntertainmentItem(item.id)}/>
    </div>
  );
};

const mapStateToProps = state =>{
  return state
}
export default connect(mapStateToProps, {deleteEntertainmentItem})(EntertainmentItem)