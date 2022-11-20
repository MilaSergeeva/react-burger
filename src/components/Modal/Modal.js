import React, { createRef, useEffect } from "react";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PortalReactDOM from "react-dom";
import {
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  makeOrder,
} from "../../services/actions/order";

const modalRoot = document.getElementById("modals");

function Modal({ isOpened, children, header, onClose }) {
  const drawerRef = createRef();

  useEffect(() => {
    if (drawerRef && isOpened) {
      drawerRef.current.focus();
    }
  }, [drawerRef, isOpened]);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popupOverlay")) {
      onClose();
    }
  };

  //закрытие модального окна по esc
  function handleCloseByEsc(evt) {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  return PortalReactDOM.createPortal(
    <div
      style={isOpened ? { display: "flex" } : { display: "none" }}
      className={`${ModalStyle.popupContainier} popup`}
      ref={drawerRef}
      onKeyDown={handleCloseByEsc}
      tabIndex={-1}
    >
      <div className={ModalStyle.procuctCardContainier}>
        <h1 className="text text_type_main-large">{header}</h1>
        <button onClick={onClose} className={ModalStyle.closeButton}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={handleClickOutside} />
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  isOpened: PropTypes.bool.isRequired,
};

export default Modal;
