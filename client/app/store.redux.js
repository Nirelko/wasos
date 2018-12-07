import {createStore, combineReducers, applyMiddleware} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import reduxLogger from 'redux-logger';
import {reducer as form} from 'redux-form';
import axios from 'axios';
import simplePromiseMiddleware, {resolve, reject} from 'redux-simple-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import {connectRouter, routerMiddleware} from 'connected-react-router';

import history from './history';
import productSearch from './routes/shell/home/product/redux';
import currencies from './routes/shell/header/currency-chooser/redux';
import auth from './routes/exterior/login/redux';
import register from './routes/exterior/register/redux';
import watches from './routes/shell/home/product/header/header-actions/watch-actions/redux';
import tokenManager from '../common/token-manager';


const axiosClient = axios.create({
  baseURL: '/api'
});

axiosClient.interceptors.request.use(config => {
  const auth = tokenManager.get('auth');

  if (!auth) {
    return config;
  }

  config.headers.authorization = `Bearer ${auth.token}`;

  return config;
});

export default createStore(
  connectRouter(history)(
    combineReducers({
      productSearch,
      currencies,
      auth,
      register,
      watches,
      form
    })),
  composeWithDevTools(applyMiddleware(
    axiosMiddleware(axiosClient, {
      successSuffix: resolve(''),
      errorSuffix: reject('')
    }),
    reduxLogger,
    simplePromiseMiddleware(),
    routerMiddleware(history)
  )));