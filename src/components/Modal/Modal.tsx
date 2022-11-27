import React, { createRef, useEffect, FC, SyntheticEvent } from "react";
import ModalStyle from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PortalReactDOM from "react-dom";
import {
  UPDATE_ORDER_INGRIDIENTS_DELAILS,
  makeOrder,
} from "../../services/actions/order";
import { TModal } from "./modalType";

const modalRoot = document.getElementById("modals") as HTMLElement;

const Modal: FC<TModal> = ({ isOpened, children, header, onClose }) => {
  const drawerRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (drawerRef && isOpened) {
      const currentEl = drawerRef.current as HTMLDivElement;
      currentEl.focus();
    }
  }, [drawerRef, isOpened]);

  const handleClickOutside = (e: React.SyntheticEvent): void => {
    const targetElement = e.target as Element;
    if (targetElement.classList.contains("popupOverlay")) {
      onClose();
    }
  };

  //закрытие модального окна по esc
  function handleCloseByEsc(evt: React.KeyboardEvent<HTMLElement>): void {
    if (evt.key === "Escape") {
      onClose();
    }
  }

  if (modalRoot) {
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
  } else {
    return null;
  }
};

export default Modal;
