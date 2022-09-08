import React from "react";
import PopupOrderConfirmationStyle from "./PopupOrderConfirmation.css";

function PopupOrderConfirmation() {
  return (
    <div
      className={PopupOrderConfirmationStyle.overlay}
      style={product && { display: "flex" }}
    >
      <div className={PopupOrderConfirmationStyle.procuctCardContainier}>
        <button
          onClick={onClose}
          lassName={PopupOrderConfirmationStyle.closeButton}
          style={{ background: "none", border: "none" }}
        >
          <CloseIcon type="primary" />
        </button>

        <div className={PopupOrderConfirmationStyle.contantContainier}>
          <p className="text text_type_digits-large">1234567890</p>
          <p className="text text_type_main-medium" style={{ marginTop: 32 }}>
            Order ID
          </p>
          <img
            src="../../images.done.png"
            style={{ marginTop: 60, marginBottom: 60 }}
          />
          <p className="text text_type_main-default" style={{ marginTop: 8 }}>
            We have started to cook your order
          </p>
          <p
            className="text text_type_main-default"
            style={{ color: "#8585AD" }}
          >
            Wait for the order to be ready at the orbital station
          </p>
        </div>
      </div>
    </div>
  );
}

export default PopupOrderConfirmation;
