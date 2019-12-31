import React from 'react'
import { connect } from 'react-redux'



const Event = props => {

    return(
        <div>{props.events[0].theme}</div>
    )

}

const mapStateToProps = state => {
    return{
        events: state.events
    }
}

export default connect(mapStateToProps,{})(Event)