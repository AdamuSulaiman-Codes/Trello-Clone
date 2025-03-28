import React from 'react';
import './mainSection.css';
import Column from './Column';
import { useParams } from 'react-router'
import { TrelloContext } from '../store/Trello-Context';
import { useContext } from 'react';
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from 'react-router';

const MainSection = () => {
  const {board, handleDeleteBoard} = useContext(TrelloContext)
  const params = useParams()
  const navigate = useNavigate()



  const selectedBoard = board.find(boardItem => boardItem.id === params.id)

  if(!selectedBoard){
    return <p>Board not found. Please select a valid board</p>
  }
  return (
    <section id='main-section-container'>
      <div className='playable'>
        <h3>{selectedBoard.boardName}</h3>
        <h3>{selectedBoard.date}</h3>
        <FaTrashAlt color='red' className='icon' onClick={()=>{
          console.log("Deleting board,");
          handleDeleteBoard(selectedBoard.id)
          navigate("/")
        }}/>
      </div>
      <main className='main-section'>
        <Column 
          todo
          title={"To do"}
          selectedBoardAction={selectedBoard.todos}
          />
        <Column 
          title={"In Progress"}
          selectedBoardAction={selectedBoard.inProgress}
        />
        <Column
          title={"Done"}
          selectedBoardAction={selectedBoard.Done}
        />
      </main>
    </section>
  );
};

export default MainSection;
