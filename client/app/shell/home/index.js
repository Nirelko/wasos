import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles} from '@material-ui/core';
import {compose} from 'recompose';

import Preview from './preview';
import QuickSearchTutorial from './quick-search-tutorial';
import Search from './search';
import Product from './product';

const styles = theme => ({
  contentCard: {
    background: theme.palette.primary[600],
    color: 'white'
  }
});

export default compose(
  withStyles(styles)
)(({classes: {contentCard}}) => (
  <div>
    <Flex className={contentCard} column>
      <Preview/>
      <Search/>
      <QuickSearchTutorial/>
    </Flex>
    <Product/>
  </div>
));
