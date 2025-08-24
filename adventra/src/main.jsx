import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "./i18n";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { initTheme } from "./themes/toogleTheme.jsx";
import {GoogleAPIKey} from "./firebase.js";

initTheme();

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GoogleAPIKey}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
