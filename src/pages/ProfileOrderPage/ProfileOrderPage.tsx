import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
} from "../../services/actions/wsOrders";
import Order from "../../components/Order/Order";

const ProfileOrderPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
    };
  }, [dispatch]);

  console.log("kra");

  return (
    <section>
      <Order />
    </section>
  );
};

export default ProfileOrderPage;
