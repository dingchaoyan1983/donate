import $ from 'jquery';
import { saveOrUpdateItem, getAllItems, getTransition } from '../storage';
import moment from 'moment';
import {startSubmit, stopSubmit, reset} from 'redux-form';

// actions consts
const CHECKOUT_SUCCESS = Symbol('checkout success');
const DESTORY_PAYMENT_FORM = Symbol('destory payment form');
const PAYMENT_SUCCESS = Symbol('payment success');
const SHOW_THANKS = Symbol('show thanks');
const SYNC_UP_DONATE = Symbol('sync up danator information');

export function syncup(donator, currency, amount) {
  return {
    type: SYNC_UP_DONATE,
    donator,
    currency,
    amount
  };
}

export const frozeDonateForm = startSubmit.bind(undefined, 'currentTransition');
export const restoreDonateForm = stopSubmit.bind(undefined, 'currentTransition');
export const resetDonateForm = reset.bind(undefined, 'currentTransition');

// set checkoutId to empty string to destory payment form
export function destoryPaymentForm() {
  return {
    type: DESTORY_PAYMENT_FORM,
    checkoutId: ''
  };
}

export function showPaymentOrThanks(donator, currency, amount) {
  return function (dispatch) {
    dispatch(syncup(donator, currency, amount));
    const allDonators = getAllItems();
    if (allDonators.some(item => ((item.donator === donator)
        && (moment(item.timestamp).add(1, 'hours').isAfter(moment()))))) {
      const transition = getTransition(donator);
      transition.showThanks = true;
      dispatch({
        type: SHOW_THANKS, ...transition
      });
    } else {
      dispatch(frozeDonateForm())
      dispatch(destoryPaymentForm());
      $.get('/api/checkout', {
        amount,
        currency
      }).done(data => {
        dispatch({
          type: CHECKOUT_SUCCESS,
          checkoutId: data.id,
          donator,
          currency,
          amount,
          showThanks: false
        });
      }).fail(() => {
        dispatch(restoreDonateForm());
      });
    }
  };
}

// when payment successed, we need reset the form and store the transitions to local storage
export function paymentSuccess(data) {
  saveOrUpdateItem(data.donator, data);
  return {
    type: PAYMENT_SUCCESS
  };
}

const initialState = {
  checkoutId: '',
  amount: '',
  currency: '',
  buildNumber: '',
  timestamp: '',
  ndc: '',
  donator: '',
  showThanks: false,
  frozeDonateForm: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
    case DESTORY_PAYMENT_FORM:
    case SHOW_THANKS:
    case SYNC_UP_DONATE:
      return {
        ...state, ...action
      };
    case PAYMENT_SUCCESS:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
