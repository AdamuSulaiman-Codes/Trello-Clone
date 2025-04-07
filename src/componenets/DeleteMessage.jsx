import React, { useContext } from 'react'
import { TrelloContext } from '../store/Trello-Context'
import { useParams } from 'react-router'
const DeleteMessage = ({boardId, todoId}) => {
  const {handleDeleteTodo} = useContext(TrelloContext)


  return (
    <div className='delete'>
        <p>Are you sure you want to Delete</p>
        <button id='submit-btn' onClick={()=>
          handleDeleteTodo(boardId, todoId)
        }>Delete</button>
    </div>
  )
}

export default DeleteMessage