import React from 'react';
import {MuiThemeProvider} from '@material-ui/core';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

import theme from './theme';
import store from './store.redux';
import history from './history';
import Routes from './routes';

export default function App () {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    </MuiThemeProvider>
  );
}
