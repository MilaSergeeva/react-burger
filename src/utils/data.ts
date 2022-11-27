import PropTypes from "prop-types";

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

export { ingridientData, getCookie, setCookie, unsetCookie };
