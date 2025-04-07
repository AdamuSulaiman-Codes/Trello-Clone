import React, { useContext, useRef } from 'react'
import { TrelloContext } from '../store/Trello-Context'
import { useParams } from 'react-router';
const Column = ({todo = false, title, selectedBoardAction, }) => {

  const {handleCreateTodoModal, handleOpenDeleteModal, handleCreateNewTask} = useContext(TrelloContext);
  const params = useParams()
  const newTaskRef = useRef(null)

  const boardId = params.id;




  function handleEnter(event, todoId){
    console.log("Enter clicked");
    
    const taskInput = newTaskRef.current.value
    if(event.key === "Enter" && taskInput.trim() !== ""){
      handleCreateNewTask(taskInput, todoId, boardId)
      newTaskRef.current.value = ""
    }
  }
  function handleDelete(todoId){
    handleOpenDeleteModal(boardId, todoId)
  }

  return (
    <div className='column'>
        <h2>{title}</h2>
        {selectedBoardAction.length > 0 ?
        selectedBoardAction.map(selectedBoard => {
          return (
            <div className='task-card' key={selectedBoard.id}>
              <h3>{selectedBoard.title}</h3>
              <input 
                type="text" 
                className="form-input" 
                id="todo-title" 
                placeholder='enter Your Todo'
                ref={newTaskRef}
                onKeyDown={(event)=>{handleEnter(event, selectedBoard.id)}}
                />
                <ul className='tasks-list'>
                  {selectedBoard.tasks.map(task =>{
                    return (
                      <li key={task.id} className='task-list'>{task.taskInput}</li>
                    )
                  })}
                </ul>
              <p>{selectedBoard.description}</p>
              <button className='delete-btn-modal' onClick={() => handleDelete(selectedBoard.id)}>Delete </button>
            </div>
          )
        })
         :
         todo ? <p id='task-card-p'>Create a new task or todo</p> : <p>Drag Todo Here</p>
        }
        {todo && <button id='create-todo' onClick={()=>{
          handleCreateTodoModal()
        }}>+ New Todo</button>}
    </div>
  )
}
export default Column;