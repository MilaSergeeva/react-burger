import React, { useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Modal from "../Modal/Modal";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./app.module.css";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import Profile from "../Profile/Profile";
import Register from "../auth_components/Register/Register.js";
import Login from "../auth_components/Login/Login.js";
import ForgotPassword from "../auth_components/ForgotPassword/ForgotPassword";
import ResetPassword from "../auth_components/ResetPassword/ResetPassword";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import NotFound404 from "../NotFound404/NotFound404";
import { useDispatch } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { getItems } from "../../services/actions/index";

function App() {
  const history = useHistory();
  const location = useLocation();

  const background = location.state && location.state.background;

  const handleModalClose = () => history.goBack();

  const dispatch = useDispatch();

  useEffect(() => dispatch(getItems()), [dispatch]);

  return (
    <div className={appStyles.appBlock}>
      <AppHeader />
      <Switch location={background || location}>
        <ProtectedRoute onlyForAuth={true} path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={false} path="/register" exact>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={false} path="/login" exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={false} path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={false} path="/reset-password" exact>
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
              <BurgerIngredients />

              <BurgerConstructor />
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
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:number">
            <Modal isOpened={true} onClose={handleModalClose} header={""}>
              <OrderDetails />
            </Modal>
          </Route>
        </>
      )}
    </div>
  );
}

export default App;
