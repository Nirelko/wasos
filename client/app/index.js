import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {MuiThemeProvider} from 'material-ui/styles';
import {Provider} from 'react-redux';

import store from './store.redux';
import theme from './theme';
import Shell from './shell';

export default () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <BrowserRouter>
        <Shell />
      </BrowserRouter>
    </Provider>
  </MuiThemeProvider>
);
