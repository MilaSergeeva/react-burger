import React, { FC, memo } from "react";
import orderTotalStyle from "./OrdersTotal.module.css";
import { TWSData } from "../../services/types/types";
import { getOrderNumbers } from "../../utils/data";

type TOrders = {
  data: TWSData;
};

const OrderTotal: FC<TOrders> = ({ data }) => {
  const { orders } = data;
  const { done, pending } = getOrderNumbers(orders);

  return (
    <section className={orderTotalStyle.section}>
      <div className={orderTotalStyle.boardContainer}>
        <div className="mr-9">
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={orderTotalStyle.list}>
            {done.map((item: number, index: number) => {
              return (
                <li
                  key={index}
                  className={`text text_type_digits-default ${orderTotalStyle.listItem}`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={orderTotalStyle.list}>
            {pending.map((item: number, index: number) => {
              return (
                <li key={index} className={`text text_type_digits-default`}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <span
          className={`text text_type_digits-large ${orderTotalStyle.numberOrder}`}
        >
          {data.total}
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
        <span
          className={`text text_type_digits-large ${orderTotalStyle.numberOrder}`}
        >
          {data.totalToday}
        </span>
      </div>
    </section>
  );
};

export default memo(OrderTotal);
