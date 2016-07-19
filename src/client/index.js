import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import DonateContainer from './containers/DonateContainer';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import currentTransition from './reducers/currentTransition';
import { Provider } from 'react-redux';
import {reducer as formReducer} from 'redux-form';
import 'file-loader!../../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';

const middlewares = [thunk];
const initialState = {};

const store = createStore(
    combineReducers({
      form: formReducer,
      currentTransition
    }),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
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
