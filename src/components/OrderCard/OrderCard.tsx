import { memo, FC } from "react";
import styleOrderCard from "./OrderCard.module.css";
import { useSelector } from "../../services/types/hooks";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
// import { ingredientSelectors } from "../../services/selectors";
import {
  getOrderDate,
  getOrderIngredients,
  getOrderPrice,
  getOrderStatus,
} from "../../utils/data";
import { IIngredient } from "../../services/types/types";
import { Link, useLocation } from "react-router-dom";

type TOrderCard = {
  name: string;
  number: number;
  ingredients: Array<string>;
  status?: string;
  order?: any;
};

const OrderCard: FC<TOrderCard> = ({
  name,
  number,
  ingredients,
  status,
  order,
}) => {
  const location = useLocation();
  const pathName =
    location.pathname === "/feed"
      ? `/feed/${order?._id}`
      : `/profile/orders/${order._id}`;
  const ingredientsTotal: IIngredient[] = useSelector(
    (state: any) => state.ingredientReducer.items
  );

  const orderIngredients = getOrderIngredients(
    ingredients,
    ingredientsTotal
  ).slice(0, 6);

  const countIngredients = ingredients.length - 6;

  const orderStatus = status ? getOrderStatus(status, styleOrderCard) : null;

  const price = getOrderPrice(
    getOrderIngredients(order.ingredients, ingredientsTotal)
  );

  const timeOrder = getOrderDate(order);

  return (
    <Link
      className={styleOrderCard.link}
      to={{ pathname: pathName, state: { background: location } }}
    >
      <section className={styleOrderCard.section}>
        <div className={styleOrderCard.orderTime}>
          <span className="text text_type_digits-default">{`#${number}`}</span>
          <span className="text text_type_main-default text_color_inactive">
            {timeOrder}
          </span>
        </div>
        <div className="mb-6">
          <h3 className="text text_type_main-medium">{name}</h3>
          {status && (
            <p
              className={`text text_type_main-default mt-2 ${orderStatus?.colorStatus}`}
            >
              {orderStatus?.nameStatus}
            </p>
          )}
        </div>
        <div className={styleOrderCard.containerOrderImg}>
          <ul className={styleOrderCard.list}>
            {orderIngredients.map((item: IIngredient, index: number) => {
              const zIndex = 6 - index;
              return (
                <li
                  className={styleOrderCard.listItem}
                  key={index}
                  style={{ zIndex }}
                >
                  <img
                    src={item.image_large}
                    alt={item.name}
                    className={styleOrderCard.img}
                  />
                </li>
              );
            })}
            {ingredients.length > 6 && (
              <div className={styleOrderCard.overlay}>
                {" "}
                <span className="text text_type_main-default">{`+${countIngredients}`}</span>
              </div>
            )}
          </ul>
          <div className={styleOrderCard.containerPrice}>
            <div className={styleOrderCard.divPrice}>
              <span className="text text_type_digits-default">{price}</span>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default memo(OrderCard);