import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AudioControls from "./components/Shared/AudioControls/AudioControls";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter
      basename={process.env.NODE_ENV === "production" ? "/uno" : "/"}
    >
      <CssBaseline />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
