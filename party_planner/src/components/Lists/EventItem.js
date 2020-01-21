import React, { useState } from 'react'
import checked from '../../assets/images/checked.svg'
import unchecked from '../../assets/images/unchecked.svg'
import { Icon } from 'semantic-ui-react'
import FormikShoppingForm from './EventItemForm'

const ListItem = (props) => {
    
    const { itemType, item, updateItem, updateToDoList } = props
    
    
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
            if(isShopping){

                item.purchased = false
                updateItem([item])


            }else if(!isShopping){

                item.completed = false
                updateToDoList([item])

            }

        // if status is currently unchecked / set it to checked
        }else if(status === unchecked){

            setRadioStatus(checked)
            
            // update the item object
            if(isShopping){

                item.purchased = true
                updateItem([item])

            }else if(!isShopping){

                item.completed = true
                updateToDoList([item])

            }

        }
    }

    const handleCostChange = (e) =>{

        setCost(e.target.value)
        
    }

    const updateCost = () => {

        item.cost = Number(cost)

        updateItem([item])

        setEdit(false)

    }

    return (
        <div className = 'item-container'>
            <img src = {radioStatus} alt = 'radio-button' onClick = {() => handleUpdated(radioStatus)}/>
            <p>{item.name}</p>
            {!edit && <p>{item.cost? `$ ${item.cost}` : null}</p>}
            { !edit && isShopping ? <Icon name = 'edit outline' onClick = {() => setEdit(true)}/> : null}
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