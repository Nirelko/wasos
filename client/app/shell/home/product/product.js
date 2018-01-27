import React from 'react';
import { Flex, reflex } from 'reflexbox';
import { withStyles } from 'material-ui/styles';
import { Typography, Card } from 'material-ui';

import StoresDetail from './stores-details';

const styles = theme => ({
  image: {
    width: '400px'
  },
  container: {
    padding: '48px 48px',
    background: theme.palette.grey[200]
  },
  productName: {
    marginLeft: '25px'
  },
  detailsCard: {
    margin: '0 36px'
  },
  detailsContainer: {
    margin: '16px'
  }
});

export default withStyles(styles)(({ classes: { image, container, productName, detailsCard, detailsContainer }, product = {} }) => (
  <Flex className={container}>
    <div>
      <Card>
        <img src={product.images && product.images[0]} className={image} />
      </Card>
    </div>
    <Card className={detailsCard}>
      <Flex column className={detailsContainer}>
        <Typography className={productName} type='title'>
          {product.name}
        </Typography>
        <StoresDetail {...product} />
      </Flex>
    </Card>
  </Flex>
));