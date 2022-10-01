import React, { useEffect } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import success from "../../images/success.png";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
// import { ingredients } from "../../utils/api";
// import { makeOrder } from "../../services/actions/index";
import { useSelector, useDispatch } from "react-redux";

function OrderDetails({ popupOpened, onClose }) {
  // const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);

  // useEffect(() => dispatch(makeOrder(ingredients)), [dispatch]);

  return (
    <Modal isOpened={popupOpened} header={""} onClose={onClose}>
      <div className={PopupOrderDetailsStyle.contantContainier}>
        <p className="text text_type_digits-large">
          {orderDetails.success === true
            ? orderDetails.orderNamber.order.number
            : "kra"}
        </p>
        <p className="text text_type_main-medium" style={{ marginTop: 32 }}>
          Идентификатор заказа
        </p>
        <img
          src={success}
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
