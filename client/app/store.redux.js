import {createStore, combineReducers, applyMiddleware} from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import reduxLogger from 'redux-logger';
import {reducer as form} from 'redux-form';
import axios from 'axios';
import simplePromiseMiddleware, {resolve, reject} from 'redux-simple-promise';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import {connectRouter, routerMiddleware} from 'connected-react-router';

import tokenManager from '../common/token-manager';
import history from './history';
import productSearch from './routes/shell/home/product/redux';
import currencies from './routes/shell/home/product/header/currency-chooser/redux';
import sizeScheme from './routes/shell/home/product/header/size-scheme-chooser/redux';
import auth from './routes/exterior/login/redux';
import register from './routes/exterior/register/redux';
import watches from './routes/shell/home/product/header/header-actions/watch-actions/redux';


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

const addEnvironmentMiddlewares = () => {
  return process.env.NODE_ENV === 'development' ? [
    reduxLogger
  ] : [];
};

export default createStore(
  connectRouter(history)(
    combineReducers({
      productSearch,
      currencies,
      sizeScheme,
      auth,
      register,
      watches,
      form
    })),
  composeWithDevTools(applyMiddleware(...[
    axiosMiddleware(axiosClient, {
      successSuffix: resolve(''),
      errorSuffix: reject('')
    }),
    simplePromiseMiddleware(),
    routerMiddleware(history),
    ...addEnvironmentMiddlewares()
  ])));