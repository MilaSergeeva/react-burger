import React, { useEffect } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import success from "../../images/success.png";
import declined from "../../images/declined.png";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { useSelector } from "react-redux";
import appStyles from "../App/app.module.css";

function OrderDetails({ popupOpened, onClose }) {
  const orderDetails = useSelector((state) => state.orderDetails);
  const orderReguestStatus = useSelector(
    (state) => state.orderDetails.orderRequest
  );

  return (
    // <Modal isOpened={popupOpened} header={""} onClose={onClose}>
    <div className={PopupOrderDetailsStyle.contantContainier}>
      {orderReguestStatus ? (
        <div className={appStyles.loader} />
      ) : (
        <>
          {orderDetails.orderNumber.success === true ? (
            <>
              <p className="text text_type_digits-large">
                {orderDetails.orderNumber.order.number}
              </p>
              <p
                className={` ${PopupOrderDetailsStyle.textId} text text_type_main-medium`}
              >
                Идентификатор заказа
              </p>
              <img
                src={success}
                className={PopupOrderDetailsStyle.orderImg}
                alt="done_icon"
              />
              <p
                className={` ${PopupOrderDetailsStyle.textOrderStatus} text text_type_main-default`}
              >
                Ваш заказ начали готовить
              </p>
              <p
                className={` ${PopupOrderDetailsStyle.textInfo} text text_type_main-default`}
              >
                Дождитесь готовности на орбитальной станции
              </p>
            </>
          ) : (
            <>
              <p className="text text_type_digits-large"></p>
              <p
                className={`${PopupOrderDetailsStyle.textId} text text_type_main-medium`}
              >
                Что-то пошло не так.
              </p>
              <img
                src={declined}
                alt="done_icon"
                className={PopupOrderDetailsStyle.orderImg}
              />
              <p
                className={` ${PopupOrderDetailsStyle.textOrderStatus} text text_type_main-default`}
              >
                Попробуйте еще раз чеерз несколько минут.
              </p>
            </>
          )}
        </>
      )}
    </div>
    // </Modal>
  );
}

OrderDetails.propTypes = {
  popupOpened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default OrderDetails;
