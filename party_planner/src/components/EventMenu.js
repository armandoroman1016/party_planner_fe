import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import { Icon } from 'semantic-ui-react'
import dots from '../assets/images/dots.svg'

const EventMenu = ( props ) => {

    const { eventId, backgroundColor } = props

    const [ open, setOpen ] = useState(false)
    
    return(
        <div className = 'event-menu-container'>
            <img 
            src = { dots } 
            alt = 'settings icon' 
            onClick = {() => setOpen(!open)} 
            className = { !open ? '' : 'invisible'}/>
            <div 
            className = { open ? 'event-menu' : 'event-menu invisible'}
            style = {{ background: backgroundColor ? backgroundColor : "#fff" }}
            >
                <Icon name = 'close' onClick = {() => setOpen(!open)} />
                <div>
                    <Link to = {`/events/edit/${eventId}`}>Edit</Link>
                    <ConfirmDelete eventId = { eventId } handleEventMenu = { setOpen }/>
                </div>
            </div>
        </div>
    )
}

export default EventMenu