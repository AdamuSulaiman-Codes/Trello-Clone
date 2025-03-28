import React, { useContext, useEffect } from 'react';
import "./sideBar.css";
import { TrelloContext } from '../store/Trello-Context';
import { useNavigate } from 'react-router';

const SideBar = () => {
  const { handleCreateNewBoard, board, setCreateNewBoard} = useContext(TrelloContext);
  const navigate = useNavigate()

  useEffect(()=>{
    const storedBoards = localStorage.getItem("board");
    if(storedBoards){
      setCreateNewBoard(JSON.parse(storedBoards))
    }else{
      setCreateNewBoard([])
    }
  },[])

  return (
    <nav>
      <ul>
        {board.length > 0 ? (
          board.map(boardItem => (
            <li key={boardItem.id} onClick={()=>{
              navigate(`${boardItem.id}`)
            }}>{boardItem.boardName}</li>
          ))
        ) : (
          <p>You have no board</p>
        )}
      </ul>
      <button className="create-board" onClick={handleCreateNewBoard}>
        + Create Board
      </button>
    </nav>
  );
};

export default SideBar;
