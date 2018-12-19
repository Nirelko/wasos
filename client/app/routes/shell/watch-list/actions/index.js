import React from 'react';
import {withStyles, IconButton, Divider} from '@material-ui/core';
import {Flex} from 'reflexbox';
import {CheckboxMultipleMarkedOutline} from 'mdi-material-ui';
import {compose} from 'recompose';

import MultiSelectActions from './multi-select-actions';

const style = {
  icon: {
    width: '30px',
    height: '30px'
  }
};

export default compose(
  withStyles(style)
)(({classes: {icon}, toggleMultiSelect, isMultiSelect, onSubmit: handleSubmit, watches}) => (
  <Flex column mb={8}>
    <Divider variant='fullWidth' />
    <Flex justify='flex-end'>
      {isMultiSelect && <MultiSelectActions onSubmit={handleSubmit} toggleMultiSelect={toggleMultiSelect} />}
      <IconButton color='primary' onClick={toggleMultiSelect} disabled={!watches.length}>
        <CheckboxMultipleMarkedOutline className={icon} />
      </IconButton>
    </Flex>
  </Flex>
));