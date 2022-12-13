import React, { FC, memo } from "react";
import styleOrdersCardList from "./OrdersCardList.module.css";
import OrderCard from "../OrderCard/OrderCard";
import { TOrder } from "../../services/types/types";

type TOrders = {
  orders: TOrder[];
};

const OrdersCardList: FC<TOrders> = ({ orders }) => {
  return (
    <section className={styleOrdersCardList.section}>
      <ul className={styleOrdersCardList.list}>
        {orders &&
          orders.map((order: any) => {
            return (
              <li key={order._id}>
                <OrderCard
                  number={order.number}
                  name={order.name}
                  ingredients={order.ingredients}
                  order={order}
                />
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default OrdersCardList;
