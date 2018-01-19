import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Flex from 'reflexbox/dist/Flex';

const styles = {
  title: {
    fontSize: '40px',
    marginBottom: '20px'
  },
  subTitle: {
    fontSize: '20px'
  }
};

export default withStyles(styles)(({ classes }) => (
  <Flex auto>
    <Flex auto column align='center' justify='center'>
      <span className={classes.title}>Save your time and money</span>
      <span className={classes.subTitle}>Find your size at the best price of Asos products</span>
    </Flex>
    <Flex auto column align='center' justify='center'>
      <span>Picture of the reminder here</span>
    </Flex>
  </Flex>));