import React from "react";
import "./Form.css";
import { useContext } from "react";
import { TrelloContext } from "../store/Trello-Context";
const Form = () => {
  const {formRef, handleSaveBoard} = useContext(TrelloContext)

  return (
    <form id="board-form" onSubmit={(event) => {
        event.preventDefault();
        handleSaveBoard()
    }}>
      <input
        type="text"
        id="board-name"
        className="form-input"
        placeholder="Enter Board Name..."
        ref={formRef}
        required
      />
      <button type="submit" id="submit-btn" className="form-button">
        Save
      </button>
    </form>
  );
};

export default Form;
