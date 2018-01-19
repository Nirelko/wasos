import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from './theme';
import Shell from './shell';

export default () => (
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  </MuiThemeProvider>
);
