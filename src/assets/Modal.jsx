import React, { useContext } from "react";
import "./modal.css"
import { TrelloContext } from "../store/Trello-Context";
const Modal = () => {
  const {modalContent, handleCloseModal} = useContext(TrelloContext)

  return (
    <div className="modal-overlay" onClick={handleCloseModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleCloseModal}>✖</button>
        {modalContent}
      </div>
    </div>
  );
};

export default Modal;