import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { ColorModeScript } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ColorModeScript
      initialColorMode={{
        initialColorMode: "dark",
        useSystemColorMode: false,
      }}
    />
    <App />
  </>
);
