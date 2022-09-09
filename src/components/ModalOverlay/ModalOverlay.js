import React, { useEffect } from "react";
import ModalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ onClose }) {
  // закрытие модального окна по оверлей
  const handleClickOutside = (e) => {
    if (e.target.classList.contains("popup")) {
      onClose();
    }
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

  return <div className={`${ModalOverlayStyle.overlay} popup`} />;
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
  isOpened: PropTypes.bool,
  header: PropTypes.string,
  children: PropTypes.any,
};

export default ModalOverlay;
