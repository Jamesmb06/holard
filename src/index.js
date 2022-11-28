import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import "./styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
  <Router />
  </Provider>
);
