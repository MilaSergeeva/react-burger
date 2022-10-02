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

export { ingridientData };
