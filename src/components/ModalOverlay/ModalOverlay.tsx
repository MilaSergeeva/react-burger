import React, { FC } from "react";
import ModalOverlayStyle from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { TModalOverlay } from "./modaOverlayType";

const ModalOverlay: FC<TModalOverlay> = ({ onClick }) => {
  return (
    <div
      className={`${ModalOverlayStyle.overlay} popupOverlay`}
      onClick={onClick}
    />
  );
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
