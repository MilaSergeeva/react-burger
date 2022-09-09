import React, { useEffect } from "react";
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
  onClose: PropTypes.func,
  isOpened: PropTypes.bool,
  header: PropTypes.string,
  children: PropTypes.any,
};

export default ModalOverlay;
