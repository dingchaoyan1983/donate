import React from 'react';
import ReactDOM from 'react-dom';
import DonateContainer from './containers/DonateContainer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import transitions from './reducers/transitions';
import currentTransition from './reducers/currentTransition';
import { Provider } from 'react-redux';
import './styles/index.scss';

let middlewares = [thunk];
const initialState = {};

const store = createStore(
    combineReducers({
      transitions,
      currentTransition
    }),
    initialState,
    applyMiddleware(...middlewares)
  )

const ROOT = document.getElementById('root');

ReactDOM.render(
  <div>
    <Provider store= {store}>
      <DonateContainer />
    </Provider>
  </div>,
  ROOT
);
