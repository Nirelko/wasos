import { createStore, combineReducers, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import reduxLogger from 'redux-logger';
import { reducer as form } from 'redux-form';
import axios from 'axios';

import productSearch from './shell/home/search/redux';
import currencies from './shell/header/currency-chooser/redux';

const axiosClient = axios.create({
  baseURL: '/api'
});

export default createStore(
  combineReducers({
    productSearch,
    currencies,
    form
  }),
  applyMiddleware(
    axiosMiddleware(axiosClient),
    reduxLogger,
  )
);