import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import primaryColor from "@material-ui/core/colors/blueGrey";
import App from "./components/App";
import configureStore from "./configure_store";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor[500],
      hover: primaryColor[400],
      selected: primaryColor[600],
      active: primaryColor[600],
    },
    text: {
      primary: "#D8D8D8",
    },
    background: {
      paper: "#292929",
      levelZero: "#000000", // (0, 0, 0)
      levelOne: "#0a0a0a", // (10, 10, 10)
      levelTwo: "#141414", // (20, 20, 20)
      levelThree: "#1e1e1e", // (30, 30, 30)
      levelFour: "#282828", // (40, 40, 40)
      levelFive: "#323232", // (50, 50, 50)
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
