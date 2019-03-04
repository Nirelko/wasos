import {stringify} from 'querystring';
import React from 'react';
import {reflex} from 'reflexbox';
import {reduxForm} from 'redux-form';
import {compose, withHandlers} from 'recompose';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

import SearchInput from './search-input/index';

const style = {
  form: {
    margin: '0 0 0 16px'
  }
};

const ReflexForm = reflex('form');

export default compose(
  reduxForm({form: 'loadProduct'}),
  withStyles(style),
  withRouter,
  withHandlers({
    onProductSearch: props => ({url}) => {
      const {loadProduct, history} = props;

      history.push({
        pathname: '/',
        search: `?${stringify({url})}`
      });
      loadProduct({url});
    }
  })
)(({classes: {form}, handleSubmit, onProductSearch, isFetching}) => (
  <ReflexForm column flex auto onSubmit={handleSubmit(onProductSearch)} className={form}>
    <SearchInput text='Your url' disabled={isFetching} />
  </ReflexForm>));