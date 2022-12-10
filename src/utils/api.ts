export const baseUrl = "https://norma.nomoreparties.space/api";

export function checkResponse(res: Response) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}
