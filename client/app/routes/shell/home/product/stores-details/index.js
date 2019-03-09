import React, {Fragment} from 'react';

import StoreDetailsTutorial from './store-details-tutorial';
import StoreDetails from './store-details';

export default ({storesDetails = [], currency}) => (
  <Fragment>
    <StoreDetailsTutorial />
    {storesDetails.map(x => <StoreDetails key={x.relatedCountries} {...x} currency={currency} />)}
  </Fragment>
);