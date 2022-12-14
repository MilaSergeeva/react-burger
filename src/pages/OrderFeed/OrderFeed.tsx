import React, { memo, useEffect } from "react";
import OrderCardList from "../../components/OrdersCardList/OrdersCardList";
import OrdersTotal from "../../components/OrdersTotal/OrdersTotal";
import styleOrderFeed from "./OrderFeed.module.css";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from "../../services/actions/wsOrders";
import { useDispatch, useSelector } from "../../services/types/hooks";

const OrderFeed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const wsOrders = useSelector((state: any) => state.wsReducer.data);

  return (
    <section className={styleOrderFeed.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styleOrderFeed.orderListContainier}>
        <OrderCardList orders={wsOrders.orders} />
        <OrdersTotal data={wsOrders} />
      </div>
    </section>
  );
};

export default OrderFeed;
