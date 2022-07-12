import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "./contexts/ConfigContext";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App";
import { store, persister } from "./store";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider>
      <PersistGate loading={null} persistor={persister}>
        <App />
      </PersistGate>
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
reportWebVitals();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorkerRegistration.register();
