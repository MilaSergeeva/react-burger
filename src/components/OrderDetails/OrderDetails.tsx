import React from "react";
import PopupOrderDetailsStyle from "./OrderDetails.module.css";
import success from "../../images/success.png";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { number } = useParams<{ number?: string }>();

  return (
    <div className={PopupOrderDetailsStyle.contantContainier}>
      <p className="text text_type_digits-large">{number}</p>
      <p
        className={` ${PopupOrderDetailsStyle.textId} text text_type_main-medium`}
      >
        order ID
      </p>
      <img
        src={success}
        className={PopupOrderDetailsStyle.orderImg}
        alt="done_icon"
      />
      <p
        className={` ${PopupOrderDetailsStyle.textOrderStatus} text text_type_main-default`}
      >
        We are preparing your order
      </p>
      <p
        className={` ${PopupOrderDetailsStyle.textInfo} text text_type_main-default`}
      >
        Wait for completion on the orbital station
      </p>
    </div>
  );
}

export default OrderDetails;
