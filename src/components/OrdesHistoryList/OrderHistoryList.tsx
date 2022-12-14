import React, { memo, useEffect } from "react";
import {
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_START_AUTH,
} from "../../services/actions/wsOrders";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { TOrder } from "../../services/types/types";
import OrderCard from "../OrderCard/OrderCard";
import styleOrdersHistoryList from "./OrdersHistoryList.module.css";

const OrdersHistoryList = () => {
  const dispatch = useDispatch();

  const wsAuthOrders = useSelector((state: any) => state.wsReducerAuth.data);
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
    };
  }, [dispatch]);

  const { orders } = wsAuthOrders;

  return (
    <section className={styleOrdersHistoryList.section}>
      <ul className={styleOrdersHistoryList.list}>
        {orders.map((order: TOrder) => {
          return (
            <li key={order._id}>
              <OrderCard
                number={order.number}
                name={order.name}
                ingredients={order.ingredients}
                status={order.status}
                order={order}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default memo(OrdersHistoryList);
