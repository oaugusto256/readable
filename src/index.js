import React from 'react';
import ReactDOM from 'react-dom';
import reducers from "./reducers";

import Home from './containers/Home';
import ViewPost from './containers/ViewPost';

import Error from './components/Error';
import Navbar from './components/Navbar';

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

const Error404 = () => {
  return (
    <Error
      codigo={"404"}
      mensagem={"Página não encontrada."}
      descricao={"Desculpe, porém a página que você procura não existe."}
    />
  );
};

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route
            exact
            path={'/'}
            component={Home}
          />
          <Route
            exact
            path={'/:category/:id'}
            component={ViewPost}
          />
          <Route component={Error404} />
        </Switch>
      </>
    </Router>
  </Provider>
, document.getElementById('root'));