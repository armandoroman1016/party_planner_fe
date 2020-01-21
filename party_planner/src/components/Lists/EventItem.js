import React, { useState } from 'react'
import checked from '../../assets/images/checked.svg'
import unchecked from '../../assets/images/unchecked.svg'
import { Icon } from 'semantic-ui-react'
import FormikShoppingForm from '../Lists/ShoppingListForm'

const ListItem = (props) => {
    
    const { itemType, item, updateItem } = props

    // boolean that will be used for comparison throughout the code of this component
    const isShopping = itemType === 'shopping'

    const [ cost, setCost ] = useState( isShopping && item.cost ? item.cost : '')
    const [ edit, setEdit ] = useState( false )

    // useState hook to decide on which radio button to render
    const [ radioStatus, setRadioStatus ] = useState(item.purchased || item.completed ? checked : unchecked)

    // function that updates the radio status button
    const handleUpdated = (status) => {

        // if status is currently checked / set it to unchecked
        if(status === checked){

            setRadioStatus(unchecked) 

            // update the item object
            if(itemType ==='shopping'){

                item.purchased = false

            }else if(itemType === 'todo'){

                item.completed = false

            }

        // if status is currently unchecked / set it to checked
        }else if(status === unchecked){

            setRadioStatus(checked)
            
            // update the item object
            if(itemType ==='shopping'){

                item.purchased = true

            }else if(itemType === 'todo'){

                item.completed = true

            }

        }
    }

    const handleCostChange = (e) =>{

        setCost(e.target.value)
        
    }

    const updateCost = () => {

        item.cost = cost

        updateItem([item])

        setEdit(false)
    }

    return (
        <div className = 'item-container'>
            <img src = {radioStatus} alt = 'radio-button' onClick = {() => handleUpdated(radioStatus)}/>
            <p>{item.name}</p>
            {!edit && <p>{item.cost? `$ ${item.cost}` : null}</p>}
            { !edit && <Icon name = 'edit outline' onClick = {() => setEdit(true)}/>}
            {isShopping && edit ? 
                <div className = 'edit-item-cost'>
                    <input name = 'cost' value = {cost} placeholder = 'Item cost' onChange = {(e) => handleCostChange(e) }/>
                    <button onClick = {() => updateCost()}>Confirm</button>
                </div>
            : null}
            
            
        </div>

    )
    
}

export default ListItem