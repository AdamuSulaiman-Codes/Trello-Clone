import { createContext, useRef, useState } from "react";
import Form from "../logical components/Form";
import TodoForm from "../logical components/TodoForm";
import { v4 } from "uuid";

export const TrelloContext = createContext({
    board: [],
    modalContent: null,
    handleCloseModal: ()=>{},
    handleCreateNewBoard: ()=>{},
    handleSaveBoard: ()=>{},
    isModalOpen: false,
    formRef : null,
    setCreateNewBoard: ()=>{},
    handleDeleteBoard: ()=>{},
    handleCreateTodoModal: ()=>{},
    handleCreateNewTodo: ()=>{},
})


const TrelloContextProvider = ({children}) => {
  const [board, setCreateNewBoard] = useState([])  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const formRef = useRef(null)

  function handleCreateNewBoard(){
    console.log("Creating board clicked....");
    
    setModalContent(<Form/>)
    setIsModalOpen(true)
  }

  function handleCloseModal(){
    setModalContent(null)
    setIsModalOpen(false)
  }

  function handleSaveBoard(){
    const randomId  = v4();

    const currentBoardName = formRef.current.value;
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    setCreateNewBoard(prevBoard => {
        const latestBoard = {
            id: randomId,
            boardName: currentBoardName,
            date: formattedDate,
            todos: [],
            inProgress: [],
            Done: []
        }

        const updatedBoard = [...prevBoard, latestBoard]
        localStorage.setItem("board", JSON.stringify(updatedBoard))

        return updatedBoard;
    })

    formRef.current.value = ""

    setIsModalOpen(false)
  }

  function handleDeleteBoard(id){
    const updatedBoard = board.filter(boardItem => boardItem.id !== id);

    setCreateNewBoard(updatedBoard)
    localStorage.setItem("board", JSON.stringify(updatedBoard))
  }

  function handleCreateTodoModal(){
    setModalContent(<TodoForm/>)
    setIsModalOpen(true)
  }
  function handleCreateNewTodo(id, newTodo) {
  setCreateNewBoard((prevBoard) => {
    const updatedBoard = prevBoard.map((boardItem) => {
      if (boardItem.id === id) {
        return { ...boardItem, todos: [...boardItem.todos, newTodo] };
      } else {
        return boardItem;
      }
    });

    localStorage.setItem("board", JSON.stringify(updatedBoard));

    return updatedBoard;
  });
}

  const ctxValues = {
    board,
    modalContent,
    handleCloseModal,
    handleCreateNewBoard,
    isModalOpen,
    formRef,
    handleSaveBoard,
    setCreateNewBoard,
    handleDeleteBoard,
    handleCreateTodoModal,
    handleCreateNewTodo,
  }
  return (
    <TrelloContext.Provider value={ctxValues}>{children}</TrelloContext.Provider>
  )
}

export default TrelloContextProvider