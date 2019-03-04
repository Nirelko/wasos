import queryString from 'querystring';
import React from 'react';
import {Flex, reflex} from 'reflexbox';
import {Grid, withStyles, Card} from '@material-ui/core';
import {compose, lifecycle} from 'recompose';

import ProductHeader from './header';
import StoresDetails from './stores-details';

const ReflexGrid = reflex(Grid);

const styles = theme => ({
  detailsCard: {
    position: 'relative',
    margin: '16px 8px'
  },
  image: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 32px)',
      margin: '16px'
    },
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  container: {
    padding: '48px 48px',
    background: theme.palette.grey[200]
  },
  detailsContainer: {
    margin: '8px 16px 16px 16px'
  },
  storeDetailsContainer: {
    [theme.breakpoints.up('lg')]: {
      flexWrap: 'wrap'
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
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
)(({classes: {image, detailsCard, storesDetails, storeDetailsContainer}, product = {}, currency}) => (
  <Card className={detailsCard}>
    <Grid container>
      <Grid item lg='3' xs='12'>
        <img src={product.images && product.images[0]} className={image} />
      </Grid>
      <ReflexGrid item lg='9' xs='12' flex column>
        <ProductHeader {...product} />
        <Flex className={storeDetailsContainer} justify='center'>
          <StoresDetails className={storesDetails} {...product} currency={currency} />
        </Flex>
      </ReflexGrid>
    </Grid>
  </Card>
));