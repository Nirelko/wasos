import React from 'react';
import {withStyles, ExpansionPanel, ExpansionPanelSummary} from '@material-ui/core';
import {ChevronDown} from 'mdi-material-ui';
import {compose} from 'recompose';

import WatchSummary from './summary';
import WatchDetails from './details';
import Actions from './actions';

const style = {
  expansionPanelRoot: {
    position: 'relative'
  }
};

export default compose(
  withStyles(style)
)(({classes: {expansionPanelRoot}, watch, isMultiSelect}) => (
  <ExpansionPanel classes={{root: expansionPanelRoot}}>
    <ExpansionPanelSummary expandIcon={<ChevronDown />}>
      <WatchSummary {...watch} />
    </ExpansionPanelSummary>
    <WatchDetails form={`updateWatch-${watch._id}`} {...watch} initialValues={{price: watch.price, sizeId: watch.sizeId}} />
    {isMultiSelect && <Actions id={watch._id} />}
  </ExpansionPanel>
));