import React from 'react';
import { Flex } from 'reflexbox';
import { withStyles } from 'material-ui/styles';

import Preview from './preview';
import Search from './search';

const styles = theme => ({
  contentCard: {
    background: `linear-gradient(141deg, ${theme.palette.primary[500]} 0%, ${theme.palette.primary[300]} 51%, ${theme.palette.primary[500]} 100%)`,
    height: '60vh',
    color: 'white'
  }
});

export default withStyles(styles)(({ classes }) => (
  <Flex column auto>
    <Flex className={classes.contentCard} column>
      <Preview />
      <Search />
    </Flex>
  </Flex>
));