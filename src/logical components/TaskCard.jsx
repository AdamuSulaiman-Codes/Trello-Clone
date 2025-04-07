import { useContext } from "react"
import { TrelloContext } from "../store/Trello-Context"
import { useParams } from "react-router";
import { useRef } from "react";
import React from "react";
const TaskCard = ({title, description, todoId, selectedBoard, selectedBoardId}) => {

  const {handleOpenDeleteModal, handleCreateNewTask} = useContext(TrelloContext);

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
    <div className='task-card' key={selectedBoardId}>
      <h3>{title}</h3>
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
        <p>{description}</p>
        <button className='delete-btn-modal' onClick={() => handleDelete(todoId)}>Delete </button>
    </div>
  )
}

export default TaskCard