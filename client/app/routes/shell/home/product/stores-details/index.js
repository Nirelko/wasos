import React, {Fragment} from 'react';

import StoreDetails from './store-details';

export default ({storesDetails = [], sizeSchemeToSizesNames, sizeScheme, currency}) => (
  <Fragment>
    {storesDetails.map(x => <StoreDetails key={x.relatedCountries} {...x} currency={currency} sizeSchemeToSizesNames={sizeSchemeToSizesNames} sizeScheme={sizeScheme} />)}
  </Fragment>
);