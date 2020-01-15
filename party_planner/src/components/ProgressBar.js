import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Track = styled.div`
    width:100%;
    margin-bottom: 15px;
    height:4rem;
    background: transparent;
    border: 1.2px solid #DCDDE4;
    border-radius: 20px;
    box-shadow: inset 0 0 px #ebf1fa;
    color:#898A9E
`;

const Thumb = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #DCDDE4
    border-radius: 20px;
    transition: width 0.5s ease-in-out;
`
    
const ProgressBar = props => {

    const { event } = props 

    const purchasedShopping = props.shoppingListItems.filter( item => item.event_id === event.id && (item.purchased === true || item.purchased === 1))
    const purchasedEntertainment = props.entertainmentList.filter( item => item.event_id === event.id)

    const totalShopping = purchasedShopping.reduce((acc, item, index) => {
        acc += item.cost;
        return acc
    },0)

    const totalEntertainment = purchasedEntertainment.reduce((acc, item, index) =>{
        acc += item.cost;
        return acc
    },0)

    const totalSpent = totalShopping + totalEntertainment

    let currentPercent = (totalSpent / event.budget) * 100

    let remainingBudget = event.budget - totalSpent

    const limit = (min, currentVal, max) => {
        return Math.min(Math.max(min, currentVal), max)
    }

    return(
        <div className = 'progress-bar'> 
        <h4>BUDGET STATUS</h4>
            <Track>
                {currentPercent < 100 ? 
                    <Thumb percentage ={limit(0,currentPercent,100)}/> 
                    : <Thumb percentage = {limit(0,currentPercent,100)} style={{backgroundColor: 'red'}}/>}
                    {currentPercent < 100 ? 
                        <p className = 'budget-indicator'>${remainingBudget} Remaining</p>
                        : <p className = 'budget-indicator'>${remainingBudget} Over Budget</p>}
            </Track>
        </div>
    )
}

const mapStateToProps = ( state ) => {
    return{
        events : state.events,
        shoppingListItems : state.shoppingListItems,
        entertainmentList : state.entertainmentList
    }
}

export default connect(mapStateToProps, {})(ProgressBar)