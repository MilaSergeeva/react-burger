import React from "react";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import success from "../../images/success.png";
import { useParams } from "react-router-dom";

function OrderDetails() {
  let { number } = useParams();

  return (
    <div className={PopupOrderDetailsStyle.contantContainier}>
      <p className="text text_type_digits-large">{number}</p>
      <p
        className={` ${PopupOrderDetailsStyle.textId} text text_type_main-medium`}
      >
        идентификатор заказа
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
    </div>
  );
}

export default OrderDetails;
