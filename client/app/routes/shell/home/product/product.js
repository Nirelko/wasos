import queryString from 'querystring';
import React from 'react';
import {Flex} from 'reflexbox';
import {withStyles, Card} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';

import ProductHeader from './header';
import StoresDetails from './stores-details';


const styles = theme => ({
  detailsCard: {
    position: 'relative',
    margin: '16px 8px'
  },
  image: {
    width: '400px',
    margin: '16px'
  },
  container: {
    padding: '48px 48px',
    background: theme.palette.grey[200]
  },
  detailsContainer: {
    margin: '8px 16px 16px 16px'
  },
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
)(({classes: {image, detailsCard, storesDetails}, product = {}, currency}) => (
  <Card className={detailsCard}>
    <Flex wrap>
      <div>
        <img src={product.images && product.images[0]} className={image} />
      </div>
      <ProductHeader {...product} />
      <StoresDetails className={storesDetails} {...product} currency={currency} />
    </Flex>
  </Card>
));