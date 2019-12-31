import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'


const Track = styled.div`
    width:96%;
    margin-bottom: 15px;
    height:3.8rem;
    background: transparent;
    border: 1.2px solid #ACC1AD;
    border-radius: 10px;
    box-shadow: inset 0 0 px #ebf1fa;
    color:#898A9E
`;

const Thumb = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;

    background-color: #C7DDC8
    border-radius: 8px;
    transition: width 0.5s ease-in-out;
`
    // background-color:#39DB80;
    
const ProgressBar = props => {

    const { event } = props 

    const purchasedShopping = props.shoppingListItems.filter( item => item.shopping_list_id === event.id && (item.purchased === true || item.purchased === 1))
    const purchasedEntertainment = props.entertainmentList.filter( item => item.todo_list_id === event.id)

    const totalShopping = purchasedShopping.reduce((acc, item, index) => {
        acc += item.price;
        return acc
    },0)

    const totalEntertainment = purchasedEntertainment.reduce((acc, item, index) =>{
        acc += item.price;
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
        <h4>CURRENT BUDGET</h4>
            <Track>
                {currentPercent < 100 ? 
                    <Thumb percentage ={limit(0,currentPercent,100)}/> 
                    : <Thumb percentage = {limit(0,currentPercent,100)} style={{backgroundColor: 'red'}}/>}
                    {currentPercent < 100 ? 
                        <p style = {{display: 'flex', justifyContent:'flex-end', transform: 'translateY(-135%)', color:'#6B7078', marginRight: '20px'}}>${remainingBudget} Remaining</p>
                        : <p style = {{display: 'flex', justifyContent:'flex-end', transform: 'translateY(-135%)', color:'#6B7078', marginRight: '20px'}}>${remainingBudget} Over Budget</p>}
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