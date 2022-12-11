import React, { FC, memo } from "react";
import styleOrdersCardList from "./OrdersCardList.module.css";
import OrderCard from "../OrderCard/OrderCard";
import { TOrder } from "../../services/types/types";

type TOrders = {
  orders: TOrder[];
};

const OrderCardList: FC<TOrders> = ({ orders }) => {
  return (
    orders && (
      <section className={styleOrdersCardList.section}>
        <h2 className="text text_type_main-large">Лента заказов</h2>
        <ul className={styleOrdersCardList.list}>
          {orders.map((order: any) => {
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
    )
  );
};

export default memo(OrderCardList);
