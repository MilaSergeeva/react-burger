import React, { FC, useEffect } from "react";
import styleOrdersCardList from "./OrdersCardList.module.css";
import OrderCard from "../OrderCard/OrderCard";
import { TOrder } from "../../services/types/types";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_CLOSED_AUTH,
} from "../../services/actions/wsOrders";
import { useDispatch } from "../../services/types/hooks";
import { useRouteMatch } from "react-router-dom";

type TOrders = {
  orders: TOrder[];
};

const OrdersCardList: FC<TOrders> = ({ orders }) => {
  const dispatch = useDispatch();
  const isUserProfile = useRouteMatch("/profile");

  useEffect(() => {
    isUserProfile && dispatch({ type: WS_CONNECTION_START_AUTH });
    return () => {
      isUserProfile && dispatch({ type: WS_CONNECTION_CLOSED_AUTH });
    };
  }, [dispatch]);

  return (
    <section className={styleOrdersCardList.section}>
      <ul className={styleOrdersCardList.list}>
        {orders &&
          orders.map((order: any) => {
            return (
              <li key={order._id}>
                <OrderCard
                  ingredients={order.ingredients}
                  order={order}
                  number={order.number}
                  name={order.name}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default OrdersCardList;
