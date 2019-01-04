import React from 'react';
import ReactDOM from 'react-dom';
import reducers from "./reducers";
import Readable from './containers/Readable';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Readable />
  </Provider>
, document.getElementById('root'));