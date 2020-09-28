import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import blue from "@material-ui/core/colors/blue";
import App from "./components/App";
import configureStore from "./configure_store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[800],
      hover: blue[500],
      active: blue[800],
    },
    text: {
      primary: "#D8D8D8",
    },
    background: {
      paper: "#292929",
    },
    type: "dark",
  },
});

const store = configureStore();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div
        style={{
          height: "100%",
          position: "absolute",
          left: "0px",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <App />
      </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
