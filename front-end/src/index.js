import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { ConfigProvider } from "antd";
import "./App.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FF6A00",
          colorLink: "#FF6A00",
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
  // </React.StrictMode>
);
