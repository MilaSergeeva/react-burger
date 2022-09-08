import React from "react";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function Modal({ children, header, onClick, onClose }) {
  return (
    <div className={ModalStyle.procuctCardContainier} onClick={onClick}>
      <h1 className="text text_type_main-large">{header}</h1>
      <button onClick={onClose} className={ModalStyle.closeButton}>
        <CloseIcon type="primary" />
      </button>
      {children}
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  header: PropTypes.string,
  children: PropTypes.any,
};

export default Modal;
