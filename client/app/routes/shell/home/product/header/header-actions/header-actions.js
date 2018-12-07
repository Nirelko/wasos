import React, {Fragment} from 'react';

import ProtectedComponent from '../../../../../../../common/protected-component';
import SizeGuideAction from './size-guide-action';
import WatchActions from './watch-actions';

export default ({isExample, sizeGuide}) => (
  <Fragment>
    {sizeGuide && <SizeGuideAction /> }
    <ProtectedComponent>
      {!isExample && <WatchActions />}
    </ProtectedComponent>
  </Fragment>
);
