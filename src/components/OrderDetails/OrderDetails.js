import React from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import done from "../../images/done.png";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";

function OrderDetails({ popupOpened, onClose }) {
  return (
    <Modal isOpened={popupOpened} header={""} onClose={onClose}>
      <div className={PopupOrderDetailsStyle.contantContainier}>
        <p className="text text_type_digits-large">034536</p>
        <p className="text text_type_main-medium" style={{ marginTop: 32 }}>
          Идентификатор заказа
        </p>
        <img
          src={done}
          style={{ marginTop: 60, marginBottom: 60 }}
          alt="done_icon"
        />
        <p className="text text_type_main-default" style={{ marginTop: 8 }}>
          Ваш заказ начали готовить
        </p>
        <p className="text text_type_main-default" style={{ color: "#8585AD" }}>
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </Modal>
  );
}

ModalOverlay.propTypes = {
  popupOpened: PropTypes.func,
  onClose: PropTypes.func,
};

export default OrderDetails;
