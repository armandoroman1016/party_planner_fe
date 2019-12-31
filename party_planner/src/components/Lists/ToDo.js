import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Button, Header, Modal } from 'semantic-ui-react';
import FormikTodoForm from './ToDoForm';
import { getEventTodoList } from '../../actions'
import ToDoItem from './ToDoItem'
import { updateToDoList } from '../../actions'


const TodoList = props => {

    const { match } = props
    const { id } = props
    
    const eventId = id ? id : props.match.params.id 

    useEffect(() => {
        props.getEventTodoList()
    },[])

    let todoList = props.todoItems.filter(item => {
        if(item.todo_list_id === eventId){
            return item
        }
    })

    useEffect(() => console.log(todoList))
    return(
        <div className = 'modal-container'>
            <Modal className='listModalContainer' trigger={<Button>To Do List</Button>} closeIcon>
                <Modal.Content className='list-content'>
                    <Header style={{color:'rgb(16, 30, 68)', textAlign: 'center', fontSize: "1.8rem"}}>To Do List</Header>
                    {todoList.length ? 
                        todoList.map( item => {
                            return(
                                <ToDoItem key={item.id} item = {item}/>
                            )
                        })
                        :'Your shopping list is currently empty. Click below to add an item.'
                    }
                    <FormikTodoForm match = {match} eventId = {eventId}/>
                    <div style={{width: '100%', textAlign: 'center'}}><Button secondary style={{marginTop: '1rem'}} onClick = {() => props.updateToDoList(todoList)}>Update Changes</Button></div>
                </Modal.Content>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => {
    return {
       todoItems : state.todoItems
    }
}
export default connect(mapStateToProps, {getEventTodoList, updateToDoList})(TodoList)