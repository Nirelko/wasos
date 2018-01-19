import React from 'react';
import ReactDOM from 'react-dom';
import 'react-hot-loader/patch';
import { AppContainer } from 'react-hot-loader';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-light.scss';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-regular.scss';
import 'roboto-fontface/css/roboto/sass/roboto-fontface-medium.scss';

import App from './app';
import './style.css';


const rootId = 'root';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById(rootId)
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}