import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";

function OrderDetails({ popupOpened, onClose }) {
  return (
    <ModalOverlay isOpened={popupOpened} header={""} onClose={onClose}>
      <div className={PopupOrderDetailsStyle.contantContainier}>
        <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-medium" style={{ marginTop: 32 }}>
          Order ID
        </p>
        <img src={done} style={{ marginTop: 60, marginBottom: 60 }} />
        <p className="text text_type_main-default" style={{ marginTop: 8 }}>
          We have started to cook your order
        </p>
        <p className="text text_type_main-default" style={{ color: "#8585AD" }}>
          Wait for the order to be ready at the orbital station
        </p>
      </div>
    </ModalOverlay>
  );
}

ModalOverlay.propTypes = {
  popupOpened: PropTypes.func,
  onClose: PropTypes.func,
};

export default OrderDetails;
