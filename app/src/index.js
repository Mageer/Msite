import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import lime from '@material-ui/core/colors/lime';
import App from './components/App';
import configureStore from './configure_store';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: lime[500],
    },
    type: 'dark',
  },
  color: 'white',
});

const store = configureStore();

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <div style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden', }}>
       <App />
    </div>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
