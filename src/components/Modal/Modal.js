import React, { useEffect } from "react";
import ModalStyle from "./Modal.module.css";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PortalReactDOM from "react-dom";

const modalRoot = document.getElementById("modals");

function Modal({ isOpened, children, header, onClick, onClose }) {
  // закрытие модального окна по оверлей
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popupOverlay")) {
      onClose();
      console.log("nzm");
    }
    console.log("kra", e.target);
  };

  useEffect(() => {
    const elements = document.getElementsByClassName("popup");
    console.log(elements);

    for (const element of elements) {
      element.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      for (const element of elements) {
        element.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, []);

  //закрытие модального окна по esc
  useEffect(() => {
    function handleCloseByEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleCloseByEsc);
    return () => {
      document.removeEventListener("keydown", handleCloseByEsc);
    };
  }, []);

  return PortalReactDOM.createPortal(
    <div
      style={isOpened ? { display: "flex" } : { display: "none" }}
      className={`${ModalStyle.popupContainier} popup`}
      onClick={onClick}
    >
      <div className={ModalStyle.procuctCardContainier} onClick={onClick}>
        <h1 className="text text_type_main-large">{header}</h1>
        <button onClick={onClose} className={ModalStyle.closeButton}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay></ModalOverlay>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  onClick: PropTypes.func,
  header: PropTypes.string,
  children: PropTypes.any,
};

export default Modal;
