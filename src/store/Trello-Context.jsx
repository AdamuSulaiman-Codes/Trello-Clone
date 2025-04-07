import { createContext, useRef, useState } from "react";
import Form from "../logical components/Form";
import TodoForm from "../logical components/TodoForm";
import { v4 } from "uuid";
import DeleteMessage from "../componenets/DeleteMessage";

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
    handleOpenDeleteModal: ()=>{},
    handleDeleteTodo: ()=>{},
    handleCreateNewTask: ()=>{},
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

  function handleOpenDeleteModal(boardId, todoId){
    setModalContent(<DeleteMessage boardId={boardId} todoId={todoId}/>)
    setIsModalOpen(true)
  }

  function handleDeleteTodo(boardId, todoId) {
    setCreateNewBoard(prevBoard => {
      const updatedBoard = prevBoard.map(boardItem => {
        if (boardItem.id === boardId) {
          return {
            ...boardItem,
            todos: boardItem.todos.filter(todo => todo.id !== todoId) 
          };
        }else{
          return boardItem;
        }
      });

      localStorage.setItem("board", JSON.stringify(updatedBoard));

      return updatedBoard;
    });

    setModalContent(null)
    setIsModalOpen(false)
  }

  function handleCreateNewTask(taskInput, todoId, boardId){
    const randomId = v4()
    setCreateNewBoard(prevBoard => {
      const updatedBoard = prevBoard.map(boardItem => {
        if(boardItem.id === boardId){
          const updatedTodo = boardItem.todos.map(todoItem => {
            if(todoItem.id === todoId){
              return{
                ...todoItem,
                tasks: [...todoItem.tasks, {taskInput: taskInput, id: randomId}]
              };
            }
            return todoItem
          });

          return {
            ...boardItem,
            todos: updatedTodo
          }
        }
        return boardItem;
      });

      localStorage.setItem("board", JSON.stringify(updatedBoard))

      return updatedBoard
    })
  }

  console.log(board);
  

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
    handleOpenDeleteModal,
    handleDeleteTodo,
    handleCreateNewTask,
  }
  return (
    <TrelloContext.Provider value={ctxValues}>{children}</TrelloContext.Provider>
  )
}

export default TrelloContextProvider