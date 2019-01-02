import React from 'react';
import ReactDOM from 'react-dom';
import reducers from "./reducers";
import Readable from './containers/readable';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import './index.css';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Readable />
  </Provider>
, document.getElementById('root'));