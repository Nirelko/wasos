import React from 'react';
import { Flex } from 'reflexbox';

import Header from './header';
import Routes from './rotues';
import Footer from './footer';

export default () => (
  <Flex column auto>
    <Header />
    <Flex auto>
      <Routes />
    </Flex>
    <Footer />
  </Flex>
);