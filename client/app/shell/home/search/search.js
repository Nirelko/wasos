import { stringify } from 'querystring';
import React from 'react';
import withStyles from 'material-ui/styles/withStyles';
import Flex from 'reflexbox/dist/Flex';
import {reduxForm} from 'redux-form';
import {compose, withHandlers} from 'recompose';
import { withRouter } from 'react-router-dom';

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

export default compose(
  reduxForm({form: 'loadProduct'}),
  withStyles(styles),
  withRouter,
  withHandlers({
    onProductSearch: props => ({url}) => {
      const { loadProduct, history } = props;

      history.push({
        pathname: '/',
        search: `?${stringify({url})}`
      });
      loadProduct({url});
    }
  })
)(({classes, handleSubmit, onProductSearch, isFetching}) => (
  <form onSubmit={handleSubmit(onProductSearch)}>
    <Flex column className={classes.container}>
      <Flex align='center' justify='center'>
        <span className={classes.title}>Search your product now and start buying smartly!</span>
      </Flex>
      <SearchInput text='Your url' disabled={isFetching} />
    </Flex>
  </form>));