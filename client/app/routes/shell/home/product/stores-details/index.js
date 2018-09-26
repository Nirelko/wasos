import React from 'react';
import {Flex} from 'reflexbox';

import StoreDetails from './store-details';

export default ({storesDetails = [], currency}) => (
  <Flex wrap>
    {
      storesDetails.map(x => <StoreDetails key={x.relatedCountries} {...x} currency={currency} />)
    }
  </Flex>
);