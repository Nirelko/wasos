import React, {Fragment} from 'react';

import StoreDetails from './store-details';

export default ({storesDetails = [], currency}) => (
  <Fragment>
    {storesDetails.map(x => <StoreDetails key={x.relatedCountries} {...x} currency={currency} />)}
  </Fragment>
);