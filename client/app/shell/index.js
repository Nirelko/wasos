import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles} from 'material-ui/styles';
import {compose} from 'recompose';

import Header from './header';
import Routes from './rotues';
import Footer from './footer';

const styles = {
  appContainer: {
    overflowY: 'auto'
  }
};

export default compose(
  withStyles(styles)
)(({classes: {appContainer}}) => (
  <Flex className={appContainer} column auto>
    <Header />
    <Flex column auto>
      <Routes />
    </Flex>
    {/* <Footer /> */}
  </Flex>
));