import React, { useContext } from 'react'
import { TrelloContext } from '../store/Trello-Context'
const Column = ({todo = false, title, selectedBoardAction, }) => {
  const {handleCreateTodoModal} = useContext(TrelloContext);

  return (
    <div className='column'>
        <h2>{title}</h2>
        {selectedBoardAction.length > 0 ?
        selectedBoardAction.map(selectedBoard => {
          return (
            <div className='task-card' key={selectedBoard.id}>
              <h3>{selectedBoard.title}</h3>
              <p>{selectedBoard.description}</p>
            </div>
          )
        })
         :
         <p id='task-card-p'>Create a new task or todo</p>
        }
        {todo && <button id='create-todo' onClick={()=>{
          handleCreateTodoModal()
        }}>+ New Todo</button>}
    </div>
  )
}
export default Column