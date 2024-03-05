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

  const divideDoneOrders = (array) => {
    let size = 10;
    let subarray = [] as any;
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
      subarray[i] = array.slice(i * size, i * size + size);
    }

    return subarray;
  };

  divideDoneOrders(done);

  return (
    <section className={orderTotalStyle.section}>
      <div className={orderTotalStyle.boardContainer}>
        <div className="mr-9">
          <h3 className="text text_type_main-medium mb-6">Ready:</h3>
          <div className={orderTotalStyle.doneOrdersCotaiier}>
            {divideDoneOrders(done).map((array: [], index: number) => {
              return (
                <ul
                  className={orderTotalStyle.list}
                  key={index + Math.random()}
                >
                  {array.map((item: number, index: number) => {
                    return (
                      <li
                        key={index + Math.random()}
                        className={`text text_type_digits-default ${orderTotalStyle.listItem} ${orderTotalStyle.done}`}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text text_type_main-medium mb-6">In progress:</h3>
          <div className={orderTotalStyle.doneOrdersCotaiier}>
            {divideDoneOrders(pending).map((array: [], index: number) => {
              return (
                <ul className={orderTotalStyle.list}>
                  {array.map((item: number, index: number) => {
                    return (
                      <li
                        key={index}
                        className={`text text_type_digits-default`}
                      >
                        {item}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-15 mb-15">
        <h3 className="text text_type_main-medium">Completed overall:</h3>
        <span
          className={`text text_type_digits-large ${orderTotalStyle.numberOrder}`}
        >
          {data.total}
        </span>
      </div>
      <div>
        <h3 className="text text_type_main-medium">Completed today:</h3>
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
