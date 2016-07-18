import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DonateContainer from './containers/DonateContainer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import currentTransition from './reducers/currentTransition';
import { Provider } from 'react-redux';
import 'file-loader!../../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

const middlewares = [thunk];
const initialState = {};

const store = createStore(
    combineReducers({
      currentTransition
    }),
    initialState,
    applyMiddleware(...middlewares)
  );

const ROOT = document.getElementById('root');

ReactDOM.render(
  <div>
    <Provider store={store}>
      <DonateContainer />
    </Provider>
  </div>,
  ROOT
);
