import React, { Component } from 'react'
import Map from './GoogleMaps'


class MapsContainer extends Component {
    render() {
      return(
        <Map
            google={this.props.google}
            center={{lat: 37.335480, lng: -121.893028}}
            height='300px'
            zoom={13}
       />
        )
    }
  }

export default MapsContainer