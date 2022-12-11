import PropTypes from "prop-types";
import { TOrder, IIngredient } from "../services/types/types";

const ingridientData = PropTypes.shape({
  name: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.any.isRequired,
  image_mobile: PropTypes.any.isRequired,
  image_large: PropTypes.any.isRequired,
  uniqueId: PropTypes.string,
});

const getCookie = (name: string) => {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

const setCookie = (name: string, value: any) => {
  value = encodeURIComponent(value);

  let updatedCookie = `${name}=${value}; path=/`;

  document.cookie = updatedCookie;
};

function unsetCookie(name: string) {
  document.cookie = `${name}=; Max-Age=-99999999;`;
}

const getOrderStatus = (status: string, style: { [key: string]: string }) => {
  return status === "done"
    ? { nameStatus: "Выполнен", colorStatus: style.doneColor }
    : status === "pending"
    ? { nameStatus: "Готовится", colorStatus: style.pendingColor }
    : { nameStatus: "Отменён", colorStatus: style.cancelledColor };
};

const getOrderIngredients = (
  orderIngredients: string[],
  ingridients: IIngredient[]
) => {
  return orderIngredients
    .map((id: string) =>
      ingridients.filter((item: IIngredient) => item._id === id)
    )
    .flat();
};

const getOrderPrice = (ingredients: IIngredient[]) => {
  return ingredients.reduce(
    (acc: number, curr: IIngredient) =>
      curr.type === "bun" ? 2 * curr.price + acc : acc + curr.price,
    0
  );
};

const getOrderNumbers = (orders: TOrder[]) => {
  return orders.slice(0, 30).reduce(
    (acc: { done: number[]; pending: number[] }, curr: TOrder) => {
      curr.status === "done"
        ? acc.done.push(curr.number)
        : acc.pending.push(curr.number);
      return acc;
    },
    { done: [], pending: [] }
  );
};

const getQuantityIngredients = (ingredients: string[]) => {
  const ingredientsWithCounter = {};
  ingredients.reduce((acc: { [key: string]: number }, el: string) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, ingredientsWithCounter);
  return ingredientsWithCounter;
};

const orderCreateDate = (date: Date, orderDate: Date) => {
  const dateNum = Date.parse(date.toISOString().slice(0, 10));
  const orderDateNum = Date.parse(orderDate.toISOString().slice(0, 10));
  return dateNum - orderDateNum === 0
    ? "Сегодня,"
    : (dateNum - orderDateNum) / 86400000 === 1
    ? "Вчера,"
    : `${(dateNum - orderDateNum) / 86400000}  ${"дня(ей) назад,"}`;
};

const getOrderDate = (order: TOrder) => {
  if (order) {
    const date = new Date();
    const orderDate = new Date(order.createdAt);
    const hours =
      orderDate.getHours() > 9
        ? `${orderDate.getHours()}`
        : `0${orderDate.getHours()}`;
    const minutes =
      orderDate.getMinutes() > 9
        ? `${orderDate.getMinutes()}`
        : `0${orderDate.getMinutes()}`;

    return `${orderCreateDate(date, orderDate)} ${hours}:${minutes} i-GMT+${
      (orderDate.getTimezoneOffset() * -1) / 60
    }`;
  }
};

const WS_URL_ALL = "wss://norma.nomoreparties.space/orders/all";
const WS_URL_OWNER = "wss://norma.nomoreparties.space/orders";

export {
  ingridientData,
  getCookie,
  setCookie,
  unsetCookie,
  getOrderStatus,
  getOrderIngredients,
  getOrderPrice,
  getOrderNumbers,
  getQuantityIngredients,
  getOrderDate,
  WS_URL_ALL,
  WS_URL_OWNER,
};
