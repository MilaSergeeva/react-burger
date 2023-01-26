import React from "react";
// import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers/index.js";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { socketMiddleware } from "./services/middleware/webSocketMiddleware";
import { WS_URL_ALL, WS_URL_OWNER } from "./utils/data";
import { TWSActions } from "./services/actions/wsOrders";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const composeEnhancers =
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
//     : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

export const store = createStore(rootReducer, enhancer);

// const root = ReactDOM.createRoot(document.getElementById("root"));

const root = document.getElementById("root");

render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
