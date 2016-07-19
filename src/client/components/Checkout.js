import React from 'react';
import classnames from 'classnames';
import { reduxForm } from 'redux-form';
import { showPaymentOrThanks } from '../reducers/currentTransition';

const CURRENCY_SYMBOL_MAPPDING = {
  EUR: '€',
  USD: '$'
}

function onSubmit(values, dispatch) {
  dispatch(showPaymentOrThanks(values.donator, values.currency, values.amount));
}

const validate = values => {
  const errors = {}
  if (!values.donator) {
    errors.donator = (
      <span className="help-block">
        Donator name should not <strong>empty</strong>.
      </span>
    );
  } else if (!/^[a-zA-Z0-9\s\.]+$/.test(values.donator)) {
    errors.username = (
      <span className="help-block">
        Donator name should not contain <strong>~!@#$%^&*()</strong> symbol.
      </span>
    );
  }

  if (!values.amount) {
    errors.amount = (
      <span className="help-block">
        Amount should not <strong>empty</strong>
      </span>
    );
  } else if (!/^(\d*\.\d{1,2}|\d+)$/.test(values.amount) ) {
    errors.amount = (
      <span className="help-block">
        Amount should be a valid currency number.
      </span>
    );
  } else if (values.amount >= 100) {
    errors.amount = (
      <span className="help-block">
        Amount should not greater than 100.
      </span>
    );
  }

  return errors
};

const fields = [ 'donator', 'currency', 'amount' ];

class Checkout extends React.Component {
  render() {
    const { fields: { donator, currency, amount }, handleSubmit, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div className="jumbotron">
          <div className="form-horizontal donate__checkout clearfix">
            <div className={classnames('form-group', donator.touched && donator.error ? 'has-error' : '')}>
              <label className="control-label col-sm-4" htmlFor="donate-form__donator">Donator</label>
              <div className="col-sm-8">
                <input type="text" className="form-control col-sm-8" id="donate-form__donator" placeholder="your name" disabled={submitting} {...donator} />
                {donator.error}
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-sm-4" htmlFor="donate-form__currency">Currency</label>
              <div className="col-sm-8">
                <select id="donate-form__currency" className="form-control" disabled={submitting}  {...currency}>
                  <option selected={true} value="EUR">€</option>
                  <option value="USD">$</option>
                </select>
              </div>
            </div>
            <div className={classnames('form-group', amount.touched && amount.error ? 'has-error' : '')}>
              <label className="control-label col-sm-4" htmlFor="donate-form__amount">Amount</label>
              <div className="col-sm-8">
                <div className="input-group">
                  <div className="input-group-addon">{CURRENCY_SYMBOL_MAPPDING[currency.value]}</div>
                  <input type="amount" className="form-control donate-form__amount" id="donate-form__amount" placeholder="0.00" disabled={submitting} {...amount} />
                </div>
                {amount.error}
              </div>
            </div>
            <button type="submit" className="btn btn-success pull-right" disabled={submitting}>Donate</button>
          </div>
        </div>
      </form>
    );
  }
}

export default reduxForm(
  {
    form: 'currentTransition',
    fields,
    validate,
    initialValues: {currency: 'EUR'},
    onSubmit
  }
)(Checkout);
