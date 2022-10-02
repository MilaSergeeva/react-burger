import React from "react";
import ModalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClick }) {
  return (
    <div
      className={`${ModalOverlayStyle.overlay} popupOverlay`}
      onClick={onClick}
    />
  );
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
