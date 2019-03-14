import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import { Provider } from 'react-redux';
import storeFactory from './store';

import 'react-app-polyfill/ie9';
import 'core-js/fn/array/find';
import 'core-js/fn/array/includes';
import 'core-js/fn/number/is-nan';

const store = storeFactory();
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));

