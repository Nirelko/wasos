import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';
import './style.scss';


const rootId = 'root';

const HotApp = hot(App);

ReactDOM.render(
  <HotApp />,
  document.getElementById(rootId)
);