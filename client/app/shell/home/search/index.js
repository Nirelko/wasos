import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Flex from 'reflexbox/dist/Flex';

import SearchInput from './search-input';

const styles = {
  container: {
    fontSize: '25px',
    margin: '40px 5%'
  },
  title: {
    marginBottom: '20px'
  }
};

export default withStyles(styles)(({ classes }) => (
  <Flex column className={classes.container}>
    <Flex align='center' justify='center'>
      <span className={classes.title}>Search your product now and start buying smartly!</span>
    </Flex>
    <SearchInput text='Your url' />
  </Flex>));