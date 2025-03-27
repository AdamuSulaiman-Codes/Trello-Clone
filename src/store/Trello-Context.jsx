import { createContext, useRef, useState } from "react";
import Form from "../logical components/Form";
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
    

    setCreateNewBoard(prevBoard => {
        const latestBoard = {
            id: randomId,
            boardName: currentBoardName,
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

  const ctxValues = {
    board,
    modalContent,
    handleCloseModal,
    handleCreateNewBoard,
    isModalOpen,
    formRef,
    handleSaveBoard,
    setCreateNewBoard,
  }
  return (
    <TrelloContext.Provider value={ctxValues}>{children}</TrelloContext.Provider>
  )
}

export default TrelloContextProvider