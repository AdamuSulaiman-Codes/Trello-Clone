import React, { useContext, useRef } from "react";
import "./TodoForm.css";
import { TrelloContext } from "../store/Trello-Context";
import { useParams } from "react-router";
import { v4 } from "uuid";


const TodoForm = () => {
  const {handleCreateNewTodo, board, handleCloseModal} = useContext(TrelloContext) 
  const params = useParams() 
  const titleRef = useRef()
  const descriptionRef = useRef()

  const currentBoard = board.find(boardItem => boardItem.id === params.id)


  function handleSubmit(event){
    event.preventDefault()
    const randomId = v4()
    const todo = {
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id: randomId,
        tasks: [],
    }
        
    handleCreateNewTodo(params.id, todo)

    titleRef.current.value = ""
    descriptionRef.current.value = ""


    handleCloseModal()
  }
  return (
    <form
      id="todo-form"
      onSubmit={handleSubmit}
    >
      <h3>{currentBoard.boardName}</h3>
      <input
        type="text"
        id="todo-title"
        className="form-input"
        placeholder="Enter Todo Title..."
        ref={titleRef}
        required
      />
      <textarea
        id="todo-description"
        className="form-textarea"
        placeholder="Enter Todo Description..."
        ref={descriptionRef}
        required
      ></textarea>
      <button type="submit" id="submit-btn" className="form-button">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
