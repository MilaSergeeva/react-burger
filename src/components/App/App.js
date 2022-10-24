import React, { useState, useEffect } from "react";
import {
  Route,
  Switch,
  useLocation,
  useHistory,
  useParams,
} from "react-router-dom";
import Modal from "../Modal/Modal";
// import * as userAuth from "../utils/authorization.js";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Profile from "../Profile/Profile";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import NotFound404 from "../NotFound404/NotFound404";
import { updateCartList } from "../../services/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { makeOrder } from "../../services/actions/index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UPDATE_ORDER_INGRIDIENTS_DELAILS } from "../../services/actions/index";

function App() {
  const [selectedIngridientCard, setSelectedIngridientCard] = useState(false);
  const [ingridientPopupOpened, setIngridientPopupOpened] = useState(false);
  const [checkoutPopupOpened, setCheckoutPopupOpened] = useState(false);

  const history = useHistory();
  const location = useLocation();
  let { id } = useParams();

  const background = location.state && location.state.background;

  React.useEffect(() => {
    console.log("location", location);
    console.log("background", background);
  }, [location]);

  const handleModalClose = () => history.goBack();

  const dispatch = useDispatch();
  const cartBurgerFillings = useSelector(
    (state) => state.burgerConstructorList.fillings
  );

  const cartBurgerBuns = useSelector(
    (state) => state.burgerConstructorList.bun
  );

  // useEffect(() => {
  //   dispatch(makeOrder(ingredients));
  // }, [dispatch]);

  const burgerIngridients = () => {
    const ingridientsTotal = [];

    cartBurgerBuns !== null && ingridientsTotal.push(cartBurgerBuns._id);
    if (cartBurgerFillings.length >= 1) {
      cartBurgerFillings.forEach((element) => {
        ingridientsTotal.push(element._id);
      });
    }
    dispatch({ type: UPDATE_ORDER_INGRIDIENTS_DELAILS, ingridientsTotal });
    return ingridientsTotal;
  };

  const handleCardClick = (ingridient) => {
    setSelectedIngridientCard(ingridient);
    setIngridientPopupOpened(true);
  };

  const handleProceedOrder = (burgerIngredients) => {
    dispatch(makeOrder(burgerIngredients()));

    setCheckoutPopupOpened(true);
  };

  // function closeAllPopups() {
  //   setIngridientPopupOpened(false);
  //   setCheckoutPopupOpened(false);
  // }

  const onDropHandler = (item) => {
    dispatch(updateCartList(item));
  };

  return (
    <div className={appStyles.appBlock}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/register" exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute path="/login" exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRoute>
        <Route path="/ingridients/:id" exact>
          <div className={appStyles.ingridientDetailsContainier}>
            <h1>Детали ингридиента</h1>
            <IngredientDetails />
          </div>
        </Route>
        <Route path="/" exact>
          <main className={appStyles.content}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients
                // ingridients={ingridients.data}
                onCardClick={handleCardClick}
              />

              <BurgerConstructor
                onButtonClick={() => handleProceedOrder(burgerIngridients)}
                onDropHandler={onDropHandler}
                // ingridients={ingridients.data}
              />
            </DndProvider>
          </main>
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingridients/:id" exact>
            <Modal
              isOpened={true}
              onClose={handleModalClose}
              header={"Детали ингридиента"}
            >
              <IngredientDetails
              // product={selectedIngridientCard}
              // popupOpened={true}
              // onClose={closeAllPopups}
              />
            </Modal>
            {/* <IngredientDetails
              product={selectedIngridientCard}
              popupOpened={true}
              onClose={closeAllPopups}
            /> */}
          </Route>
          {/* <Route path="/feed/:number">
            <OrderDetails popupOpened={true} onClose={closeAllPopups} />
          </Route> */}
        </>
      )}
    </div>
  );
}

export default App;
