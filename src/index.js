import React from 'react';
import ReactDOM from 'react-dom';
import reducers from "./reducers";

import Home from './containers/Home';
import PostPage from './containers/PostPage';
import CategoryPage from './containers/CategoryPage';

import Error from './components/Error';
import Navbar from './components/Navbar';
import CategoriesBar from './components/CategoriesBar';

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import {
  Route,
  Switch,
  BrowserRouter as Router
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <CategoriesBar />
        <Switch>
          <Route
            exact
            path={'/'}
            component={Home}
          />
          <Route
            exact
            path={'/:category'}
            component={CategoryPage}
          />
          <Route
            exact
            path={'/:category/:id'}
            component={PostPage}
          />
        </Switch>
      </>
    </Router>
  </Provider>
, document.getElementById('root'));