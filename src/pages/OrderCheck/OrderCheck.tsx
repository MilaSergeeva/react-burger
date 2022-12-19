import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsOrders";
import Order from "../../components/Order/Order";

const OrderCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  console.log("kra");

  return (
    <section>
      <Order />
    </section>
  );
};

export default OrderCheck;
