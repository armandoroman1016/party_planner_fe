import React from 'react'

const ListItem = (props) => {

    const { itemType, item } = props

    console.log(item)
    console.log(itemType)
    return (
        <div className = 'item-container'>
            Carrots
        </div>

    )
    
}
export default ListItem