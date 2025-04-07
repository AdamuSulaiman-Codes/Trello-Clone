import React, { useContext, useRef } from 'react'
import { TrelloContext } from '../store/Trello-Context'
import TaskCard from '../logical components/TaskCard';
const Column = ({todo = false, title, selectedBoardAction, }) => {

  const {handleCreateTodoModal} = useContext(TrelloContext);
 
  return (
    <div className='column'>
        <h2>{title}</h2>
        {selectedBoardAction.length > 0 ?
        selectedBoardAction.map(selectedBoard => {
          return (
            <TaskCard 
              title={selectedBoard.title}
              selectedBoardId={selectedBoard.id}
              description={selectedBoard.description}
              selectedBoard={selectedBoard}
              todoId={selectedBoard.id}
            />
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