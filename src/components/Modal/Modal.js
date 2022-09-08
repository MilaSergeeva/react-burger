import React from "react";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import ingridientData from "../../utils/data";

function Modal({ product, onClose }) {
  return (
    <div className={ModalStyle.procuctCardContainier}>
      <h1 className="text text_type_main-large">Ingredient details</h1>
      <button onClick={onClose} className={ModalStyle.closeButton}>
        <CloseIcon type="primary" />
      </button>
    </div>
  );
}

Modal.propTypes = {
  product: ingridientData.isRequired,
  onClose: PropTypes.func,
};

export default Modal;
