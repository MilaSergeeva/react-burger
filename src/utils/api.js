export const ingridientsDataApi =
  "https://norma.nomoreparties.space/api/ingredients";

export function checkResponse(res) {
  if (res.ok) {
    return res;
  } else {
    throw Error(`Error during request`);
  }
}

export const ingredients = [
  "60d3b41abdacab0026a733c6",
  "609646e4dc916e00276b286e",
  "609646e4dc916e00276b2870",
  "60d3b41abdacab0026a733c6",
];

// export function makeOrder(ingredients) {
//   fetch("https://norma.nomoreparties.space/api/orders", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ ingredients }),
//   })
//     .then((response) => response.json())
//     .then((res) => console.log(res));
// }
