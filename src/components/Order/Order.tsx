import { memo, useEffect, FC } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import appStyles from "../App/app.module.css";
import { useDispatch, useSelector } from "../../services/types/hooks";
import { IIngredient } from "../../services/types/types";
import OderFeedIngredients from "../OrderFeedIngredients/OderFeedIngredients";
import styleOrder from "./Order.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  WS_CONNECTION_START_AUTH,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED_AUTH,
  WS_CONNECTION_CLOSED,
} from "../../services/actions/wsOrders";
import {
  getOrderDate,
  getQuantityIngredients,
  getOrderIngredients,
  getOrderPrice,
  getOrderStatus,
} from "../../utils/data";
import { TOrder } from "../../services/types/types";

const Order: FC<any> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const isProfile = !!useRouteMatch("/profile");

  const ingridients = useSelector(
    (state: any) => state.ingredientReducer.items
  );

  useEffect(() => {
    dispatch(
      isProfile
        ? { type: WS_CONNECTION_START_AUTH }
        : { type: WS_CONNECTION_START }
    );
    return () => {
      dispatch(
        isProfile
          ? { type: WS_CONNECTION_CLOSED_AUTH }
          : { type: WS_CONNECTION_CLOSED }
      );
    };
  }, [dispatch, isProfile]);

  const { orders } = useSelector((state: any) =>
    isProfile ? state.wsAuth.data : state.ws.data
  );

  const wsConnected = useSelector((state: any) =>
    isProfile ? state.wsAuth.wsConnected : state.ws.wsConnected
  );

  const order = orders.find((i: TOrder) => i._id === id) as TOrder;
  const timeOrder = getOrderDate(order);

  if (order && wsConnected) {
    const numberOfIngredients = getQuantityIngredients(order.ingredients);

    const orderIngredients = getOrderIngredients(
      Object.keys(numberOfIngredients),
      ingridients
    );

    const quantity: Array<number> = Object.values(numberOfIngredients);

    const price = getOrderPrice(
      getOrderIngredients(order.ingredients, ingridients)
    );
    const status = getOrderStatus(order.status, styleOrder);
    const render = () => {
      return (
        <section className={styleOrder.section}>
          <span
            className={`text text_type_digits-default mb-10 ${styleOrder.orderNumber}`}
          >
            #{order.number}
          </span>
          <h3 className="text text_type_main-medium mb-3">{order.name}</h3>
          <span
            className={`text text_type_main-default mb-8 ${status.colorStatus}`}
          >
            {status.nameStatus}
          </span>
          <p className="text text_type_main-medium mb-4">Состав:</p>
          <ul className={styleOrder.list}>
            {orderIngredients.map((ingredient: IIngredient, index: number) => {
              return (
                <li key={index}>
                  <OderFeedIngredients
                    ingredient={ingredient}
                    quantity={quantity[index]}
                  />
                </li>
              );
            })}
          </ul>
          <div className={styleOrder.totalPrice}>
            <span className="text text_type_main-default text_color_inactive">
              {timeOrder}
            </span>
            <div className={styleOrder.div}>
              <span className="text text_type_digits-default">{price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </section>
      );
    };
    return render();
  } else {
    return <div className={appStyles.loader} />;
  }
};

export default memo(Order);
