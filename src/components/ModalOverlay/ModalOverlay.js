import React from "react";
import Modal from "../Modal/Modal";
import ModalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import PortalReactDOM from "react-dom";

const modalRoot = document.getElementById("modals");

function ModalOverlay({ children, isOpened, onClick, header, onClose }) {
  return PortalReactDOM.createPortal(
    <div
      className={ModalOverlayStyle.overlay + " " + "popup"}
      style={isOpened ? { display: "flex" } : { display: "none" }}
    >
      <Modal
        children={children}
        onClick={onClick}
        header={header}
        onClose={onClose}
      />
    </div>,
    modalRoot
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  isOpened: PropTypes.bool,
  header: PropTypes.string,
  children: PropTypes.any,
};

export default ModalOverlay;
