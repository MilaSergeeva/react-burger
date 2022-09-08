import React from "react";
import Modal from "../Modal/Modal";
import ModalOverlayStyle from "./ModalOverlay.module.css";

function ModalOverlay({ product, onClose }) {
  return (
    <div
      className={ModalOverlayStyle.overlay}
      style={product && { display: "flex" }}
    >
      <Modal product={product} onClose={onClose} />
    </div>
  );
}

ModalOverlay.propTypes = {
  product: ingridientData.isRequired,
  onClose: PropTypes.func,
};

export default ModalOverlay;
