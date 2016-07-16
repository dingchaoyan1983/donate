import $ from 'jquery';
import { saveOrUpdateItem, getAllItems, getTransition } from '../storage';

//actions consts
const CHECKOUT_SUCCESS = Symbol('checkout success');
const DESTORY_PAYMENT_FORM = Symbol('destory payment form');
const PAYMENT_SUCCESS = Symbol('payment success');
const SHOW_THANKS = Symbol('show thanks');

export function showPaymentOrThanks(donator, currency, amount) {
  return function(dispatch) {
    const allDonators = getAllItems();
    if ( allDonators.some(item => ((item.donator ===  donator) && (new Date().getTime() - new Date(item.timestamp).getTime() < 60*60*1000)))) {
      const transition = getTransition(donator);
      transition.showThanks = true;
      dispatch({type: SHOW_THANKS, ...transition});
    } else {
      $.get('/api/checkout', {
        amount,
        currency
      }).then(function(data) {
        dispatch({
          type: CHECKOUT_SUCCESS,
          checkoutId: data.id,
          donator,
          currency,
          amount,
          showThanks: false
        });
      })
    }
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
    case SHOW_THANKS:
      delete action.type;
      return {...state, ...action};
    case PAYMENT_SUCCESS:
      return {...initialState};
    default:
      return state;
  }
}
