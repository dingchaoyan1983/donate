import $ from 'jquery';
import { saveOrUpdateItem } from '../storage';

//actions consts
const CHECKOUT_SUCCESS = Symbol('checkout success');
const DESTORY_PAYMENT_FORM = Symbol('destory payment form');
const PAYMENT_SUCCESS = Symbol('payment success');

export function fetchCheckoutId(donator, currency, amount) {
  return function(dispatch) {
    $.get('/api/checkout', {
      amount,
      currency
    }).then(function(data) {
      dispatch({
        type: CHECKOUT_SUCCESS,
        checkoutId: data.id,
        donator,
        currency,
        amount
      });
    })
  }
}

// set checkoutId to empty string to destory payment form
export function destoryPaymentForm() {
  return {
    type: DESTORY_PAYMENT_FORM,
    checkoutId: ''
  }
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
  amount: 1,
  currency: 'USD',
  buildNumber: '',
  timestamp: '',
  ndc: '',
  donator: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
    case DESTORY_PAYMENT_FORM:
      delete action.type;
      return {...state, ...action};
    case PAYMENT_SUCCESS:
      return {...initialState};
    default:
      return state;
  }
}
