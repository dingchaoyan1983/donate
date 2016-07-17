import $ from 'jquery';
import { saveOrUpdateItem, getAllItems, getTransition } from '../storage';

//actions consts
const CHECKOUT_SUCCESS = Symbol('checkout success');
const DESTORY_PAYMENT_FORM = Symbol('destory payment form');
const PAYMENT_SUCCESS = Symbol('payment success');
const SHOW_THANKS = Symbol('show thanks');
const FROZE_DONATE_FORM = Symbol('froze donate from');
const RESTORE_DONATE_FORM = Symbol('restore donate form');
const SYNC_UP_DONATE = Symbol('sync up danator information');

export function restoreDonateForm() {
  return {
    type: RESTORE_DONATE_FORM
  }
}

export function syncup(donator, currency, amount) {
  return {
    type: SYNC_UP_DONATE,
    donator,
    currency,
    amount
  };
}

export function showPaymentOrThanks(donator, currency, amount) {
  return function(dispatch) {
    dispatch(syncup(donator, currency, amount))
    const allDonators = getAllItems();
    if ( allDonators.some(item => ((item.donator ===  donator) && (new Date().getTime() - new Date(item.timestamp).getTime() < 60*60*1000)))) {
      const transition = getTransition(donator);
      transition.showThanks = true;
      dispatch({type: SHOW_THANKS, ...transition});
    } else {
      dispatch({type: FROZE_DONATE_FORM});
      dispatch(destoryPaymentForm());
      $.get('/api/checkout', {
        amount,
        currency
      }).done(function(data) {
        dispatch({
          type: CHECKOUT_SUCCESS,
          checkoutId: data.id,
          donator,
          currency,
          amount,
          showThanks: false
        });
      }).fail(function() {
        dispatch(restoreDonateForm());
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
  donator: '',
  showThanks: false,
  frozeDonateForm: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHECKOUT_SUCCESS:
    case DESTORY_PAYMENT_FORM:
    case SHOW_THANKS:
    case SYNC_UP_DONATE:
      delete action.type;
      return {...state, ...action};
    case PAYMENT_SUCCESS:
      return {...initialState};
    case FROZE_DONATE_FORM:
      return {...state, frozeDonateForm: true};
    case RESTORE_DONATE_FORM:
      return {...state, frozeDonateForm: false};
    default:
      return state;
  }
}
