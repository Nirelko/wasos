import React from 'react';
import { Flex, reflex } from 'reflexbox';
import { withStyles } from 'material-ui/styles';
import { Typography, Card, List } from 'material-ui';

import StoresDetail from './stores-details';

const styles = ({
  image: {
    width: '400px'
  },
  container: {
    margin: '15px 60px'
  },
  name: {
    margin: '0 15px'
  }
});

export default withStyles(styles)(({ classes: { image, container, name }, product = {} }) => (
  <Flex className={container}>
    <div>
      <Card>
        <img src={product.images && product.images[0]} className={image} />
      </Card>
    </div>
    <Flex className={name} column>
      <Typography type='title'>
        {product.name}
      </Typography>
      <StoresDetail {...product} />
    </Flex>

  </Flex>
));