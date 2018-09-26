import queryString from 'querystring';
import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles, Typography, Card} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';

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

export default compose(
  withStyles(styles),
  lifecycle({
    componentDidMount () {
      const {initExampleProduct, loadProduct} = this.props;
      const urlParams = document.location.search && queryString.parse(document.location.search.substring(1));

      if (!urlParams || !urlParams.url) {
        initExampleProduct();

        return;
      }

      loadProduct(urlParams.url);
    }
  })
)(({classes: {image, container, productName, detailsCard, detailsContainer}, product = {}, currency}) => (
  <Flex className={container} align='center'>
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
        <StoresDetail {...product} currency={currency} />
      </Flex>
    </Card>
  </Flex>
));